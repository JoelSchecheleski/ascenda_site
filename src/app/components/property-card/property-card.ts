import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss'
})
export class PropertyCard implements OnInit {
  @Input() property!: Property;
  
  currentImageIndex = 0;
  imageError = false;
  private preloadedImages: Set<string> = new Set();

  get currentImage(): string {
    if (this.imageError) {
      return '/assets/images/property/1.jpg';
    }
    if (this.property.images && this.property.images.length > 0) {
      const img = this.property.images[this.currentImageIndex];
      const imageUrl = img.public_url || '/assets/images/property/1.jpg';
      return imageUrl;
    }
    return '/assets/images/property/1.jpg';
  }

  onImageError(): void {
    this.imageError = true;
  }

  get hasMultipleImages(): boolean {
    return !!(this.property.images && this.property.images.length > 1);
  }

  get formattedPrice(): string {
    let price: number | undefined;
    
    if (this.property.purpose === 'sale') {
      price = this.property.value_to_sell;
    } else if (this.property.purpose === 'rent') {
      price = this.property.value_to_rent;
    } else {
      price = this.property.value_to_sell || this.property.value_to_rent;
    }
      
    if (!price) return 'Consultar';
    
    if (price >= 1000000) {
      return `R$ ${(price / 1000000).toFixed(1).replace('.', ',')}M`;
    } else if (price >= 1000) {
      return `R$ ${(price / 1000).toFixed(0)}K`;
    }
    return `R$ ${price.toLocaleString('pt-BR')}`;
  }

  get priceSubLabel(): string | null {
    if (this.property.purpose === 'rent') {
      return '/mês';
    }
    return null;
  }
  
  get displayBedrooms(): number | undefined {
    return this.property.qtt_bedrooms;
  }
  
  get displayBathrooms(): number | undefined {
    return this.property.qtt_bathrooms;
  }
  
  get displayParkingSpaces(): number | undefined {
    return this.property.qtt_parking_spaces;
  }
  
  get displayArea(): number | undefined {
    return this.property.build_area || this.property.land_area;
  }

  constructor(private router: Router) {}

  navigateImage(direction: number): void {
    if (!this.hasMultipleImages) return;
    
    const totalImages = this.property.images!.length;
    this.currentImageIndex = (this.currentImageIndex + direction + totalImages) % totalImages;
    
    // Pré-carregar imagem adjacente
    this.preloadAdjacentImages();
  }

  private preloadAdjacentImages(): void {
    if (!this.property.images || this.property.images.length <= 1) return;
    
    const totalImages = this.property.images.length;
    
    // Pré-carregar próxima e anterior
    const nextIndex = (this.currentImageIndex + 1) % totalImages;
    const prevIndex = (this.currentImageIndex - 1 + totalImages) % totalImages;
    
    this.preloadImage(this.property.images[nextIndex].public_url);
    this.preloadImage(this.property.images[prevIndex].public_url);
  }

  private preloadImage(url?: string): void {
    if (!url || this.preloadedImages.has(url)) return;
    
    const img = new Image();
    img.src = url;
    this.preloadedImages.add(url);
  }

  ngOnInit(): void {
    // Pré-carregar primeira e segunda imagem ao inicializar
    if (this.property.images && this.property.images.length > 0) {
      this.preloadImage(this.property.images[0].public_url);
      if (this.property.images.length > 1) {
        this.preloadImage(this.property.images[1].public_url);
      }
    }
  }

  getPropertyTypeTranslation(): string {
    return `FILTER.PROPERTY_TYPE.${this.property.property_type?.toUpperCase() || 'HOUSE'}`;
  }

  getPurposeTranslation(): string {
    return `FILTER.PURPOSE.${this.property.purpose?.toUpperCase() || 'SALE'}`;
  }

  onCardClick(): void {
    if (this.property?.id) {
      // Armazena a propriedade no sessionStorage como fallback
      sessionStorage.setItem('currentProperty', JSON.stringify(this.property));
      
      // Navega passando a propriedade via state
      this.router.navigate(['/property-detail', this.property.id], {
        state: { property: this.property }
      });
    }
  }
}
