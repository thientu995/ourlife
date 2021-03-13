import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { IAlbumAudio } from 'src/app/interfaces/album';
import { GetDataService } from 'src/app/services/get-data.service';
// import { PinchZoomComponent } from 'ngx-pinch-zoom';
declare var UIkit: any;

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {
  // @ViewChildren(PinchZoomComponent) myPinch: QueryList<PinchZoomComponent>;

  @Input()
  objImg: any;

  @Input()
  audio: any;

  @Input()
  id = '';

  @Input()
  slideIndex = 0;

  options = {
    isOpenModal: false,
    isAutoPlay: false,
    isAudio: false,
    isDraggable: false,
  }

  settings = {
    idModal: '',
    selector_Img: '',
    slideshow: null,
    slides: null,
    audio: null,
    audioLinks: [],
    workerAutoPlay: null
  };
  albumAudio: any = null;

  readonly timeAutoPlay = 10000;
  constructor(
    private appComponent: AppComponent,
    private location: Location,
    private dataService: GetDataService
  ) { }

  ngOnInit(): void {
  }

  processSlideShow() {
    this.resetValue();
    if (this.options.isOpenModal) {
      // UIkit.modal('#' + this.settings.idModal).show();
      this.settings.slideshow = UIkit.slideshow('#' + this.settings.idModal, {
        autoplayInterval: this.timeAutoPlay,
        pauseOnHover: false,
        index: this.slideIndex,
        draggable: !this.options.isAutoPlay,
        // minHeight: 200,
        // maxHeight: window.innerHeight
      });
      this.settings.slides = this.settings.slideshow.slides;
      if (this.objImg.audio != null && this.objImg.audio.links != null && this.objImg.audio.links.length > 0) {
        this.settings.audioLinks = this.objImg.audio.links;
      }
      else {
        this.appComponent.disposeAudio();
      }
      this.settings.audio = this.appComponent.setAudio(this.settings.audioLinks);
      this.regisSlideShow();
      this.appComponent.loadComplete();
    }
  }

  openModal(index: number) {
    this.options.isOpenModal = true;
    this.settings.idModal = 'imgModal' + this.id;
    this.slideIndex = Number(index);
    setTimeout(() => {
      this.processSlideShow();
    });
  }

  regisSlideShow() {
    this.setIndexImg();
    let dateItemShow = new Date();
    UIkit.util.on('#' + this.settings.idModal, 'itemshown', () => {
      if (new Date().getTime()- dateItemShow.getTime() < 1000) {// lap lai 2 lan
        if (this.options.isAutoPlay) {
          this.slideshow();
        }
        return;
      }
      dateItemShow = new Date();
      this.setIndexImg();
    });
    document.addEventListener('visibilitychange', () => {
      if (this.options.isAutoPlay && document.visibilityState == 'visible') {
        UIkit.slideshow('#' + this.settings.idModal).show(this.slideIndex);
      }
    });

    this.initWorkerAutoPlay();
  }

  setIndexImg() {
    this.slideIndex = this.settings.slideshow.index;
    this.settings.selector_Img = this.objImg.galleryImages[this.slideIndex].medium;
    this.location.replaceState('/album/' + this.id.replace('Album_', '') + '/' + this.slideIndex);
  }

  closeModal() {
    this.location.replaceState('/album');
    this.dispose();
  }

  dispose() {
    this.resetValue();
    this.settings.slideshow = null;
    this.settings.audio = null;
    this.settings.audioLinks = [];
    this.settings.slides = [];
    this.settings.workerAutoPlay.terminate();
    UIkit.slideshow('#' + this.settings.idModal).$destroy(true);
    this.options.isOpenModal = false;
  }

  resetValue() {
    if (this.options.isAudio) {
      this.options.isAutoPlay = false;
      this.appComponent.disposeAudio();
    }
    this.options.isAudio = false;
  }

  showSlides(n: number) {
    this.slideIndex = n.getIndexLimited(this.settings.slides.length - 1);
    if (document.visibilityState == 'visible') {
      UIkit.slideshow('#' + this.settings.idModal).show(this.slideIndex);
    }
  }

  slideshow() {
    this.options.isAutoPlay = !this.options.isAutoPlay;
    this.settings.workerAutoPlay.postMessage({ status: this.options.isAutoPlay ? 'run' : 'stop' });
    this.playAudio(true);
  }

  playAudio(playOnly?: boolean) {
    if (playOnly != null
      && playOnly
      && playOnly == this.options.isAudio
    ) {
      return;
    }
    this.options.isAudio = !this.options.isAudio;
    if (this.options.isAudio) {
      this.appComponent.playAudio();
    }
    else {
      this.settings.audio.pause();
    }
  }

  playAudioIndex(index: number) {
    //BUG: VUA SLIDESHOW + NHAN BUTTON CHUYEN BAI LIEN TUC BI DUNG?
    this.appComponent.playAudioIndex(index);
  }

  initWorkerAutoPlay() {
    this.settings.workerAutoPlay = new Worker('./image-lightbox.worker', { type: 'module', name: 'image-lightbox.worker' });
    this.settings.workerAutoPlay.onmessage = ({ data }) => {
      if (data == -1) {
        this.showSlides(this.slideIndex += 1);
      }
      document.getElementById('progressbar' + this.id).setAttribute('value', data + '');
      if (!this.options.isAutoPlay) {
        this.settings.workerAutoPlay.postMessage({ status: 'stop' });
      }
    };
    this.settings.workerAutoPlay.postMessage({ status: 'create', timeAutoPlay: this.timeAutoPlay });
  }
}