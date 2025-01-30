import vegetablesData from '../data/vegetables.json';

export interface VegetableData {
  vegetable: string;
  price_per_kg: number;
  stock: number;
  quality: string;
  season: string;
  benefits: string;
}

export function readVegetableData(): VegetableData[] {
  return vegetablesData.vegetables;
}

export function searchVegetables(query: string): VegetableData[] {
  const searchTerm = query.toLowerCase();
  
  return vegetablesData.vegetables.filter(veg => 
    veg.vegetable.toLowerCase().includes(searchTerm) ||
    veg.quality.toLowerCase().includes(searchTerm) ||
    veg.season.toLowerCase().includes(searchTerm) ||
    veg.benefits.toLowerCase().includes(searchTerm)
  );
}

export function getVegetablesByPrice(maxPrice: number): VegetableData[] {
  return vegetablesData.vegetables
    .filter(veg => veg.price_per_kg <= maxPrice)
    .sort((a, b) => a.price_per_kg - b.price_per_kg);
}

export function getVegetablesBySeason(season: string): VegetableData[] {
  return vegetablesData.vegetables.filter(veg => 
    veg.season.toLowerCase().includes(season.toLowerCase()) ||
    veg.season.toLowerCase().includes('all season')
  );
}

export function getVegetableInfo(vegetableName: string): VegetableData | undefined {
  return vegetablesData.vegetables.find(veg => 
    veg.vegetable.toLowerCase() === vegetableName.toLowerCase()
  );
}