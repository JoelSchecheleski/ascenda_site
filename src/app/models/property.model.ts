// Interfaces para o sistema de propriedades (snake_case da API)
export interface Property {
  id: string;
  title: string;
  description?: string;
  property_type?: string;
  purpose?: string;
  
  // Preços
  value_to_sell?: number;
  value_to_rent?: number;
  
  // Áreas
  build_area?: number;
  land_area?: number;
  common_area?: number;
  
  // Quantidades
  qtt_bedrooms?: number;
  qtt_bathrooms?: number;
  qtt_parking_spaces?: number;
  qtt_rooms?: number;
  
  // Endereço
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  
  // Outros campos
  property_code?: string;
  images?: PropertyImage[];
  created_at?: string;
  updated_at?: string;
  visibility?: string;
  instagram_url?: string;
  youtube_url?: string;
  other_url?: string;
}

export interface PropertyImage {
  id: string;
  title?: string;
  description?: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  public_url?: string;
  display_order?: number;
}

export enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  TWO_STORY_HOUSE = 'twoStoryHouse',
  CHALET = 'chalet',
  SEMI_DETACHED_HOUSE = 'semiDetachedHouse',
  BUNGALOW = 'bungalow',
  ANNEX = 'annex',
  STUDIO_APARTMENT = 'studioApartment',
  FLAT = 'flat',
  LOFT = 'loft',
  STUDIO = 'studio',
  PENTHOUSE = 'penthouse',
  DUPLEX = 'duplex',
  TRIPLEX = 'triplex',
  LUXURY_PENTHOUSE = 'luxuryPenthouse',
  TOWNHOUSE = 'townhouse',
  GARDEN_APARTMENT = 'gardenApartment',
  MANSION = 'mansion',
  STORE = 'store',
  OFFICE = 'office',
  WAREHOUSE = 'warehouse',
  COMMERCIAL_ROOM = 'commercialRoom',
  FACTORY = 'factory',
  STORAGE = 'storage',
  LAND = 'land',
  FARM = 'farm',
  COUNTRY_HOUSE = 'countryHouse',
  LOT = 'lot',
  BUILDING = 'building',
  CONDOMINIUM = 'condominium',
  OFF_PLAN_PROPERTY = 'offPlanProperty',
  HIGH_END_PROPERTY = 'highEndProperty',
  HOTEL = 'hotel'
}

export enum PropertyPurpose {
  SALE = 'sale',
  RENT = 'rent',
  EXCHANGE = 'exchange'
}

export interface PropertySearchParams {
  q?: string;
  state?: string;
  purpose?: PropertyPurpose;
  location?: string;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  qttBedrooms?: number;
  qttParkingSpaces?: number;
  qttBathrooms?: number;
  description?: string;
  page?: number;
  pageSize?: number;
}

export interface PropertySearchResponse {
  items: Property[];
  total: number;
  page: number;
  pageSize: number;
}
