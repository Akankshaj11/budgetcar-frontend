import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "cars"), where("adminAdded", "==", true));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carsData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore query error in useCars hook:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { cars, loading };
};

export default useCars;