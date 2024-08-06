// src/components/ProductRating.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc ,updateDoc,addDoc,collection,setDoc} from 'firebase/firestore';
import { fireDB } from '../firebase/Firebaseconf'; 

// ProductRating.js


import { FaStar } from 'react-icons/fa';

const ProductRating = ({ productId }) => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const[rateflag,setrateflag]=useState(false);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const docRef = doc(fireDB, "rate", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setRatings(data.ratings || []);
      } else {
        await setDoc(docRef, { ratings: [] });
      }
    };

    fetchRatings();
  }, [productId]);

  useEffect(() => {
    if (ratings.length > 0) {
      const total = ratings.reduce((acc, rating) => acc + rating, 0);
      setAverageRating(total / ratings.length);
      setRatingCount(ratings.length);
    }
  }, [ratings]);

  const handleRating = async (rating) => {
    const newRatings = [...ratings, rating];
    setRatings(newRatings);
    setUserRating(rating);
    setrateflag(true);

    const docRef = doc(fireDB, "rate", productId);
    await updateDoc(docRef, { ratings: newRatings });
  };

  return (
    <div>
      <div className="flex flex-row">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            size={24}
            color={
              index < (hoverRating || userRating || averageRating) ? "gold" : "grey"
            }
            onClick={() => !rateflag&& handleRating(index + 1)}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      <p>औसत रेटिंग {averageRating.toFixed(1)}</p>
      <p>रेटिंग की संख्या: {ratingCount}</p>
    </div>
  );
};

export default ProductRating;
