import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export const seedDatabaseIfNeeded = async () => {
  try {
    // 1. Seed Cars & Deals into 'cars' collection
    const carsCol = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCol);
    
    if (carsSnapshot.empty) {
      console.log("Firestore 'cars' collection is empty. Seeding defaults...");
      
      const { getStoredCars } = await import("../data/cars");
      const { getStoredDeals } = await import("../data/deals");
      
      const defaultCars = getStoredCars();
      const defaultDeals = getStoredDeals();
      
      // Add regular cars
      for (const car of defaultCars) {
        const numericPrice = parseInt(car.price.replace(/[^\d]/g, ""), 10);
        const cleanCar = {
          badge: car.badge || "CERTIFIED",
          color: car.color || "bg-blue-600",
          image: car.image || "",
          gallery: car.gallery || [],
          name: car.name,
          price: isNaN(numericPrice) ? 0 : numericPrice,
          year: String(car.year),
          kms: car.kms,
          fuel: car.fuel,
          transmission: car.transmission,
          brand: car.brand,
          bodyType: car.bodyType || "Hatchback",
          owner: car.owner || "2nd Owner",
          colorName: car.colorName || "Unknown",
          registrationCity: car.registrationCity || "Pune",
          insurance: car.insurance || "Comprehensive",
          description: car.description || "Well maintained pre-owned car.",
          features: car.features || [],
          isDiscount: false,
          createdAt: serverTimestamp()
        };
        await addDoc(carsCol, cleanCar);
      }
      
      // Add discount deals
      for (const deal of defaultDeals) {
        const numericPrice = parseInt(deal.price.replace(/[^\d]/g, ""), 10);
        const numericOriginal = parseInt(deal.original.replace(/[^\d]/g, ""), 10);
        const numericSavings = parseInt(deal.savings.replace(/[^\d]/g, ""), 10);
        
        const cleanDeal = {
          badge: deal.badge || "HOT DEAL",
          color: deal.color || "bg-red-500",
          image: deal.image || "",
          gallery: deal.gallery || [],
          name: deal.name,
          price: isNaN(numericPrice) ? 0 : numericPrice,
          original: isNaN(numericOriginal) ? 0 : numericOriginal,
          savings: isNaN(numericSavings) ? 0 : numericSavings,
          year: String(deal.year),
          kms: deal.kms,
          fuel: deal.fuel,
          transmission: deal.transmission,
          brand: deal.brand,
          bodyType: deal.bodyType || "Hatchback",
          owner: deal.owner || "2nd Owner",
          colorName: deal.colorName || "Unknown",
          registrationCity: deal.registrationCity || "Pune",
          insurance: deal.insurance || "Comprehensive",
          description: deal.description || "Well maintained pre-owned car on discount.",
          features: deal.features || [],
          discountPercentage: deal.discountPercentage || 0,
          isDiscount: true,
          createdAt: serverTimestamp()
        };
        await addDoc(carsCol, cleanDeal);
      }
      console.log("Seeding cars completed successfully!");
    } else {
      console.log("Firestore 'cars' collection already has data. Skipping cars seed.");
    }
    
    // 2. Seed Enquiries into 'enquiries' collection
    const enquiriesCol = collection(db, "enquiries");
    const enquiriesSnapshot = await getDocs(enquiriesCol);
    
    if (enquiriesSnapshot.empty) {
      console.log("Firestore 'enquiries' collection is empty. Seeding defaults...");
      
      const defaultEnquiries = [
        {
          name: "Rohan Sharma",
          phone: "+91 98765 43210",
          email: "rohan.sharma@gmail.com",
          message: "Hi, I am interested in purchasing the Maruti Suzuki Swift listed. Please share availability and finance options.",
          type: "buy",
          createdAt: serverTimestamp()
        },
        {
          name: "Priya Patel",
          phone: "+91 99887 76655",
          email: "priya.patel@yahoo.com",
          message: "I want to sell my Hyundai i20 Sportz 2021 model. It has driven around 28,000 km, single owner, no insurance claims.",
          type: "sell",
          createdAt: serverTimestamp()
        },
        {
          name: "Amit Desai",
          phone: "+91 91234 56789",
          email: "amit.desai@outlook.com",
          message: "Would like to book a test drive for the Honda City this coming Saturday morning around 11:00 AM.",
          type: "testdrive",
          createdAt: serverTimestamp()
        }
      ];
      
      for (const enq of defaultEnquiries) {
        await addDoc(enquiriesCol, enq);
      }
      console.log("Seeding enquiries completed successfully!");
    } else {
      console.log("Firestore 'enquiries' collection already has data. Skipping enquiries seed.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};
