import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from '../../components/navbar/navbar';
import { GetInTouch } from '../../components/get-in-tuch/get-in-touch';
import { Footer } from '../../components/footer/footer';
import { PropertyCard } from '../../components/property-card/property-card';
import { PropertyService } from '../../services/property.service';
import { Property, PropertyPurpose, PropertySearchParams } from '../../models/property.model';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    Navbar,
    PropertyCard,
    GetInTouch,
    Footer
  ],
  templateUrl: './buy.html',
  styleUrl: './buy.scss'
})
export class Buy implements OnInit, OnDestroy {

  // Propriedades para venda
  properties: Property[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  // Paginação
  currentPage = 1;
  pageSize = 12;
  totalItems = 0;

  // Debounce para busca
  private searchTimeout: any;

  // Termo de busca
  searchTerm: string = '';

  activeIndex:number = 1;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  TabClick(index:number){
    this.activeIndex = index
  }

  loadProperties(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const searchParams: PropertySearchParams = {
      purpose: PropertyPurpose.SALE, // Apenas propriedades para COMPRA
      q: this.searchTerm || undefined,
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
        console.error('❌ Erro ao buscar propriedades para compra:', error);
        this.errorMessage = 'Erro ao carregar propriedades. Tente novamente.';
        this.isLoading = false;
        this.properties = [];
      }
    });
  }

  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    // Debounce: aguarda 500ms após o usuário parar de digitar
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.loadProperties();
    }, 500);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadProperties();
      this.scrollToProperties();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadProperties();
      this.scrollToProperties();
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

  scrollToProperties(): void {
    const element = document.querySelector('.properties-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

    benefitsData = [
      {
        icon:'uil uil-estate',
        title:'Free Consultation',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-bag',
        title:'Buyer Rebate Programs',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-key-skeleton',
        title:'Save Money',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
    ]
}

