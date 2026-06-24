const defaultDeals = [
  {
    id: 1,
    badge: "17% OFF",
    color: "bg-red-500",
    image: "/cars/baleno.jpg",
    name: "Maruti Suzuki Baleno",
    price: "₹5,40,000",
    original: "₹6,50,000",
    savings: "₹1,10,000",
    year: "2020",
    kms: "41,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    brand: "Maruti Suzuki",
    bodyType: "Hatchback",
    owner: "2nd Owner",
    colorName: "Silver",
    discountPercentage: 17
  },
  {
    id: 2,
    badge: "16% OFF",
    color: "bg-red-500",
    image: "/cars/ecosport.jpg",
    name: "Ford EcoSport Titanium",
    price: "₹7,75,000",
    original: "₹9,20,000",
    savings: "₹1,45,000",
    year: "2019",
    kms: "62,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    brand: "Ford",
    bodyType: "SUV",
    owner: "2nd Owner",
    colorName: "White",
    discountPercentage: 16
  },
  {
    id: 3,
    badge: "17% OFF",
    color: "bg-red-500",
    image: "/cars/i20.jpg",
    name: "Hyundai i20 Sportz",
    price: "₹6,50,000",
    original: "₹7,80,000",
    savings: "₹1,30,000",
    year: "2021",
    kms: "28,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    brand: "Hyundai",
    bodyType: "Hatchback",
    owner: "2nd Owner",
    colorName: "Red",
    discountPercentage: 17
  },
  {
    id: 4,
    badge: "21% OFF",
    color: "bg-red-500",
    image: "/cars/tiago.jpg",
    name: "Tata Tiago XT",
    price: "₹4,10,000",
    original: "₹5,20,000",
    savings: "₹1,10,000",
    year: "2020",
    kms: "35,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    brand: "Tata",
    bodyType: "Hatchback",
    owner: "2nd Owner",
    colorName: "Blue",
    discountPercentage: 21
  },
];

export const getStoredDeals = () => {
  if (typeof window === "undefined") return defaultDeals;
  const stored = localStorage.getItem("budget_deals");
  if (!stored) {
    localStorage.setItem("budget_deals", JSON.stringify(defaultDeals));
    return defaultDeals;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultDeals;
  }
};

export let deals = getStoredDeals();

export const refreshDeals = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("budget_deals");
    if (stored) {
      try {
        deals = JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
  }
};
