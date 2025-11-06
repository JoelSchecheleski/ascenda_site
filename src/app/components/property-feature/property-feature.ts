import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import PropertyData from '../../../data/property.json'
import { RouterLink } from '@angular/router';

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
  selector: 'app-property-feature',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './property-feature.html',
  styleUrl: './property-feature.css'
})
export class PropertyFeature {
  propertylist:Property[] = PropertyData.slice(0,6)

  @Input() moreOption? :boolean
}
