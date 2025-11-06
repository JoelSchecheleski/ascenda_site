// @ts-nocheck 
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
 import { tns } from 'tiny-slider/src/tiny-slider'
import { Navbar } from '../../../../components/navbar/navbar';
import { Footer } from '../../../../components/footer/footer';

@Component({
  selector: 'app-property-detail-two',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './property-detail-two.html',
  styleUrl: './property-detail-two.scss'
})
export class PropertyDetailTwo {
  slider: any;

  ngAfterViewInit() {
    const sliderContainer = document.querySelector('.tiny-one-item');
    if (sliderContainer) {
      this.slider = tns({
        container: '.tiny-one-item',
        items: 1,
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
      });
    }
  }
  images = [
    "assets/images/property/single/1.jpg","assets/images/property/single/2.jpg","assets/images/property/single/3.jpg","assets/images/property/single/4.jpg","assets/images/property/single/5.jpg"
  ]
}
