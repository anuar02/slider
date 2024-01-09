import { Component } from '@angular/core';
import {SliderService} from "./slider-component/sliderService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-test';
  public slideData: any = [];

  constructor(private sliderService: SliderService) {
    this.loadSlideData();
    console.log(this.slideData, ' lol')
  }

  private loadSlideData() {
    this.sliderService.getSlides().subscribe(data => {
      this.slideData = data;
    });
  }
}
