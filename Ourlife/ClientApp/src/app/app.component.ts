import { GetDataService } from './services/get-data.service';
import { Component, ElementRef, HostListener, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ISetting } from './interfaces/setting';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public readonly ukSticky: string = 'show-on-up:true; bottom: true; animation: uk-animation-slide-top';

  lastScrollTop: number = 0;
  hiddenNavigation: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.hiddenNavbar();
  }

  hiddenNavbar(){
    const tagBody = document.querySelector('html');
    const scrollTop = Math.round(tagBody.scrollTop);
    this.hiddenNavigation = scrollTop > window.innerHeight && (scrollTop >= this.lastScrollTop);
    this.lastScrollTop = scrollTop;
  }


  @ViewChild('content') content: ElementRef;

  public message = null;
  data = '';
  title = 'ourlife';
  loadSuccess = false;

  public menu = null;
  public footerImg = null;
  public footerText = null;
  public headerHero = {
    img: '',
    videoMP4: ''
  };
  public valueCountdown: Date = null;
  constructor(
    private dataService: GetDataService,
    private router: Router,
    private state: TransferState,
    @Inject('MESSAGE') dataInj: any
  ) {
    this.data = this.state.get(makeStateKey("MESSAGE"), null as any);
    if (!this.data) {
      this.state.set(makeStateKey("MESSAGE"), dataInj as any);
    }
    console.log(this.data)
  }

  ngOnInit(): void {
    this.dataService.getDataAsync<ISetting>({ collection: 'setting' }, 'setting').then(data => {
      this.title = data.tagMeta.title;
      this.valueCountdown = new Date(data.countdown.value);
      this.dataService.setTitle(data.tagMeta.title);
      this.dataService.setMeta({ name: 'description', content: data.tagMeta.description });

      this.headerHero.img = data.hero.src;
      this.headerHero.videoMP4 = data.hero.srcVideoMP4 || null;

      this.footerImg = {
        'background-image': 'url("' + data.footer.src.getSizeImage() + '")'
      }
      this.footerText = data.footer.text;

      this.message = data.footer.form;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadSuccess = false;
        this.content.nativeElement.scrollIntoView();
      }
      else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (!this.loadSuccess) {
            this.loadComplete();
          }
          //   this.content.nativeElement.scrollIntoView();
        }, 2000);
      }
    });

  }

  ngAfterViewInit() {
    
  }

  public loadComplete() {
    setTimeout(() => {
      this.hiddenNavbar();
      this.loadSuccess = true;
    }, 1000);
  }

}
