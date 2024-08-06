import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import Mycontext from "../context/Mycontext";
import { useParams } from "react-router";
import { fireDB } from "../firebase/Firebaseconf";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/Cartslice";
//import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
import React from "react";
import ReactStars from 'react-stars'
import ProductRating from "../components/ProductRating";

const Productinfo = () => {
  const context = useContext(Mycontext);
  const MySwal = withReactContent(Swal);
  //  const navigate = useNavigate();
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");

  const { id } = useParams();
  const productId = id;
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    // toast.success("Add to cart")

    MySwal.fire({
      title: "Added to cart",
      icon: "success",
      confirmButtonText: "ok",
    });
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    // toast.success("Delete cart")

    MySwal.fire({
      title: "Removed successfully",
      icon: "success",
      confirmButtonText: "ok",
    });
  };

  // console.log(cartItems)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);
  //rating
  



  return (
    <Layout>
      <section className="py-5  bg-[#2eaf7d]">
        {loading ? (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl px- mx-auto bg-gray-300 border-none rounded-2xl">
              <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  
                      <img
                        className=" w-full lg:h-[30em] rounded-2xl"
                        src={product?.productImageUrl}
                        alt=""
                      />
                   
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="pl-0 flex flex-col ml-3">
                    <div className="mb-6 ">
                      <h2 className="max-w-xl my-8 text-2xl font-semibold leading-loose tracking-wide font-serif  md:text-3xl dark:text-gray-300">
                        {product?.title}
                      </h2>
                      <div className="flex flex-wrap items-center mb-6">
                      <ProductRating productId={productId} />
                      
                      </div>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-300 dark:text-gray-400">
                        
                          विवरण:
                      </h2>
                      <p>{product?.description}</p>
                    </div>
                    <div className="mb-6 " />
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.some((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deleteCart(product)}
                          className="w-full px-4  py-3 mr-6 text-center font-semibold bg-[#02353c] hover:bg-white hover:text-[#02353c]  text-red-500  rounded-xl"
                        >
                          {" "}
                          सूची से हटाएँ
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(product)}
                          className="w-full px-4 py-3 mr-6 text-center font-semibold bg-[#02353c] hover:bg-white hover:text-[#02353c]  text-white  rounded-xl border"
                        >
                          {" "}
                          सूची में जोड़े
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Productinfo;
