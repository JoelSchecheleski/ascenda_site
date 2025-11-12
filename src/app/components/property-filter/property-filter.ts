import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PropertySearchParams, PropertyType, PropertyPurpose } from '../../models/property.model';

@Component({
  selector: 'app-property-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './property-filter.html',
  styleUrl: './property-filter.scss'
})
export class PropertyFilter {
  @Output() filterChange = new EventEmitter<PropertySearchParams>();
  @Output() search = new EventEmitter<void>();
  
  @Input() showAdvanced = false;

  // Filtros básicos
  location: string = '';
  selectedPurpose: PropertyPurpose | '' = '';
  selectedPropertyType: PropertyType | '' = '';
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;

  // Filtros avançados
  qttBedrooms?: number;
  qttBathrooms?: number;
  qttParkingSpaces?: number;

  // Listas de opções
  propertyTypes: PropertyType[] = [
    PropertyType.HOUSE,
    PropertyType.APARTMENT,
    PropertyType.TWO_STORY_HOUSE,
    PropertyType.CHALET,
    PropertyType.SEMI_DETACHED_HOUSE,
    PropertyType.BUNGALOW,
    PropertyType.STUDIO_APARTMENT,
    PropertyType.FLAT,
    PropertyType.LOFT,
    PropertyType.STUDIO,
    PropertyType.PENTHOUSE,
    PropertyType.DUPLEX,
    PropertyType.TRIPLEX,
    PropertyType.LUXURY_PENTHOUSE,
    PropertyType.TOWNHOUSE,
    PropertyType.MANSION,
    PropertyType.STORE,
    PropertyType.OFFICE,
    PropertyType.WAREHOUSE,
    PropertyType.LAND,
    PropertyType.FARM,
    PropertyType.LOT
  ];

  purposes: PropertyPurpose[] = [
    PropertyPurpose.SALE,
    PropertyPurpose.RENT,
    PropertyPurpose.EXCHANGE
  ];

  bedroomOptions = [1, 2, 3, 4, 5, 6];
  bathroomOptions = [1, 2, 3, 4, 5, 6];
  parkingOptions = [1, 2, 3, 4, 5];

  toggleAdvanced(): void {
    this.showAdvanced = !this.showAdvanced;
  }

  onFilterChange(): void {
    const params: PropertySearchParams = {
      location: this.location || undefined,
      purpose: this.selectedPurpose || undefined,
      propertyType: this.selectedPropertyType || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minArea: this.minArea,
      maxArea: this.maxArea,
      qttBedrooms: this.qttBedrooms,
      qttBathrooms: this.qttBathrooms,
      qttParkingSpaces: this.qttParkingSpaces
    };

    this.filterChange.emit(params);
  }

  onSearch(): void {
    this.onFilterChange();
    this.search.emit();
  }

  clearFilters(): void {
    this.location = '';
    this.selectedPurpose = '';
    this.selectedPropertyType = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.minArea = undefined;
    this.maxArea = undefined;
    this.qttBedrooms = undefined;
    this.qttBathrooms = undefined;
    this.qttParkingSpaces = undefined;
    this.onFilterChange();
  }

  getPropertyTypeLabel(type: PropertyType): string {
    return `FILTER.PROPERTY_TYPE.${type.toUpperCase()}`;
  }

  getPurposeLabel(purpose: PropertyPurpose): string {
    return `FILTER.PURPOSE.${purpose.toUpperCase()}`;
  }
}
