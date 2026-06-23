import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export function useData() {
  const [bids, setBids] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch bids from Firebase
        const bidsSnapshot = await getDocs(collection(db, 'bids'));
        const bidsData = bidsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        setBids(bidsData);
        
        // Fetch tenders from Firebase (if collection exists)
        try {
          const tendersSnapshot = await getDocs(collection(db, 'tenders'));
          const tendersData = tendersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTenders(tendersData);
        } catch (tenderError) {
          // Tenders collection might not exist, that's okay
          console.log('Tenders collection not found:', tenderError);
          setTenders([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refresh = () => {
    loadData();
  };

  return {
    bids,
    tenders,
    loading,
    error,
    refresh
  };
}

export default useData;
