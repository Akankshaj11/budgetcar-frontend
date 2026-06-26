import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export const seedDatabaseIfNeeded = async () => {
  try {
    // 1. Seed Cars & Deals into 'cars' collection
    const carsCol = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCol);
    
    if (carsSnapshot.empty) {
      console.log("Firestore 'cars' collection is empty. Skipping default seeding as only admin-added cars should be shown.");
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
