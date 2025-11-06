import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarFull } from '../../../../components/navbar-full/navbar-full';
import { Footer } from '../../../../components/footer/footer';
import PropertyData from '../../../../../data/property.json'

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
  selector: 'app-list-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarFull,
    Footer
  ],
  templateUrl: './list-sidebar.html',
  styleUrl: './list-sidebar.scss'
})
export class ListSidebar {

  propertylist:Property[] = PropertyData
  
}
