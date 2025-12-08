import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Property, PropertySearchParams, PropertySearchResponse } from '../models/property.model';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly apiUrl = 'https://real-estate-api-psi-seven.vercel.app';
  // private readonly apiUrl = 'http://localhost:3000';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos
  private readonly ENABLE_CACHE_LOGS = false; // Mude para false em produção
  private cache = new Map<string, CacheEntry<PropertySearchResponse>>();

  constructor(private http: HttpClient) {}

  /**
   * Gera chave única de cache baseada nos parâmetros de busca
   */
  private generateCacheKey(params: PropertySearchParams): string {
    return JSON.stringify(params);
  }

  /**
   * Verifica se o cache é válido (não expirou)
   */
  private isCacheValid(entry: CacheEntry<PropertySearchResponse>): boolean {
    return (Date.now() - entry.timestamp) < this.CACHE_DURATION;
  }

  /**
   * Limpa entradas expiradas do cache
   */
  private cleanExpiredCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) >= this.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Busca pública de propriedades com filtros avançados
   * Implementa cache para reduzir chamadas ao backend
   */
  searchProperties(params: PropertySearchParams): Observable<PropertySearchResponse> {
    const cacheKey = this.generateCacheKey(params);

    // Verifica se existe no cache e se ainda é válido
    const cachedEntry = this.cache.get(cacheKey);
    if (cachedEntry && this.isCacheValid(cachedEntry)) {
      if (this.ENABLE_CACHE_LOGS) {
        console.log('✅ Cache HIT - Retornando dados do cache:', params);
      }
      return of(cachedEntry.data);
    }

    if (this.ENABLE_CACHE_LOGS) {
      console.log('❌ Cache MISS - Buscando do servidor:', params);
    }

    let httpParams = new HttpParams();

    // Adicionar parâmetros apenas se existirem
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.state) httpParams = httpParams.set('state', params.state);
    if (params.purpose) httpParams = httpParams.set('purpose', params.purpose);
    if (params.location) httpParams = httpParams.set('location', params.location);
    if (params.propertyType) httpParams = httpParams.set('property_type', params.propertyType);
    if (params.minPrice !== undefined) httpParams = httpParams.set('min_price', params.minPrice.toString());
    if (params.maxPrice !== undefined) httpParams = httpParams.set('max_price', params.maxPrice.toString());
    if (params.minArea !== undefined) httpParams = httpParams.set('min_area', params.minArea.toString());
    if (params.maxArea !== undefined) httpParams = httpParams.set('max_area', params.maxArea.toString());
    if (params.qttBedrooms !== undefined) httpParams = httpParams.set('qtt_bedrooms', params.qttBedrooms.toString());
    if (params.qttParkingSpaces !== undefined) httpParams = httpParams.set('qtt_parking_spaces', params.qttParkingSpaces.toString());
    if (params.qttBathrooms !== undefined) httpParams = httpParams.set('qtt_bathrooms', params.qttBathrooms.toString());
    if (params.description) httpParams = httpParams.set('description', params.description);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize !== undefined) httpParams = httpParams.set('pageSize', params.pageSize.toString());

    const url = `${this.apiUrl}/properties/search?${httpParams.toString()}`;
    if (this.ENABLE_CACHE_LOGS) {
      console.log('📡 API Request:', url);
    }

    return this.http.get<PropertySearchResponse>(`${this.apiUrl}/properties/search`, { params: httpParams })
      .pipe(
        tap(response => {
          // Armazena no cache após receber resposta
          this.cache.set(cacheKey, {
            data: response,
            timestamp: Date.now()
          });

          // Limpa cache expirado periodicamente
          this.cleanExpiredCache();

          if (this.ENABLE_CACHE_LOGS) {
            console.log('💾 Resposta armazenada no cache');
          }
        })
      );
  }

  /**
   * Busca uma propriedade específica por ID
   */
  getProperty(id: string): Observable<Property> {
    const url = `${this.apiUrl}/properties/${id}`;
    console.log('📡 Buscando propriedade:', url);
    return this.http.get<Property>(url);
  }
}
