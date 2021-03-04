import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, QueryList } from '@angular/core';
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
  images = [];

  @Input()
  id = '';

  @Input()
  slideIndex = 0;

  isOpenModal: boolean = false;
  isAutoPlay: boolean = false;
  idModal: string = '';
  selector_Img: String = '';
  slideshow: any;
  slides: any;
  readonly timeAutoPlay = 10000;
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  openModal(index: number) {
    this.isOpenModal = true;
    this.idModal = 'imgModal' + this.id;
    this.slideIndex = Number(index);
    this.resetValue();
    setTimeout(() => {
      // UIkit.modal('#' + this.idModal).show();
      this.slideshow = UIkit.slideshow('#' + this.idModal, {
        autoplayInterval: this.timeAutoPlay,
        pauseOnHover: false,
        index: this.slideIndex,
        // minHeight: 200,
        // maxHeight: window.innerHeight
      });
      this.slides = this.slideshow.slides;
      this.regisSlideShow();
    });
  }

  regisSlideShow() {
    this.setIndexImg();
    UIkit.util.on('#' + this.idModal, 'itemshown', () => {
      this.setIndexImg();
    });
  }

  setIndexImg() {
    this.slideIndex = this.slideshow.index;
    this.selector_Img = this.slides[this.slideIndex].childNodes[0].childNodes[0].getAttribute('src');
    this.location.replaceState('/album/' + this.id.replace('Album_', '') + '/' + this.slideIndex);
  }

  closeModal() {
    this.location.replaceState('/album');
    this.isOpenModal = false;
    this.slideshow = null;
    this.slides = [];
  }

  resetValue(name: string = null, value: any = null) {
    this.isAutoPlay = false;
    if (name) {
      this[name] = value;
    }
  }

  plusSlides(n) {
    this.resetValue();
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.resetValue();
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    if (n > this.slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = this.slides.length }
    UIkit.slideshow('#' + this.idModal).show(this.slideIndex);
  }

  autoPlay() {
    this.resetValue('isAutoPlay', !this.isAutoPlay);
    const proBar = document.getElementById('progressbar' + this.id);
    let animate = null;
    let next = () => {
      clearInterval(animate);
      if (this.isAutoPlay) {
        this.showSlides(this.slideIndex += 1);
        proBar.setAttribute('value', 0 + '');
        setTimeout(() => {
          progressbar();
        }, 1000);
      }
    }
    let progressbar = () => {
      const startDate = new Date().getTime();
      proBar.setAttribute('value', 0 + '');
      animate = setInterval(() => {
        if (!this.isAutoPlay) {
          this.isAutoPlay = false;
          clearInterval(animate);
        }
        else {
          const currentDate = new Date().getTime();
          const percentage = currentDate - startDate;
          proBar.setAttribute('value', ((percentage / this.timeAutoPlay) * 100).toFixed(0));
          if (percentage > this.timeAutoPlay) {
            proBar.setAttribute('value', 100 + '');
            next();
          }
        }
      }, 60);
    }
    progressbar();
  }
}