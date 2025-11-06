 // @ts-nocheck
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, TranslateModule, Navbar, Footer],
  templateUrl: './sell.html',
  styleUrl: './sell.scss'
})
export class Sell {



  changevalue:number = 0
  brokerage:number = 0

  saverange(event:any){
    this.changevalue = event.target.value
    this.brokerage = parseFloat(this.changevalue *0.01).toFixed(2)
    
  }

    aboutData = [
      {
        icon:'uil uil-estate',
        title:'Evaluate Property',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-bag',
        title:'Meeting with Agent',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-key-skeleton',
        title:'Close the Deal',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
    ]
}
