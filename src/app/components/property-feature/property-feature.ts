import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Property, PropertySearchParams } from '../../models/property.model';
import { PropertyCard } from '../property-card/property-card';

@Component({
  selector: 'app-property-feature',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    PropertyCard
  ],
  templateUrl: './property-feature.html',
  styleUrl: './property-feature.css'
})
export class PropertyFeature implements OnInit, OnDestroy {
  properties: Property[] = [];
  isLoading = false;

  // Filtros
  location: string = '';
  selectedPurpose: string = '';
  selectedPropertyType: string = '';
  minArea: number | null = null;
  maxArea: number | null = null;

  private searchTimeout: any;

  @Input() moreOption?: boolean;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;

    const params: PropertySearchParams = {
      page: 1,
      pageSize: 6
    };

    // Só adiciona filtros se tiverem valor válido
    if (this.location && this.location.trim()) {
      params.location = this.location.trim();
    }
    if (this.selectedPurpose && this.selectedPurpose.trim()) {
      params.purpose = this.selectedPurpose as any;
    }
    if (this.selectedPropertyType && this.selectedPropertyType.trim()) {
      params.propertyType = this.selectedPropertyType as any;
    }
    if (this.minArea && this.minArea > 0) {
      params.minArea = this.minArea;
    }
    if (this.maxArea && this.maxArea > 0) {
      params.maxArea = this.maxArea;
    }

    console.log('🔍 Buscando propriedades na HOME com params:', params);

    this.propertyService.searchProperties(params).subscribe({
      next: (response) => {
        this.properties = response.items || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar propriedades:', error);
        this.properties = [];
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    // Limpa timeout anterior
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.loadProperties();
  }

  onLocationChange(): void {
    // Debounce: aguarda 500ms após o usuário parar de digitar
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.loadProperties();
    }, 500);
  }

  onFilterChange(): void {
    // Quando muda os selects, também aplica debounce para evitar múltiplas chamadas
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.loadProperties();
    }, 300); // 300ms para dropdowns (mais rápido que digitação)
  }

  clearFilters(): void {
    this.location = '';
    this.selectedPurpose = '';
    this.selectedPropertyType = '';
    this.minArea = null;
    this.maxArea = null;

    // Busca todas as propriedades sem filtros
    this.loadProperties();
  }

  ngOnDestroy(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
}
