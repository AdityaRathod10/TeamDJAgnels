export interface Market {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  distance: number;
  openingHours: string;
  closingHours: string;
  facilities: string[];
  imageUrl: string;
  vendorCount: number;
  vegetableTypes: number;
  averagePriceRange: {
    min: number;
    max: number;
  };
}
