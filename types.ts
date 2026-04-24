
export enum PropertyStatus {
  ForSale = 'For Sale',
  ForRent = 'For Rent',
  Sold = 'Sold',
  Land = 'Land',
}

export interface Property {
  id: number;
  images: string[];
  status: PropertyStatus;
  daysAgo: number;
  isPremium: boolean;
  propertyType: string;
  name: string;
  beds: number;
  baths: number;
  garage: number;
  areaSqm: number;
  priceGHS: number;
  priceUSD: number;
}
