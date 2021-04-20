import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var navigator: any;

@Component({
  selector: 'app-audio-control',
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class AudioControlComponent implements OnInit {
  private links: string[];
  private indexAudio: number = 0;

  public audio;
  // public funcMediaMetadata: any;
  public isReady = {
    play: false,
    next: false,
    prev: false,
  }

  constructor(
  ) { }

  ngOnInit(): void {
  }

  private setAllValue(isTrue: boolean) {
    this.isReady.play = isTrue;
    this.isReady.next = isTrue;
    this.isReady.prev = isTrue;
  }

  private createAudio() {
    if (typeof Audio == "undefined") {
      this.setAllValue(false);
      return;
    }
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.type = 'audio/mpeg';
    // this.audio.loop = true;
    this.audio.crossOrigin = 'use-credentials';
    this.regEvent();
    this.regMediaSession();
  }

  private regEvent() {
    /**
     * lINK EVENT AUDIO: https://html.spec.whatwg.org/multipage/media.html#event-media-canplay
     */

    this.audio.addEventListener("ended", (e) => {
      this.isReady.next = this.isReady.prev = false;
      this.playAudioIndex(1);
    }, false);
    this.audio.addEventListener("error", (e) => {
      this.setAllValue(false);
      throw e;
      // console.error("error audio", e)
    }, false);
    this.audio.addEventListener("canplay", (e) => {
      this.isReady.play = true;
    }, false);
    this.audio.addEventListener("canplaythrough", (e) => {
      this.isReady.next = this.isReady.prev = this.links.length > 2;
    }, false);
  }

  private regMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.playAudioIndex(-1);
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.playAudioIndex(1);
      });
      navigator.mediaSession.setActionHandler('play', () => {
        this.playAudio();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.playAudio();
      });
    }
  }

  public setMediaSessionMetadata(funcMediaMetadata: any) {
    if ('mediaSession' in navigator && funcMediaMetadata) {
      navigator.mediaSession.metadata = funcMediaMetadata();
    }
  }

  private loadAudio(src: string) {
    if (src != null && src != '') {
      this.audio.src = String["linkAPI"] + 'GetData/DownloadUrl?url=' + encodeURIComponent(src);
      this.audio.currentTime = 0;
      // this.audio.load();
    }
    return this.audio;
  }

  public playAudio() {
    if (this.audio.paused) {
      this.audio.play()
        .then(x => { })
        .catch((error) => {
          this.playAudioIndex(1);
        });
    }
    else {
      this.audio.pause();
    }
  }

  public playAudioIndex(value: number) {
    this.isReady.next = this.isReady.prev = false;
    let audio = this.setIndexAudio(this.indexAudio += value)
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.playAudio();
    }
  }

  private setIndexAudio(index: number) {
    if (this.links.length > 0) {
      this.indexAudio = index.getIndexLimited(this.links.length - 1);
      return this.loadAudio(this.links[this.indexAudio]);
    }
    return null;
  }

  public setAudio(lstSrc: string[]) {
    // this.funcMediaMetadata = mediaMetadata;
    this.createAudio();
    this.links = new String().randomOverlap(lstSrc).map(x => x.obj);
    return this.setIndexAudio(0);
  }

  public disposeAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}