import { CommonModule } from '@angular/common';
import { Component, OnInit, VERSION, ViewChild, ViewContainerRef, ComponentRef, createComponent, EnvironmentInjector, ApplicationRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { BeforeSlideDetail, AfterSlideDetail } from 'lightgallery/lg-events';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Navbar } from '../../../../components/navbar/navbar';
import { Footer } from '../../../../components/footer/footer';
import { PropertyService } from '../../../../services/property.service';
import { Property } from '../../../../models/property.model';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import lgVideo from 'lightgallery/plugins/video';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';


@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslateModule,
    Navbar,
    Footer,
    LightgalleryModule,
    YouTubePlayerModule],
  templateUrl: './property-detail.html',
})
export class PropertyDetail implements OnInit{
  property: Property | null = null;
  isLoading = true;
  error: string | null = null;

  // Referência para o player do YouTube injetado dinamicamente na galeria
  private youtubePlayerRef: ComponentRef<YouTubePlayer> | null = null;

  name = "Angular " + VERSION.major;
  settings = {
    counter: true,
    plugins: [lgZoom, lgThumbnail],
    selector: '.gallery-item',
    download: false,
    licenseKey: '0000-0000-000-0000',
    speed: 500,
    actualSize: false,
    zoom: true,
    scale: 1,
    enableZoomAfter: 0
  };

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');

    if (!propertyId) {
      this.error = 'ID da propriedade não encontrado';
      this.isLoading = false;
      return;
    }


    // Tenta obter propriedade do state da navegação
    const navigation = history.state;
    if (navigation?.property) {
      this.property = navigation.property;
      this.isLoading = false;
      return;
    }

    // Tenta obter do sessionStorage
    const storedProperty = sessionStorage.getItem('currentProperty');
    if (storedProperty) {
      try {
        const property = JSON.parse(storedProperty);
        if (property.id === propertyId) {
          this.property = property;
          this.isLoading = false;
          return;
        }
      } catch (e) {
        console.warn('⚠️ Erro ao parsear propriedade do sessionStorage:', e);
      }
    }

    // Se não encontrou nos estados, tenta buscar da API
    this.loadProperty(propertyId);
  }

  loadProperty(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.propertyService.getProperty(id).subscribe({
      next: (property) => {
        this.property = property;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Erro detalhado ao carregar propriedade:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Mensagem:', error.message);
        console.error('❌ URL:', error.url);

        if (error.status === 404) {
          this.error = 'Propriedade não encontrada';
        } else if (error.status === 0) {
          this.error = 'Erro de conexão com o servidor. Verifique sua internet ou tente novamente.';
        } else {
          this.error = `Erro ao carregar os detalhes da propriedade (${error.status})`;
        }

        this.isLoading = false;
      }
    });
  }

  get formattedPrice(): string {
    if (!this.property) return 'Consultar';

    let price: number | undefined;

    if (this.property.purpose === 'sale') {
      price = this.property.value_to_sell;
    } else if (this.property.purpose === 'rent') {
      price = this.property.value_to_rent;
    } else {
      price = this.property.value_to_sell || this.property.value_to_rent;
    }

    if (!price) return 'Consultar';

    return `R$ ${price.toLocaleString('pt-BR')}`;
  }

  get priceSubLabel(): string | null {
    if (!this.property) return null;
    if (this.property.purpose === 'rent') {
      return '/mês';
    }
    return null;
  }

  /**
   * Retorna todos os itens da galeria (imagens + vídeo)
   */
  get allGalleryItems(): any[] {
    if (!this.property) {
      return [];
    }

    const items = [...(this.property.images || [])];

    // Adiciona vídeo do YouTube no final se existir
    if (this.property.youtube_url) {
      items.push({
        id: 'youtube-video',
        public_url: this.property.youtube_url,
        title: 'Vídeo do Imóvel',
        description: 'Assista ao vídeo completo',
        isVideo: true
      } as any);
    }

    return items;
  }

  get imageRows(): any[][] {
    if (!this.property) {
      return [];
    }

    // Pega imagens restantes (exceto a primeira)
    const remainingImages = this.property.images && this.property.images.length > 1
      ? this.property.images.slice(1)
      : [];

    const items = [...remainingImages];

    // Adiciona vídeo do YouTube no final se existir
    if (this.property.youtube_url) {
      items.push({
        id: 'youtube-video',
        public_url: this.property.youtube_url,
        title: 'Vídeo do Imóvel',
        description: 'Assista ao vídeo completo',
        isVideo: true
      } as any);
    }

    // Se não há items, retorna vazio
    if (items.length === 0) {
      return [];
    }

    const rows: any[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(items.slice(i, i + 2));
    }

    return rows;
  }

  onAfterSlide = (detail: AfterSlideDetail): void => {
    const { index } = detail;

    // Verificar se é um vídeo
    const allItems = this.allGalleryItems;
    if (allItems[index]?.isVideo) {
      this.injectYouTubePlayer(allItems[index].public_url);
    } else {
      // Se não é vídeo, remove o player se existir
      this.destroyYouTubePlayer();
    }
  };

  private injectYouTubePlayer(url: string): void {
    const videoId = this.getYoutubeVideoId(url);
    if (!videoId) return;

    // Remove player anterior se existir
    this.destroyYouTubePlayer();

    // Usa setTimeout para garantir que o DOM do lightgallery está pronto
    setTimeout(() => {
      // Encontra o container principal da galeria (lg-inner)
      const lgInner = document.querySelector('.lg-inner');
      if (!lgInner) {
        console.error('❌ lg-inner não encontrado');
        return;
      }

      // Cria um overlay absoluto sobre toda a galeria
      const overlay = document.createElement('div');
      overlay.className = 'youtube-player-overlay';
      overlay.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; z-index: 9999;';

      // Calcula dimensões para ocupar o máximo possível mantendo proporção
      const containerWidth = lgInner.clientWidth;
      const containerHeight = lgInner.clientHeight;

      // Calcula qual dimensão limita (largura ou altura)
      const aspectRatio = 16 / 9;
      let playerWidth, playerHeight;

      if (containerWidth / containerHeight > aspectRatio) {
        // Limitado pela altura
        playerHeight = containerHeight * 0.9;
        playerWidth = playerHeight * aspectRatio;
      } else {
        // Limitado pela largura
        playerWidth = containerWidth * 0.9;
        playerHeight = playerWidth / aspectRatio;
      }

      // Container do player
      const playerContainer = document.createElement('div');
      playerContainer.style.cssText = `width: ${playerWidth}px; height: ${playerHeight}px; position: relative; box-shadow: 0 25px 80px rgba(0,0,0,0.9);`;
      overlay.appendChild(playerContainer);
      lgInner.appendChild(overlay);

      // Cria componente YouTubePlayer dinamicamente
      this.youtubePlayerRef = createComponent(YouTubePlayer, {
        environmentInjector: this.injector,
        hostElement: playerContainer
      });

      // Configura o player
      this.youtubePlayerRef.setInput('videoId', videoId);
      this.youtubePlayerRef.setInput('width', playerWidth);
      this.youtubePlayerRef.setInput('height', playerHeight);
      this.youtubePlayerRef.setInput('playerVars', {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        playsinline: 1
      });
      this.youtubePlayerRef.setInput('suggestedQuality', 'highres');

      // Detecta mudanças
      this.appRef.attachView(this.youtubePlayerRef.hostView);
      this.youtubePlayerRef.changeDetectorRef.detectChanges();

    }, 100);
  }

  private destroyYouTubePlayer(): void {
    if (this.youtubePlayerRef) {
      this.appRef.detachView(this.youtubePlayerRef.hostView);
      this.youtubePlayerRef.destroy();
      this.youtubePlayerRef = null;

      // Remove o overlay também
      const overlay = document.querySelector('.youtube-player-overlay');
      if (overlay) {
        overlay.remove();
      }

    }
  }


  /**
   * Extrai o ID do vídeo do YouTube da URL
   */
  getYoutubeVideoId(url: string): string {
    let videoId = '';
    try {
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1]?.split('?')[0] || '';
      }
    } catch (e) {
      console.error('Erro ao extrair ID do vídeo:', e);
    }
    return videoId;
  }

  /**
   * Gera o atributo data-video para o lightgallery
   * Formato esperado: {"source": [{"src":"videoUrl", "type":"video/youtube"}], "attributes":{"preload":false, "controls": true}}
   */
  getVideoData(url: string): string {
    const videoId = this.getYoutubeVideoId(url);

    if (!videoId) {
      console.error('❌ Não foi possível extrair o ID do vídeo');
      return '{}';
    }

    // Formato que o lightgallery espera
    const videoData = {
      "source": [
        {
          "src": `https://www.youtube.com/watch?v=${videoId}`,
          "type": "video/youtube"
        }
      ],
      "attributes": {
        "preload": false,
        "controls": true
      }
    };

    const jsonData = JSON.stringify(videoData);
    return jsonData;
  }

  /**
   * Abre o WhatsApp com mensagem para reservar o imóvel
   */
  openWhatsAppBooking(): void {
    const phoneNumber = '+5547996688829';
    const propertyUrl = window.location.href;
    const ref = this.property?.property_code || 'este imóvel';
    const message = encodeURIComponent(
      `Olá! Gostaria de *RESERVAR* o imóvel:\n\n` +
      `* REF: ${ref}\n` +
      `* ${this.formattedPrice}${this.priceSubLabel || ''}\n\n` +
      `${propertyUrl}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Abre o WhatsApp com mensagem para fazer oferta do imóvel
   */
  openWhatsAppOffer(): void {
    const phoneNumber = '+5547996688829';
    const propertyUrl = window.location.href;
    const ref = this.property?.property_code || 'este imóvel';
    const message = encodeURIComponent(
      `Olá! Gostaria de *FAZER UMA OFERTA* para o imóvel:\n\n` +
      `* REF: ${ref}\n` +
      `* ${this.formattedPrice}${this.priceSubLabel || ''}\n\n` +
      `${propertyUrl}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
