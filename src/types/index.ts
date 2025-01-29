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

export interface VendorAnalytics {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCustomers: number;
    repeatCustomers: number;
    customerRetentionRate: number;
  };
  salesTrends: {
    daily: SalesDataPoint[];
    weekly: SalesDataPoint[];
    monthly: SalesDataPoint[];
  };
  topProducts: {
    vegetableId: string;
    name: string;
    totalSales: number;
    revenue: number;
    growth: number;
  }[];
  customerFeedback: {
    averageRating: number;
    totalReviews: number;
    sentimentScore: number;
    recentReviews: Review[];
  };
  inventoryInsights: {
    lowStock: VegetableItem[];
    overStock: VegetableItem[];
    wastageRate: number;
    restockSuggestions: RestockSuggestion[];
  };
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  metrics: {
    quality: number;
    pricing: number;
    freshness: number;
    cleanliness: number;
    service: number;
  };
  comment: string;
  images?: string[];
  purchaseVerified: boolean;
  helpful: number;
  reported: number;
  createdAt: string;
  updatedAt: string;
  reply?: {
    vendorId: string;
    comment: string;
    createdAt: string;
  };
}

export interface RestockSuggestion {
  vegetableId: string;
  name: string;
  currentStock: number;
  suggestedRestock: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MarketTrend {
  vegetableId: string;
  name: string;
  averagePrice: number;
  priceChange: number;
  demandLevel: 'high' | 'medium' | 'low';
  seasonality: 'in-season' | 'off-season';
  competitorPrices: {
    vendorId: string;
    vendorName: string;
    price: number;
  }[];
}

export interface CrowdDensity {
  marketId: string;
  currentDensity: number; // 0-100
  status: 'low' | 'moderate' | 'high' | 'very-high';
  lastUpdated: string;
  forecast: CrowdForecast[];
  peakHours: {
    start: string; // HH:mm
    end: string;   // HH:mm
  }[];
  quietHours: {
    start: string; // HH:mm
    end: string;   // HH:mm
  }[];
  averageWaitTime: number; // in minutes
  parkingAvailability: {
    total: number;
    available: number;
    status: 'ample' | 'limited' | 'full';
  };
}

export interface CrowdForecast {
  hour: string; // HH:mm
  expectedDensity: number; // 0-100
  status: 'low' | 'moderate' | 'high' | 'very-high';
  confidence: number; // 0-100
}

export interface LiveMetrics {
  visitorCount: number;
  checkoutQueueLength: number;
  activeVendors: number;
  temperature: number;
  weather: 'sunny' | 'cloudy' | 'rainy';
  updatedAt: string;
}

export interface VendorLocation {
  vendorId: string;
  name: string;
  location: {
    address: string;
    landmark: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  timings: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  isCurrentlyPresent: boolean;
  lastConfirmed: string;
  nextExpectedArrival?: string;
}

export interface StreetCrowdInfo {
  vendorId: string;
  currentCustomers: number;
  estimatedWaitTime: number; // in minutes
  status: 'quiet' | 'normal' | 'busy' | 'very-busy';
  lastUpdated: string;
  usualPeakTimes: {
    start: string; // HH:mm
    end: string;   // HH:mm
    level: 'high' | 'moderate' | 'low';
  }[];
  nearbyParking: {
    type: 'street' | 'lot' | 'informal';
    description: string;
    distance: number; // in meters
    availability: 'available' | 'limited' | 'full';
  }[];
}

export interface StreetConditions {
  vendorId: string;
  weather: {
    condition: 'sunny' | 'cloudy' | 'rainy';
    temperature: number;
    isIdeal: boolean;
  };
  streetLighting: 'good' | 'moderate' | 'poor';
  seating: {
    available: boolean;
    type: 'chairs' | 'benches' | 'informal' | 'none';
    capacity: number;
  };
  shelter: {
    available: boolean;
    type: 'permanent' | 'temporary' | 'none';
    condition: 'good' | 'fair' | 'poor';
  };
  cleanliness: 'good' | 'fair' | 'poor';
  surroundings: {
    noise: 'quiet' | 'moderate' | 'loud';
    traffic: 'light' | 'moderate' | 'heavy';
    safety: 'good' | 'moderate' | 'caution';
  };
}

export interface VendorRating {
  vendorId: string;
  overallRating: number;
  totalReviews: number;
  metrics: {
    quality: number;
    pricing: number;
    freshness: number;
    cleanliness: number;
    service: number;
  };
  recentReviews: Review[];
  priceCompetitiveness: {
    status: 'competitive' | 'moderate' | 'expensive';
    comparisonScore: number; // 0-100
  };
  qualityBadges: {
    name: string;
    earnedAt: string;
    description: string;
  }[];
  warningFlags: {
    type: 'price_inflation' | 'quality_issues' | 'hygiene_concerns' | 'customer_complaints';
    count: number;
    lastReported: string;
  }[];
  visibilityScore: number; // 0-100, affects search ranking
  improvementSuggestions: string[];
}

export interface PriceReport {
  id: string;
  vendorId: string;
  userId: string;
  itemName: string;
  price: number;
  unit: string;
  reportType: 'regular_update' | 'price_increase' | 'price_decrease';
  previousPrice?: number;
  reportedAt: string;
  verified: boolean;
}

export interface UnsoldItem {
  id: string;
  vendorId: string;
  items: {
    name: string;
    quantity: number;
    unit: 'kg' | 'g' | 'pieces';
    condition: 'good' | 'fair' | 'overripe';
    bestBeforeTime: string;
    price: {
      original: number;
      discounted: number;
    };
    images?: string[];
  }[];
  status: 'available' | 'reserved' | 'collected' | 'expired';
  pickupDetails: {
    location: {
      address: string;
      landmark: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    timeWindow: {
      start: string;
      end: string;
    };
    instructions?: string;
  };
  sustainability: {
    potentialWasteSaved: number; // in kg
    carbonFootprint: number; // in kg CO2
    peopleImpacted: number;
  };
  createdAt: string;
  updatedAt: string;
  collectedBy?: {
    organizationId: string;
    organizationName: string;
    collectionTime: string;
    feedback?: string;
  };
}

export interface SustainabilityMetrics {
  vendorId: string;
  totalStats: {
    wastePreventedKg: number;
    carbonSavedKg: number;
    peopleHelped: number;
    donationsCount: number;
  };
  monthlyStats: {
    month: string; // YYYY-MM
    wastePreventedKg: number;
    carbonSavedKg: number;
    peopleHelped: number;
    donationsCount: number;
  }[];
  badges: {
    name: string;
    earnedAt: string;
    description: string;
  }[];
  impactRank: number; // rank among all vendors
  sustainabilityScore: number; // 0-100
}