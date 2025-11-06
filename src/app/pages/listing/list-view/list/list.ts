import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterLink } from '@angular/router';
import PropertyData from '../../../../../data/property.json'
import { Navbar } from '../../../../components/navbar/navbar';
import { Footer } from '../../../../components/footer/footer';

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
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    Navbar, 
    NgSelectModule, 
    Footer
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  
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
