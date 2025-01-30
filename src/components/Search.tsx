export interface Vendor {
    id: string;
    name: string;
    marketName: string;
    location: string;
    coordinates: { lat: number; lng: number };
    rating: number;
    distance: number;
    vegetables: string[];
  }
  
  const mockVendors: Vendor[] = [
    {
      id: "1",
      name: "Fresh Farms",
      marketName: "Crawford Market",
      location: "South Mumbai",
      coordinates: { lat: 18.9473, lng: 72.8339 },
      rating: 4.5,
      distance: 1.2,
      vegetables: ["Tomato", "Potato", "Onion", "Carrot", "Spinach"],
    },
    {
      id: "2",
      name: "Green Valley Vegetables",
      marketName: "Dadar Market",
      location: "Central Mumbai",
      coordinates: { lat: 19.0178, lng: 72.8478 },
      rating: 4.8,
      distance: 2.5,
      vegetables: ["Cauliflower", "Capsicum", "Brinjal", "Cabbage", "Garlic"],
    },
    {
      id: "3",
      name: "Nature’s Basket",
      marketName: "Bandra Market",
      location: "Bandra West",
      coordinates: { lat: 19.0558, lng: 72.8295 },
      rating: 4.6,
      distance: 3.1,
      vegetables: ["Pumpkin", "Beetroot", "Radish", "Cucumber", "Lettuce"],
    },
    {
      id: "4",
      name: "Organic Harvest",
      marketName: "Lokhandwala Market",
      location: "Andheri West",
      coordinates: { lat: 19.1356, lng: 72.8270 },
      rating: 4.7,
      distance: 4.3,
      vegetables: ["Bitter Gourd", "Bottle Gourd", "Coriander", "Mint", "Chilli"],
    },
    {
      id: "5",
      name: "Farm Fresh",
      marketName: "Vashi Market",
      location: "Navi Mumbai",
      coordinates: { lat: 19.0770, lng: 72.9980 },
      rating: 4.4,
      distance: 5.6,
      vegetables: ["Drumsticks", "Curry Leaves", "Spring Onion", "Sweet Potato"],
    },
    {
      id: "6",
      name: "Daily Fresh Produce",
      marketName: "Chembur Market",
      location: "Chembur",
      coordinates: { lat: 19.0618, lng: 72.9003 },
      rating: 4.3,
      distance: 3.8,
      vegetables: ["Ginger", "Garlic", "Tomato", "Onion", "Carrot"],
    },
    {
      id: "7",
      name: "Mumbai Agro Mart",
      marketName: "Mulund Market",
      location: "Mulund",
      coordinates: { lat: 19.1726, lng: 72.9565 },
      rating: 4.9,
      distance: 6.4,
      vegetables: ["Mushrooms", "Zucchini", "Celery", "Bell Peppers"],
    },
    {
      id: "8",
      name: "Fresh Picks",
      marketName: "Thane Market",
      location: "Thane",
      coordinates: { lat: 19.2183, lng: 72.9781 },
      rating: 4.5,
      distance: 7.0,
      vegetables: ["Spinach", "Fenugreek", "Broccoli", "Turnip", "Peas"],
    },
    {
      id: "9",
      name: "EcoFresh Mart",
      marketName: "Borivali Market",
      location: "Borivali West",
      coordinates: { lat: 19.2288, lng: 72.8540 },
      rating: 4.6,
      distance: 8.2,
      vegetables: ["Cauliflower", "Cabbage", "Green Beans", "Lady Finger"],
    },
    {
      id: "10",
      name: "Farm to Fork",
      marketName: "Ghatkopar Market",
      location: "Ghatkopar",
      coordinates: { lat: 19.0857, lng: 72.9081 },
      rating: 4.7,
      distance: 3.9,
      vegetables: ["Tomato", "Potato", "Onion", "Garlic", "Brinjal"],
    },
  ];
  
  export default mockVendors;
  