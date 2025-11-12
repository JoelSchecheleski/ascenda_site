import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../../components/navbar/navbar";
import { GetInTouch } from "../../../components/get-in-tuch/get-in-touch";
import { Team } from "../../../components/team/team";
import { PropertyFeature } from "../../../components/property-feature/property-feature";
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-index-eleven',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TranslateModule,
    Navbar,
    GetInTouch,
    Team,
    PropertyFeature,
    Footer
],
  templateUrl: './index-eleven.html',
  styleUrl: './index-eleven.css'
})
export class IndexEleven implements AfterViewInit {
  @ViewChild('propertySection') propertySection!: ElementRef;
  @ViewChild(PropertyFeature) propertyFeatureComponent!: PropertyFeature;

  heroSearchQuery: string = '';
  private componentReady = false;

  ngAfterViewInit(): void {
    this.componentReady = true;
  }

  onHeroSearch(event: Event): void {
    event.preventDefault();

    if (!this.heroSearchQuery.trim()) {
      return;
    }

    if (!this.componentReady || !this.propertyFeatureComponent) {
      console.warn('⚠️ Componente ainda não está pronto');
      return;
    }

    console.log('🔎 Hero Search:', this.heroSearchQuery.trim());

    // Limpa outros filtros para buscar apenas por localização
    this.propertyFeatureComponent.selectedPurpose = '';
    this.propertyFeatureComponent.selectedPropertyType = '';
    this.propertyFeatureComponent.minArea = null;
    this.propertyFeatureComponent.maxArea = null;

    // Define a localização
    this.propertyFeatureComponent.location = this.heroSearchQuery.trim();

    // Cancela qualquer timeout pendente
    if (this.propertyFeatureComponent['searchTimeout']) {
      clearTimeout(this.propertyFeatureComponent['searchTimeout']);
    }

    console.log('✅ Location setada:', this.propertyFeatureComponent.location);

    // Inicia o loading e faz scroll ANTES da busca
    this.propertyFeatureComponent.isLoading = true;

    // Faz scroll imediatamente
    this.propertySection?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Aguarda um pouco para o scroll e então faz a busca
    setTimeout(() => {
      this.propertyFeatureComponent.loadProperties();
    }, 300);
  }
}
