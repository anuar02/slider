import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { SliderService } from './sliderService';

@Component({
  selector: 'app-slider',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  private slideSubject = new Subject<any>();
  private slidesSubscription: Subscription;
  private timerSubscription: Subscription;
  @Input() data:any[]= []
  public checker = false;
  public slideToShow: any = null;
  public highOrder: any = null;
  public currentSlide: any;
  public displayTime = 3000;
  public currentIndex = 0;

  constructor(private sliderService: SliderService) {
    this.slidesSubscription = new Subscription();
    this.timerSubscription = new Subscription();
  }

  ngOnInit() {
    this.subscribeToSlides();
    this.data = this.data.sort((a, b) => b.priority - a.priority);
    this.startSlider();

    const lastSlideIndex = localStorage.getItem('lastSlideIndex');
    if (lastSlideIndex) {
      this.currentIndex = +lastSlideIndex;
    }
  }

  ngOnDestroy() {
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private subscribeToSlides() {
    this.slidesSubscription = this.slideSubject.subscribe(slide => {
      this.currentSlide = slide;
      localStorage.setItem('lastSlideIndex', this.currentIndex.toString());
    });
  }

  private startSlider() {
    this.currentIndex = 0;
    this.highOrder = this.data.filter(x => x.priority > 1);
    this.data = this.data.filter(x => x.priority !== 2);

    this.timerSubscription = timer(0, this.displayTime).subscribe(() => {
      if (!this.checker) {
        this.checker = true;
        this.slideSubject.next(this.highOrder[0]);
      } else {
        this.slideToShow = this.data[this.currentIndex];
        this.slideSubject.next(this.slideToShow);
        this.currentIndex++;
        this.checker = false;
      }
      if (this.currentIndex === 2) {
        this.currentIndex = 0;
      }
    });
  }
}
