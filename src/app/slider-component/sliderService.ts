import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private slides = [
    { id: 1, image: 'assets/img.png', url: 'https://iso.500px.com/wp-content/uploads/2014/12/IMG_0086-2-1500px.jpg', priority: 1 },
    { id: 2, image: 'assets/img_1.png', url: 'https://www.peakmountaineering.com/wp-content/uploads/2018/08/Navigating-towards-Ladybower-1500px.jpg', priority: 1 },
    { id: 3, image: 'assets/img_2.png', url: 'https://www.peakmountaineering.com/wp-content/uploads/2018/08/Ladybower-View.jpeg', priority: 2 }
  ];

  getSlides(): Observable<any[]> {
    return of(this.slides);
  }
}
