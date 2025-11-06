import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import PropertyData from '../../../../../data/property.json'
import { RouterLink } from '@angular/router';
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
  selector: 'app-grid-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    Navbar, 
    Footer],
  templateUrl: './grid-sidebar.html',
  styleUrl: './grid-sidebar.scss'
})
export class GridSidebar {
  propertylist:Property[] = PropertyData
}
