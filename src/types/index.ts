export interface Vendor {
  id: string;
  name: string;
  marketName: string;
  location: string;
  rating: number;
  distance: number; // in kilometers
  vegetables: VegetableItem[];
  contact?: string;
  email?: string;
  openingHours?: string;
  isVerified?: boolean;
}

export interface VegetableItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  quality: number; // 1-5 rating
  lastUpdated: string;
  priceHistory?: PriceHistoryItem[];
  description?: string;
  category?: string;
  inStock: boolean;
}

export interface PriceHistoryItem {
  price: number;
  date: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  vegetableId: string;
  vendorId: string;
  targetPrice: number;
  createdAt: string;
  notifyOnPriceDrop: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'PRICE_DROP' | 'BACK_IN_STOCK' | 'TARGET_PRICE_REACHED';
  message: string;
  vegetableId: string;
  vendorId: string;
  isRead: boolean;
  createdAt: string;
}

export interface PriceUpdate {
  vegetableId: string;
  vendorId: string;
  oldPrice: number;
  newPrice: number;
  timestamp: string;
}

export interface VendorStats {
  totalSales: number;
  averageRating: number;
  totalProducts: number;
  viewsToday: number;
  priceUpdatesToday: number;
}

export interface Booking {
  id: string;
  userId: string;
  vendorId: string;
  items: BookingItem[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  pickupDate: string;
  pickupTime: string;
  createdAt: string;
  notes?: string;
  remindersSent: number;
  lastReminderSent?: string;
}

export interface BookingItem {
  vegetableId: string;
  name: string;
  quantity: number;
  unit: string;
  priceAtBooking: number;
}

export interface ReminderSettings {
  userId: string;
  enableEmailReminders: boolean;
  enablePushNotifications: boolean;
  reminderTiming: {
    dayBefore: boolean;
    hourBefore: boolean;
    thirtyMinutes: boolean;
  };
  email?: string;
  phone?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  dietaryPreferences: string[];
  healthConditions: string[];
  allergies: string[];
  favoriteVegetables: string[];
  dislikedVegetables: string[];
  preferredMarkets: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  cookingFrequency: 'daily' | 'weekly' | 'occasionally';
  householdSize: number;
}

export interface SeasonalVegetable {
  id: string;
  name: string;
  season: {
    start: string; // MM-DD
    end: string;   // MM-DD
  };
  peak: {
    start: string; // MM-DD
    end: string;   // MM-DD
  };
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    vitamins: string[];
    minerals: string[];
  };
  healthBenefits: string[];
  storageLife: number; // in days
  cookingTips: string[];
  substitutes: string[];
}

export interface VegetableRecommendation {
  vegetableId: string;
  score: number;
  reasons: string[];
  seasonality: 'in-season' | 'peak-season' | 'off-season';
  priceRange: {
    min: number;
    max: number;
  };
  nutritionalMatch: number; // 0-100
  vendors: {
    id: string;
    name: string;
    price: number;
    distance: number;
  }[];
}
