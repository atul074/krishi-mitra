import { useNavigate,useParams } from "react-router-dom";
import { useContext,useEffect } from "react";
import Mycontext from "../context/Mycontext";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
//import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/Cartslice";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from "framer-motion";





const HomePageProductCard = () => {
    
    const navigate=useNavigate();
    const context=useContext(Mycontext);
    const {loading,getAllProduct}=context;
    const MySwal = withReactContent(Swal);
    //getAllProductFunction();
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
       // toast.success("Add to cart")
        MySwal.fire({
            title: 'Added successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          });
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
       
        MySwal.fire({
            title: 'Removed successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          });
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
      
        <div className=" bg-[#2eaf7d] ">
           
   <motion.div
     initial={{ x:1000}}
     whileInView={{x:0 }}
     transition={{ duration: 0.5 }}
    className="relative flex overflow-x-hidden bg-blue-gray-200  font-semibold rounded-sm">
  <div className="py-8 animate-marquee whitespace-nowrap">
    <span className="mx-6 text-4xl">*आसान इंटरफ़ेस</span>
    <span className="mx-6 text-4xl">*उत्पाद जानकारी</span>
    <span className="mx-6 text-4xl">*रेटिंग प्रणाली</span>
    <span className="mx-6 text-4xl">*फ़िल्टर विकल्प</span>
    <span className="mx-6 text-4xl">*भरोसेमंद</span>
  </div>

  <div className="absolute top-0 py-8 animate-marquee2 whitespace-nowrap">
    <span className="mx-6 text-4xl">*आसान इंटरफ़ेस</span>
    <span className="mx-6 text-4xl">*उत्पाद जानकारी</span>
    <span className="mx-6 text-4xl">*रेटिंग प्रणाली</span>
    <span className="mx-6 text-4xl">*फ़िल्टर विकल्प</span>
    <span className="mx-6 text-4xl">*भरोसेमंद</span>
  </div>
</motion.div>
            <br/>
            <br/>
            <div className="bg-blue-gray-200 rounded-3xl mx-4 p-2 ">
                <h1 className=" text-center  text-3xl font-semibold text-white">सर्वोत्तम उत्पाद</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font bg-gray-200 mx-6 mt-6  rounded-xl ">
                <div className="container px- py- mx-auto">
                <div className="flex justify-center">
                        {loading && <Loader />}
                    </div>
                    <div className="flex flex-wrap  ">
                        
                        {getAllProduct.map((item, index) => {
                            const {id,  title ,productImageUrl} = item
                           // console.log(item);
                            return (
                                <motion.div 
                                initial={{ y:200}}
                                whileInView={{ y:0 }}
                                transition={{ duration: 0.5 }}
                                
                                viewport={{  }}
                                    key={index} className="p-4 w-full md:w-1/4">
                                    <div  
                                        className="h-full border bg-[#4cb08a] hover:bg-[#098354] hover:scale-105 duration-300  border-gray-400  rounded-xl overflow-hid shadow-xl shadow-black cursor-pointer">
                                            <img
                                             onClick={()=>navigate(`/Productinfo/${id}`)}
                                                className="lg:h-60  h-70 w-full p-2 rounded-2xl object-cover"
                                                src={productImageUrl}
                                                alt="blog"
                                            />
                                        <div className="p-6">
                                            
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            

                                            <div
                                                className="flex justify-center ">
                                                {cartItems.some((p)=> p.id === item.id) 
                                                
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="bg-[#02353c] hover:bg-white hover:text-[#02353c] w-full text-red-500 py-[4px] rounded-lg font-bold">
                                                सूची से हटाएँ
                                                </button>

                                                : 

                                                <button
                                                    onClick={() => addCart(item)}
                                                    className=" bg-[#02353c] hover:bg-white hover:text-[#02353c] w-full text-white py-[4px] rounded-lg font-bold">
                                                सूची में जोड़े
                                                </button>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;