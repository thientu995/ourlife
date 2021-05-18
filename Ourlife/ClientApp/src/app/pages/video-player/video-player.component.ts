import { style } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation, Input, HostListener, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit {
  @Input()
  heightModal: number;

  @Input()
  source: string;

  @Input()
  idObj: string;

  @Input()
  poster: string;

  widthModal: string = '40px';
  tagVideo: any;
  timeVideo: string;
  constructor(
  ) { }

  ngOnInit(): void {
    this.tagVideo = document.querySelector('video');
  }

  timeUpdate(event) {
    const totalSec = this.tagVideo.duration;
    const curreSec = this.tagVideo.currentTime;
    const totalPercent = 100;
    let percent = (curreSec * totalPercent) / totalSec;
    document.getElementById('progressbar' + this.idObj).setAttribute('value', Math.floor(percent) + '');
  }

  convertTimeToTimeDate(valueSec) {
    if (isNaN(valueSec)) {
      return;
    }
    const time = new Date(valueSec * 1000);
    const isoStr = time.toISOString();
    if (time.getUTCHours() == 0){
      this.widthModal = '40px';
      return isoStr.substr(14, 5);
    }
    this.widthModal = '60px';
    return isoStr.substr(11, 8);
  }

  toggleVideo(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.tagVideo.paused) {
      this.tagVideo.play().then(() => {
        this.tagVideo.volume = 1;
      }).catch(function (error) {
      });
    }
    else {
      this.tagVideo.pause();
    }
  }

  toggleVolume(event) {
    event.stopPropagation();
    event.preventDefault();
    this.tagVideo.muted = !this.tagVideo.muted;
  }
}