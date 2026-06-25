import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const enquiriesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Fallback date format logic for existing/seeded documents
          let displayDate = "";
          if (data.createdAt && typeof data.createdAt.toDate === "function") {
            displayDate = data.createdAt.toDate().toLocaleString("en-IN");
          } else if (data.date) {
            displayDate = data.date;
          } else {
            displayDate = new Date().toLocaleString("en-IN");
          }

          return {
            id: doc.id,
            ...data,
            date: displayDate
          };
        });

        setEnquiries(enquiriesData);
        setLoading(false);
      },
      (error) => {
        console.error("useEnquiries snapshot error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { enquiries, loading };
};

export default useEnquiries;
