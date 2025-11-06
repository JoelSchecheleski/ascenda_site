import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/navbar/navbar';
import { GetInTouch } from '../../components/get-in-tuch/get-in-touch';
import { Footer } from '../../components/footer/footer';
import { Properties } from '../../components/properties/properties';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Navbar,
    Properties,
    GetInTouch, 
    Footer
  ],
  templateUrl: './buy.html',
  styleUrl: './buy.scss'
})
export class Buy {

  activeIndex:number = 1;

  TabClick(index:number){
    this.activeIndex = index
  }

    benefitsData = [
      {
        icon:'uil uil-estate',
        title:'Free Consultation',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-bag',
        title:'Buyer Rebate Programs',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-key-skeleton',
        title:'Save Money',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
    ]
}

