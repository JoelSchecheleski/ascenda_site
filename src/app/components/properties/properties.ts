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
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.scss'
})
export class Properties {

  propertylist:Property[] = PropertyData.slice(0,6)

  @Input() moreOption? :boolean

}
