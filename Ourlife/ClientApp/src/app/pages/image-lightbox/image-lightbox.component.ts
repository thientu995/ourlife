import { AppComponent } from 'src/app/app.component';
import { AudioControlComponent } from '../audio-control/audio-control.component';
import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

declare var UIkit: any;
declare var MediaMetadata: any;

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {

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
    public audioControlComponent: AudioControlComponent,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  processSlideShow() {
    this.resetValue();
    if (this.options.isOpenModal) {
      if (this.objImg.album.albumType != 'video') {
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
          this.audioControlComponent.disposeAudio();
        }
        this.settings.audio = this.audioControlComponent.setAudio(this.settings.audioLinks);
        this.regisSlideShow();
      }
      this.appComponent.loadComplete();
    }
  }

  getMediaMetadata(src) {
    if (MediaMetadata) {
      return new MediaMetadata({
        title: this.objImg.album.title,
        artist: this.appComponent.title,
        album: this.objImg.category.title,
        artwork: [
          { src: src, type: 'image/jpeg', sizes: '96x96' },
          { src: src, type: 'image/jpeg', sizes: '128x128' },
          { src: src, type: 'image/jpeg', sizes: '192x192' },
          { src: src, type: 'image/jpeg', sizes: '256x256' },
          { src: src, type: 'image/jpeg', sizes: '384x384' },
          { src: src, type: 'image/jpeg', sizes: '512x512' }
        ]
      });
    }
    else {
      return null;
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
      if (new Date().getTime() - dateItemShow.getTime() < 1000) {// lap lai 2 lan
        return;
      }
      dateItemShow = new Date();
      this.setIndexImg();
    });
    document.addEventListener('visibilitychange', () => {
      if (this.options.isAutoPlay && document.visibilityState == 'visible') {
        this.settings.slideshow.show(this.slideIndex);
      }
    });

    this.initWorkerAutoPlay();
  }

  setIndexImg() {
    if (this.objImg.album.albumType != 'video') {
      this.slideIndex = this.settings.slideshow.index;
    }
    else {
      this.slideIndex = 1;
    }
    this.settings.selector_Img = this.objImg.galleryImages[this.slideIndex].medium;
    this.location.replaceState('/album/' + this.id.replace('Album_', '') + '/' + this.slideIndex);
    this.audioControlComponent.setMediaSessionMetadata(() => { return this.getMediaMetadata(this.settings.selector_Img) });
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
    if (this.settings.workerAutoPlay) {
      this.settings.workerAutoPlay.terminate();
    }
    if (UIkit.slideshow('#' + this.settings.idModal)) {
      UIkit.slideshow('#' + this.settings.idModal).$destroy(true);
    }
    this.options.isOpenModal = false;
  }

  resetValue() {
    this.options.isAutoPlay = false;
    this.audioControlComponent.disposeAudio();
  }

  showSlides(n: number) {
    this.slideIndex = n.getIndexLimited(this.settings.slides.length - 1);
    this.audioControlComponent.setMediaSessionMetadata(() => { return this.getMediaMetadata(this.objImg.galleryImages[this.slideIndex].medium) });
    if (document.visibilityState == 'visible') {
      this.settings.slideshow.show(this.slideIndex);
    }
  }

  showPreNext(n: number) {
    this.slideIndex = this.slideIndex + n;
    this.showSlides(this.slideIndex);
  }

  slideshow() {
    this.options.isAutoPlay = !this.options.isAutoPlay;
    this.settings.workerAutoPlay.postMessage({ status: this.options.isAutoPlay ? 'run' : 'stop' });
    this.playAudio(true);
  }

  playAudio(playOnly?: boolean) {
    if (playOnly != null
      && playOnly
      && playOnly == !this.audioControlComponent.audio.paused
    ) {
      return;
    }
    this.audioControlComponent.playAudio();
  }

  playAudioIndex(index: number) {
    //BUG: VUA SLIDESHOW + NHAN BUTTON CHUYEN BAI LIEN TUC BI DUNG?
    this.audioControlComponent.playAudioIndex(index);
  }

  initWorkerAutoPlay() {
    this.settings.workerAutoPlay = new Worker('./image-lightbox.worker', { type: 'module', name: 'image-lightbox' });
    this.settings.workerAutoPlay.onmessage = ({ data }) => {
      if (data == -1) {
        this.showPreNext(1);
      }
      document.getElementById('progressbar' + this.id).setAttribute('value', data + '');
      if (!this.options.isAutoPlay) {
        this.settings.workerAutoPlay.postMessage({ status: 'stop' });
      }
    };
    this.settings.workerAutoPlay.postMessage({ status: 'create', timeAutoPlay: this.timeAutoPlay });
  }

  onKeydownEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37: //left
        this.showPreNext(-1);
        break;
      case 39: //right
        this.showPreNext(1);
        break;
      default:
        break;
    }
  }
}