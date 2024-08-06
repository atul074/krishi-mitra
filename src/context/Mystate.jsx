import Mycontext from './Mycontext';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/Firebaseconf';
import toast from 'react-hot-toast';

function Mystate({children}) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
              //  console.log("hii");
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
  //  const name = "atul"
  useEffect(() => {
    getAllProductFunction();
    
}, []);
  return (
    <Mycontext.Provider value={
        {
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            
        }}>
       {children}
    </Mycontext.Provider>
  )
}

export default Mystate