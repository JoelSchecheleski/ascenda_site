import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import PropertyData from '../../../../../data/property.json'
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../../components/navbar/navbar';

interface Property {
  id:number
  image:string
  name:string
  sqf:string
  beds:string
  baths:string
  price:string
}

@Component({
  selector: 'app-grid-map',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslateModule,
    Navbar, 
    NgSelectModule
  ],
  templateUrl: './grid-map.html',
  styleUrl: './grid-map.scss'
})
export class GridMap {
  property = [
    { id: 1, name: 'Houses' },
    { id: 2, name: 'Apartment' },
    { id: 3, name: 'Offices' },
    { id: 4, name: 'Townhome' },
  ]

  minPrice = [
    {id: 1, name: '500'},
    {id: 2, name: '1000'},
    {id: 3, name: '2000'},
    {id: 4, name: '3000'},
    {id: 5, name: '4000'}
  ]

  maxPrice = [
    {id: 1, name: '500'},
    {id: 2, name: '1000'},
    {id: 3, name: '2000'},
    {id: 4, name: '3000'},
    {id: 5, name: '4000'}
  ]

  propertylist:Property[] = PropertyData
}
