import { CommonModule } from '@angular/common';
import { Component, OnInit, VERSION } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../../components/navbar/navbar';
import { Footer } from '../../../../components/footer/footer';


@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslateModule,
    Navbar, 
    Footer, 
    LightgalleryModule],
  templateUrl: './property-detail.html',
})
export class PropertyDetail implements OnInit{
  ngOnInit() {
  }
  name = "Angular " + VERSION.major;
  settings = {
    counter: false,
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  
}
