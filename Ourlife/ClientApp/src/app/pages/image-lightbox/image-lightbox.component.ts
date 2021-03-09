import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
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
    workerAutoPlay: null
  };

  readonly timeAutoPlay = 10000;
  constructor(
    private appComponent: AppComponent,
    private location: Location,
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
      if (this.objImg.album.audioLinks != null) {
        this.settings.audio = this.appComponent.setAudio(this.objImg.album.audioLinks);
      }
      else {
        this.settings.audio = null;
      }
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
    UIkit.util.on('#' + this.settings.idModal, 'itemshown', () => {
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
    this.options.isOpenModal = false;
    this.dispose();
  }

  dispose() {
    this.resetValue();
    this.settings.slideshow = null;
    this.settings.audio = null;
    this.settings.slides = [];
    this.settings.workerAutoPlay.terminate();
    UIkit.slideshow('#' + this.settings.idModal).$destroy(true);
  }

  resetValue() {
    this.options.isAutoPlay = false;
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
    if(playOnly != null 
    && playOnly
    && playOnly == this.options.isAudio
    ){
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

  playAudioIndex(index: number){
    this.appComponent.playAudioIndex(index);
  }

  initWorkerAutoPlay() {
    if (this.settings.workerAutoPlay == null) {
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
}