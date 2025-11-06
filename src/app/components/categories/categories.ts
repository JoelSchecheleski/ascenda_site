import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
    categoriesData = [
      {
        image:'assets/images/property/residential.jpg',
        name:'Residencial',
        title:'46 disponíveis'
      },
      {
        image:'assets/images/property/land.jpg',
        name:'Terrenos',
        title:'124 disponíveis'
      },
      {
        image:'assets/images/property/commercial.jpg',
        name:'Comercial',
        title:'265 disponíveis'
      },
      {
        image:'assets/images/property/industrial.jpg',
        name:'Industrial',
        title:'452 disponíveis'
      },
      {
        image:'assets/images/property/investment.jpg',
        name:'Investimento',
        title:'12 disponíveis'
      },
    ]
}
