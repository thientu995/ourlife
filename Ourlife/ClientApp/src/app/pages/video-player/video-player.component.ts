import { style } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
declare var videojs: any;

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
  player: any = null;
  constructor(
  ) { }

  ngOnInit(): void {
    this.tagVideo = document.querySelector('video');
  }

  ngAfterViewInit() {
    this.player = videojs(document.getElementById('video-player'), {
      fluid: false,
      controlBar: {
        volumePanel: false,
      }
    }, function onPlayerReady() {
      this.on('loadedmetadata', () => { });
      this.on('timeupdate', () => { });
      this.on('loadeddata', () => { });
    });
  }

  timeUpdate(event) {
    const percent = Math.floor((100 / this.tagVideo.duration) * this.tagVideo.currentTime)
    document.getElementById('progressbar' + this.idObj).setAttribute('value', percent + '');
  }

  loadedmetadata(event) {

  }

  load(event) {
    console.log('load', event);
  }

  convertTimeToTimeDate(valueSec) {
    if (isNaN(valueSec)) {
      return;
    }
    const time = new Date(valueSec * 1000);
    const isoStr = time.toISOString();
    if (time.getUTCHours() == 0) {
      this.widthModal = '40px';
      return isoStr.substr(14, 5);
    }
    this.widthModal = '60px';
    return isoStr.substr(11, 8);
  }

  toggleVideo(event) {
    event.stopPropagation();
    event.preventDefault();
    event.srcElement.style.display = 'none';
    if (this.tagVideo.paused) {
      this.tagVideo.play().then(() => {

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