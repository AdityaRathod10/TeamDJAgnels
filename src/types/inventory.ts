export interface Vegetable {
    id: string
    name: string
    price: number
    unit: string
    stock: number
    category: string
    organic: boolean
  }
  
  export type VegetableFormData = Omit<Vegetable, "id">
  
  