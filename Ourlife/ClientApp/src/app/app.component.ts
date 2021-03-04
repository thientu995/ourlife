import { GetDataService } from './services/get-data.service';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ISetting } from './interfaces/setting';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('content') content: ElementRef;
  public message = null;

  title = 'ourlife';
  loadSuccess = false;
  public menu = null;

  public footerImg = null;
  public footerText = null;
  public headerHero = '';
  public valueCountdown: Date = null;
  constructor(
    private dataService: GetDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let audio = new Audio();
    audio.loop = true;
    audio.muted = false;
    audio.autoplay = true;
    audio.src = "https://public.bn.files.1drv.com/y4mMVa6UAX6qHaA5ydP4-7I3eqEAbWTsgj4KTMiUMlFM4MUaEdWdt1RNo-2HJkHkT8Es0DZFA3DDAAWjeEE4qJk6PW2i-TTWaXgHvQiofzrzluJR_m2U3cBUzpk9p5dztPjvjsIqPZOkNmKW-j9ruPSxMkHadO-z1STDPOGXdqqy1tUB8YRwgk89JsRqWESfprk4HVj3ABfi9i6aNQs1I_69i_UQH7h1j7FDqlKsmORF8Y?access_token=EwAgA61DBAAUmcDj0azQ5tf1lkBfAvHLBzXl5ugAAesN%2bGHQypWXC82yq6tcUFQFNaJPaLRJj3Rh0Rk5gRjmwSyvemHVWZkQyQ8GFDAtnRhHUB3YU/tFUXAeyTctwGDCaBkZX9/SLSSIrW1BvI45yiFt3tCAdyyFvRV2TivzVh4NkZoIX76bmhsiTqsQGAdaQ8a2/e5h8%2bnzaAJikTTzxNtlRgvrYya7Q01XrZ3fUNwHor2PFlCcxegZrr2DD3kVBwfsF4F%2bEt7LNlQmykbr2MjKJwDv7RaWJpEDVLeCpA9/7xXvjYXIqgfj8Rr6NMbfxKIhQBtSwRygjUMYRItTCTFzxVnrijKl1fGlQCrU3Nl4leyW%2brqhJ2xZhDsOy0kDZgAACMOV/gQTYHj48AHAkSczv8ivdtQKDL%2bGm47UtSvvfbqexA6Pm/mAgh8QaHP/WreXTAd9BIhRMaXX4Fls0qQwlNYTTmn3AvcaBPD%2bWYyVPYSR9eA53EpmrJTFxIahe2GWE3c2dtIRu4L5VTcjipDOh4FA3q4ymoXZhXNyNDDhwx8Ad6HhYX1hK/i3wFHtNqs1BG0tDyTiITgBA5QoyxGi8v0hUuzzFuxNHRkFoxlEDK242Ba/p4gkY2U/nY32wMq3EeEYOXP4JQrtaktS/pqllCuOJbTn9qDPvrvDLqotH%2bSdo98/dLOF9vf6wjgVQ9drUVUqgveNX4zy5S0emEgNIaIhXnKKnczv1l2YOI%2bF2wJflQbSIc/HQQjCyiE6wm14GxpDzxB55EqtEaHCGi8UjkYqRFRoaT1VY68c/Uu4jrwdN68CK1%2bqst053mTfXp6505ptjjKadmnlACEdcf3nvHpM9Xf5mHZBdtOROdFNrpuua1Wz2w9UhJYseWVcaMLQKW9UAHc1bfwEV1VWPVMgfduK8ufNjaL4AcWissCWKZtximwvjfoBkzQDzmq3OoUzwgHP4zph/0IjAF2ZMkVh93nHSC3FeXJH6wapTscBu9LNAmTPr2xvlvvNG7A4mQ6SxfSr02shH%2bkmcUvu6YA2DHFdbQ83Np0mXPC8HwI%3d";
    audio.load();
    audio.play().then(x => { });

    this.dataService.getDataAsync<ISetting>({ collection: 'setting' }, 'setting').then(data => {
      this.valueCountdown = new Date(data.countdown.value);
      this.dataService.setTitle(data.tagMeta.title);
      this.dataService.setMeta({ name: 'description', content: data.tagMeta.description });

      this.headerHero = data.hero.src;

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
        // setTimeout(() => {
        //   this.loadComplete();
        //   this.content.nativeElement.scrollIntoView();
        // }, 500);
      }
    });
  }

  // ngAfterViewInit() {
  //   this.loadComplete();
  // }

  public loadComplete() {
    setTimeout(() => {
      this.loadSuccess = true;
    }, 500);
  }
}
