import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ITimeline } from '../../interfaces/timeline';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-horizontal-timeline',
  templateUrl: './horizontal-timeline.component.html',
  styleUrls: ['./horizontal-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('contentState', [
      state('active', style({
        position: 'relative', 'z-index': 2, opacity: 1,
      })),
      transition('right => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
      transition('active => right', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ]),
      transition('active => left', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ]),
      transition('left => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
    ])
  ]
})
export class HorizontalTimelineComponent implements AfterViewInit {
  prevLinkInactive: boolean = true;
  nextLinkInactive: boolean = false;
  loaded: boolean = false;
  selectedIndex: number = 0;
  @ViewChild('eventsWrapper') eventsWrapper: ElementRef;
  @ViewChild('fillingLine') fillingLine: ElementRef;
  @ViewChildren('timelineEvents') timelineEvents: QueryList<ElementRef>;
  eventsWrapperWidth: number = 0;
  private _viewInitialized = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  private _timelineWrapperWidth = 720;

  @Input()
  set timelineWrapperWidth(value: number) {
    this._timelineWrapperWidth = value;
    this._cdr.detectChanges();
  }

  private _eventsMinDistance: number = 150;
  private _widthDatetime: number = 150;

  @Input()
  set eventsMinDistance(value: number) {
    this._eventsMinDistance = value;
    this.initView();
  }

  private _timelineElements: ITimeline[];

  get timelineElements(): ITimeline[] {
    return this._timelineElements;
  }

  @Input()
  set timelineElements(value: ITimeline[]) {
    this._timelineElements = value;
    this.initView();
  }

  private _dateFormat: string = 'dd.MM.yyyy';

  get dateFormat(): string {
    return this._dateFormat;
  }

  @Input()
  set dateFormat(value: string) {
    this._dateFormat = value;
    this.initView();
  }

  private _disabled: boolean = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  private _showContent: boolean = false;

  get showContent(): boolean {
    return this._showContent;
  }

  @Input()
  set showContent(value: boolean) {
    this._showContent = value;
    this._cdr.detectChanges();
  }

  private static pxToNumber(val: string): number {
    return Number(val.replace('px', ''));
  }

  private static getElementWidth(element: Element): number {
    const computedStyle = window.getComputedStyle(element);
    if (!computedStyle.width) {
      return 0;
    }
    return HorizontalTimelineComponent.pxToNumber(computedStyle.width);
  }

  private static parentElement(element: any, tagName: string) {
    if (!element || !element.parentNode) {
      return null;
    }

    let parent = element.parentNode;
    while (true) {
      if (parent.tagName.toLowerCase() == tagName) {
        return parent;
      }
      parent = parent.parentNode;
      if (!parent) {
        return null;
      }
    }
  }

  private static getTranslateValue(timeline: Element) {
    let timelineStyle = window.getComputedStyle(timeline);
    let timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
      timelineStyle.getPropertyValue('-moz-transform') ||
      timelineStyle.getPropertyValue('-ms-transform') ||
      timelineStyle.getPropertyValue('-o-transform') ||
      timelineStyle.getPropertyValue('transform');

    let translateValue = 0;
    if (timelineTranslate.indexOf('(') >= 0) {
      let timelineTranslateStr = timelineTranslate
        .split('(')[1]
        .split(')')[0]
        .split(',')[4];
      translateValue = Number(timelineTranslateStr);
    }

    return translateValue;
  }

  private static setTransformValue(element: any, property: any, value: any) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  private static dayDiff(first: Date, second: Date): number {
    return Math.round(second.getTime() - first.getTime());
  }

  private static minLapse(elements: ITimeline[]): number {
    if (elements && elements.length && elements.length === 1) {
      return 0;
    }
    return 150;
    let result: number = 0;
    for (let i = 1; i < elements.length; i++) {
      let distance = HorizontalTimelineComponent.dayDiff(elements[i - 1].date, elements[i].date);
      result = result ? Math.min(result, distance) : distance;
    }
    return Math.abs(result);
  }

  ngAfterViewInit(): void {
    this._cdr.detach();
    this._viewInitialized = true;
    this.initView();
  }

  onScrollClick(event: Event, forward: boolean) {
    event.preventDefault();
    // this.updateSlide(this.eventsWrapperWidth, forward);
    this.showNewContent(event, forward);
    this._cdr.detectChanges();
  }

  showNewContent(event: Event, forward: boolean) {
    //go from one event to the next/previous one
    let visibleContent = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
    let index = Number(visibleContent.getAttribute('index'));
    if (forward) {
      index += 1;
      if (index < this._timelineElements.length) {
        this.eventsWrapper.nativeElement.querySelectorAll('a[index="' + index + '"]')[0].click();
        // this.onEventClick(event, this._timelineElements[index]);
      }
    }
    else {
      index -= 1;
      if (index >= 0) {
        this.eventsWrapper.nativeElement.querySelectorAll('a[index="' + index + '"]')[0].click();
        // this.onEventClick(event, this._timelineElements[index]);
      }
    }
  }

  onEventClick(event: Event, selectedItem: ITimeline) {
    event.preventDefault();
    if (this._disabled) {
      return;
    }
    let element = event.target;
    // detect click on the a single event - show new event content
    let visibleItem = this._timelineElements[0];
    this._timelineElements.forEach(function (item: ITimeline) {
      if (item.selected && item != selectedItem) {
        visibleItem = item;
        item.selected = false;
      }
    });
    this.selectedIndex = this._timelineElements.indexOf(selectedItem);
    selectedItem.selected = true;
    this.updateFilling(element);
    this._cdr.detectChanges();
  }

  initTimeline(timeLines: ITimeline[]) {
    let eventsMinLapse = HorizontalTimelineComponent.minLapse(timeLines);
    // assign a left position to the single events along the timeline
    this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
    // assign a width to the timeline
    this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
    // the timeline has been initialize - show it
    this.loaded = true;
  }

  updateSlide(timelineTotWidth: number, forward: boolean) {
    let translateValue = HorizontalTimelineComponent.getTranslateValue(this.eventsWrapper.nativeElement);

    if (forward) {
      this.translateTimeline(translateValue - this._timelineWrapperWidth + this._eventsMinDistance, this._timelineWrapperWidth - timelineTotWidth)
    } else {
      this.translateTimeline(translateValue + this._timelineWrapperWidth - this._eventsMinDistance, null);
    }
  }

  updateTimelinePosition(element: Element) {
    let eventStyle = window.getComputedStyle(element);
    let eventLeft = HorizontalTimelineComponent.pxToNumber(eventStyle.getPropertyValue('left')) + this._widthDatetime;
    // let translateValue = HorizontalTimelineComponent.getTranslateValue(this.eventsWrapper.nativeElement);

    // if (eventLeft > this._timelineWrapperWidth - translateValue) {
    this.translateTimeline(-eventLeft + this._timelineWrapperWidth / 2, this._timelineWrapperWidth - this.eventsWrapperWidth);
    // }
  }

  translateTimeline(value: number, totWidth: number | null) {
    // only negative translate value
    value = (value > 0) ? 0 : value;
    // value = Math.abs(value) < window.innerWidth / 2 ? value - (window.innerWidth / 2) : value;
    // do not translate more than timeline width
    value = (!(totWidth === null) && value < totWidth) ? totWidth : value;
    // value = Math.abs(value) > window.innerWidth ? value - (window.innerWidth / 2) : value;

    HorizontalTimelineComponent.setTransformValue(this.eventsWrapper.nativeElement, 'translateX', value + 'px');
    // update navigation arrows visibility
    this.prevLinkInactive = value === 0;
    this.nextLinkInactive = value === totWidth;
    window.dispatchEvent(new Event('resize'));
  }

  setTimelineWidth(elements: ITimeline[], width: number, eventsMinLapse: number) {
    let timeSpan = this._widthDatetime;
    if (elements.length > 1) {
      // timeSpan = HorizontalTimelineComponent.dayDiff(elements[0].date, elements[elements.length - 1].date);
      timeSpan = this._widthDatetime * elements.length;
    }
    let timeSpanNorm = timeSpan / eventsMinLapse;
    timeSpanNorm = Math.round(timeSpanNorm) + 4;
    this.eventsWrapperWidth = timeSpanNorm * width;
    let aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
    setTimeout(() => {
      this.updateFilling(aHref);
    }, 500);
    return this.eventsWrapperWidth;
  }

  private updateFilling(element: any) {
    // change .filling-line length according to the selected event
    let eventStyle = window.getComputedStyle(element);
    let eventLeft = eventStyle.getPropertyValue('left');
    let eventWidth = eventStyle.getPropertyValue('width');
    let eventLeftNum = HorizontalTimelineComponent.pxToNumber(eventLeft) + HorizontalTimelineComponent.pxToNumber(eventWidth) / 2;
    let scaleValue = eventLeftNum / this.eventsWrapperWidth;
    HorizontalTimelineComponent.setTransformValue(this.fillingLine.nativeElement, 'scaleX', scaleValue);
    this.updateTimelinePosition(element);
  }

  private initView(): void {
    if (!this._viewInitialized) {
      return;
    }

    if (this._timelineElements && this._timelineElements.length) {
      for (let i = 0; i < this._timelineElements.length; i++) {
        if (this._timelineElements[i].selected) {
          this.selectedIndex = i;
          break;
        }
      }
      this.initTimeline(this._timelineElements);
    }
    this._cdr.detectChanges();
  }

  private setDatePosition(elements: ITimeline[], min: number, eventsMinLapse: number) {
    let timelineEventsArray = this.timelineEvents.toArray();
    let i: number = 0;
    for (let component of elements) {
      // let distance = HorizontalTimelineComponent.dayDiff(elements[0].date, component.date);
      // let distanceNorm = Math.round(distance / eventsMinLapse);
      // let distanceNative = distanceNorm * min;
      let distanceNative = 0;
      // // span
      // let span: HTMLSpanElement = <HTMLSpanElement>timelineEventsArray[i].nativeElement.parentElement.children[1];
      // let spanWidth = HorizontalTimelineComponent.getElementWidth(span);
      // console.log(distanceNative, span, spanWidth)
      timelineEventsArray[i].nativeElement.style.left = Math.max(distanceNative, this._widthDatetime * i) + 'px';
      // span.style.left = (distanceNative + spanWidth) + 'px';
      i++;
    }
  }
}