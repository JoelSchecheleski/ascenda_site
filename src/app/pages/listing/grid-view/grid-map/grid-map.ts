import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../../../components/navbar/navbar';
import { PropertyFilter } from '../../../../components/property-filter/property-filter';
import { PropertyCard } from '../../../../components/property-card/property-card';
import { PropertyService } from '../../../../services/property.service';
import { Property, PropertySearchParams } from '../../../../models/property.model';

@Component({
  selector: 'app-grid-map',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Navbar,
    PropertyFilter,
    PropertyCard
  ],
  templateUrl: './grid-map.html',
  styleUrl: './grid-map.scss'
})
export class GridMap implements OnInit, OnDestroy {
  properties: Property[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  date: number = new Date().getFullYear();

  // Paginação
  currentPage = 1;
  pageSize = 12;
  totalItems = 0;

  // Filtros atuais
  currentFilters: PropertySearchParams = {
    page: this.currentPage,
    pageSize: this.pageSize
  };

  // Debounce para filtros
  private filterTimeout: any;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.searchProperties();
  }

  onFilterChange(filters: PropertySearchParams): void {
    this.currentFilters = {
      ...filters,
      page: 1, // Reset para primeira página ao filtrar
      pageSize: this.pageSize
    };

    // Debounce: aguarda 500ms para aplicar filtros
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.onSearch();
    }, 500);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchProperties();
  }

  searchProperties(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const searchParams: PropertySearchParams = {
      ...this.currentFilters,
      page: this.currentPage,
      pageSize: this.pageSize
    };

    this.propertyService.searchProperties(searchParams).subscribe({
      next: (response) => {
        this.properties = response.items || [];
        this.totalItems = response.total || 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Erro ao buscar propriedades:', error);
        console.error('Status:', error.status);
        console.error('URL:', error.url);

        if (error.status === 404) {
          this.errorMessage = 'Endpoint da API não encontrado. Verifique a URL.';
        } else if (error.status === 0) {
          this.errorMessage = 'Não foi possível conectar à API. Verifique CORS.';
        } else {
          this.errorMessage = `Erro ao buscar propriedades: ${error.message}`;
        }

        this.isLoading = false;
        this.properties = [];
      }
    });
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.searchProperties();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.searchProperties();
    }
  }

  hasNextPage(): boolean {
    return this.currentPage * this.pageSize < this.totalItems;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  ngOnDestroy(): void {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
  }
}
