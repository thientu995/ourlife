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
  isOpenModal: boolean = false;
  isAutoPlay: boolean = false;
  isZoom: boolean = false;
  selector_Img: String = '';
  objPinch: any = null;
  readonly timeAutoPlay = 30000;
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  openModal(index: number) {
    this.isOpenModal = true;
    this.location.replaceState('/album/' + this.id.replace('Album_', '') + '/' + index);
    this.myPinch.changes.subscribe(() => {
      if (this.myPinch.length == 0 || document.getElementById('imgModal' + this.id) == null) {
        return;
      }
      this.objPinch = this.myPinch.toArray();
      document.body.style.overflowY = "hidden";
      this.resetValue();
      this.currentSlide(Number(index) + 1);
      this.resize();
    });
  }

  closeModal() {
    this.location.replaceState('/album');
    document.body.style.overflowY = '';
    this.isOpenModal = false;
  }

  resetValue(name: string = null, value: any = null) {
    this.isAutoPlay = false;
    this.isZoom = false;
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
    const group = document.getElementById('imgModal' + this.id);
    const slides = group.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    this.resetZoomImage();

    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove('show');
    }
    const obj = slides[this.slideIndex - 1];
    obj.classList.add('show');
    this.selector_Img = obj.getAttribute('src');
    this.location.replaceState('/album/' + this.id.replace('Album_', '') + '/' + (this.slideIndex - 1));
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
      if (this.isAutoPlay) {
        this.showSlides(this.slideIndex += 1);
        setTimeout(() => {
          proBar.setAttribute('value', 0 + '');
        }, 1000);
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
        proBar.setAttribute('value', ((percentage / this.timeAutoPlay) * 100).toFixed(0));
        if (percentage > this.timeAutoPlay) {
          proBar.setAttribute('value', 100 + '');
          next();
        }
        if (!this.isAutoPlay) {
          clearInterval(animate);
        }
      }, 60);
    }
    progressbar();
  }

  resize() {
    if (!this.isOpenModal) {
      return;
    }
    this.isFullModal = ImageLightboxComponent._isFullModal;
    setTimeout(() => {
      const group = document.getElementById('imgModal' + this.id);
      const gthumbnails = group.getElementsByClassName("img-group-thumbnail") as HTMLCollectionOf<HTMLElement>;
      const gslides = group.getElementsByClassName("img-group-slides") as HTMLCollectionOf<HTMLElement>;
      gslides[0].style.height = window.innerHeight - gthumbnails[0].clientHeight + 'px';
    });
  }

  zoomImage() {
    this.isZoom = !this.isZoom;
    // this.resetValue('isZoom', !this.isZoom);
    this.objPinch[this.slideIndex - 1].toggleZoom();
  }

  changeIconZoom() {
    const isZoomOut = this.isZoomOutImage();
    this.isZoom = isZoomOut;
    return isZoomOut ? 'minus-circle' : 'plus-circle';
  }

  resetZoomImage() {
    // document.querySelectorAll('#imgModal' + this.id + '' + ' .pinch-zoom-content.pz-dragging').forEach(x => {
    //   let index = x.parentElement.attributes['index'].value;
    //   this.objPinch[index].toggleZoom();
    // });
    if (this.isZoomOutImage()) {
      this.zoomImage();
    }
  }

  isZoomOutImage() {
    return document.querySelector('#imgModal' + this.id + '' + (this.slideIndex - 1) + ' .pinch-zoom-content.pz-dragging') != null;
  }
}