import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input, ViewChildren, QueryList } from '@angular/core';
import { PinchZoomComponent } from 'ngx-pinch-zoom';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {
  @ViewChildren(PinchZoomComponent) myPinch: QueryList<PinchZoomComponent>;

  @Input()
  images = [];

  @Input()
  id = '';

  @Input()
  slideIndex = 0;

  static _isFullModal: boolean = false;
  isFullModal: boolean = false;
  isAutoPlay: boolean = false;
  isZoom: boolean = false;
  selector_Img: String = '';

  readonly timeAutoPlay = 10000;
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  openModal(index: number) {
    this.location.replaceState('/album/' + this.id.replace('Album_', ''));
    document.getElementById('imgModal' + this.id).style.display = "block";
    this.currentSlide(index + 1);
    this.resize();
  }

  closeModal() {
    this.location.replaceState('/album');
    document.getElementById('imgModal' + this.id).style.display = "none";
    document.body.style.overflowY = '';
    this.resetValue();
  }

  resetValue(name: string = null, value: any = null) {
    this.isAutoPlay = false;
    this.isZoom = false;
    if (name) {
      this[name] = value;
    }
    this.resetZoomImage();
  }

  plusSlides(n) {
    this.resetValue();
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.resetValue();
    this.showSlides(this.slideIndex = n);
  }

  // showSlides(slideIndex);
  showSlides(n) {
    const group = document.getElementById('imgModal' + this.id);
    const slides = group.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }

    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove('show');
    }
    const obj = slides[this.slideIndex - 1];
    obj.classList.add('show');
    this.selector_Img = obj.firstElementChild.getAttribute('src');
  }

  fullModal() {
    ImageLightboxComponent._isFullModal = !ImageLightboxComponent._isFullModal;
    this.resize();
  }

  autoPlay() {
    this.resetValue('isAutoPlay', !this.isAutoPlay);
    const proBar = document.getElementById('progressbar' + this.id);
    let animate = null;
    let next = () => {
      clearInterval(animate);
      setTimeout(() => {
        proBar.setAttribute('value', 0 + '');
      }, 1000);
      if (this.isAutoPlay) {
        this.showSlides(this.slideIndex += 1);
        setTimeout(() => {
          progressbar();
        }, 2000);
      }
    }
    let progressbar = () => {
      const startDate = new Date().getTime();
      proBar.setAttribute('value', 0 + '');
      animate = setInterval(() => {
        const currentDate = new Date().getTime();
        const percentage = currentDate - startDate;
        const per = Number(((percentage / this.timeAutoPlay) * 100).toFixed(0));
        proBar.setAttribute('value', per + '');
        if (percentage > this.timeAutoPlay) {
          proBar.setAttribute('value', 100 + '');
          next();
        }
        if (!this.isAutoPlay) {
          clearInterval(animate);
        }
      }, 1);
    }
    progressbar();
  }

  resize() {
    this.isFullModal = ImageLightboxComponent._isFullModal;
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      const group = document.getElementById('imgModal' + this.id);
      const gthumbnails = group.getElementsByClassName("img-group-thumbnail") as HTMLCollectionOf<HTMLElement>;
      const gslides = group.getElementsByClassName("img-group-slides") as HTMLCollectionOf<HTMLElement>;
      gslides[0].style.height = window.innerHeight - gthumbnails[0].clientHeight + 'px';
    });
  }

  zoomImage() {
    const objPinch = this.myPinch.toArray()[this.slideIndex - 1];
    objPinch.toggleZoom();
  }

  changeIconZoom() {
    const isZoomOut = this.isZoomOutImage();
    this.isZoom = isZoomOut;
    return isZoomOut ? 'minus-circle' : 'plus-circle';
  }

  resetZoomImage() {
    const arrPinch = this.myPinch.toArray();
    document.querySelectorAll('#imgModalAlbum_gpH9m2wf4prmF6gHtUAp' + ' .pz-zoom-button-out').forEach(x => {
      let index = x.parentElement.attributes['index'].value;
      arrPinch[index].toggleZoom();
    });
  }

  isZoomOutImage() {
    return document.querySelector('#imgModal' + this.id + '' + (this.slideIndex - 1) + ' .pz-zoom-button-out') != null;
  }
}