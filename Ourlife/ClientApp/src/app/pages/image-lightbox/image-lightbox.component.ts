import { style } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { nextTick } from 'process';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightboxComponent implements OnInit {
  @Input()
  images = [];

  @Input()
  id = '';

  @Input()
  slideIndex = 0;

  static _isFullModal: boolean = false;
  isFullModal: boolean = false;
  isAutoPlay: boolean = false;
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
  }


  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
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
    const proBar = document.getElementById('progressbar' + this.id);
    this.isAutoPlay = !this.isAutoPlay;
    let animate = null;
    let next = () => {
      clearInterval(animate);
      proBar.setAttribute('value', 0 + '');
      if (this.isAutoPlay) {
        this.plusSlides(1);
        setTimeout(() => {
          progressbar();
        }, 2000);
      }
    }
    let progressbar = () => {
      const startDate = new Date().getTime();
      animate = setInterval(() => {
        const currentDate = new Date().getTime();
        const percentage = currentDate - startDate;
        const per = Number(((percentage / this.timeAutoPlay) * 100).toFixed(0));
        proBar.setAttribute('value', per + '');
        if (percentage >= this.timeAutoPlay) {
          next();
        }
        if (!this.isAutoPlay) {
          clearInterval(animate);
        }
      }, 10);
    }
    progressbar();
  }

  private resize() {
    this.isFullModal = ImageLightboxComponent._isFullModal;
    setTimeout(() => {
      const group = document.getElementById('imgModal' + this.id);
      const gthumbnails = group.getElementsByClassName("img-group-thumbnail") as HTMLCollectionOf<HTMLElement>;
      const gslides = group.getElementsByClassName("img-group-slides") as HTMLCollectionOf<HTMLElement>;
      gslides[0].style.height = window.innerHeight - gthumbnails[0].clientHeight + 'px';
    });
  }
}