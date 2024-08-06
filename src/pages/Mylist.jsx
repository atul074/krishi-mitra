import Layout from "../components/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { deleteFromCart } from "../redux/Cartslice.jsx";
//import {toast} from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
//import { withSwal } from "react-sweetalert2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";
const products = [
  {
    id: 1,
    imageSrc:
      "https://cdn.dotpe.in/longtail/item_thumbnails/8009603/ehYSX7Tl-400-400.webp",
    name: "Applomax (Krushi Bio Chemicals) 250 ML",
    desc: "Applomax is a bio stimulant to be used in apple to improve the fruit size through elongation of the fruit and development of more prominent calyx lobes. It also increases weight of individual fruit and yield per tree. It increases fruit size at harvest, thus improving total yield and financial return. Maximizes fruit shape and quality to meet consumer demand. Delivers consistent, proven field performance. Provide us excellent return on investment",
    trendingProductName: "Featured",
  },
  {
    id: 2,
    imageSrc:
      "https://cdn.dotpe.in/longtail/item_thumbnails/8009603/2aq3d8cM.webp",
    name: "ProGibb Gibberellic Acid i.e : 90% w/w (Vlent & Sumitomo Chemicals India Ltd) 25 GRM",
    desc: "ProGibb, also known as Berelex™ Plant Growth Regulator, Activol™ Plant Growth Regulator and GroCel™ Plant Growth Regulator in some regions, is a gibberellic acid (GA3) plant growth regulator product naturally found in plant species. It is a highly effective growth promoter that increases size and quality of fruits, vegetables, and other crops, essential for optimum growth and development. GA3 is used in many crops to improve crop yield, quality, and value.",
    trendingProductName: "Featured",
  },
  {
    id: 3,
    imageSrc:
      "https://cdn.dotpe.in/longtail/item_thumbnails/8009603/01cvDSCr-400-400.webp",
    name: "Miraculan - Dow AgroSciences (Plant Growth Regulator) 1 LTR",
    desc: "Miraculan is based on triacontanol, which is a long chain aliphatic alcoholMiraculan is registered as a plant growth regulator, used for increasing the yields of cotton, potato, chili, tomato, rice and ground. Triacontanol present in Miraculan, in physiological terms, is a plant growth regulator that shows its effects by influencing mineral uptake, increased permeability of water, enhances the activity of naturally available enzymes and plant hormones, increasing the rate of photosynthesis and enhancing the synthesis of proteins",
    trendingProductName: "Featured",
  },
];
const Mylist = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    //toast.success('Item Deleted ');
    MySwal.fire({
      title: "Removed successfully",
      //  text: 'This is a SweetAlert2 alert in React',
      icon: "success",
      confirmButtonText: "ok",
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="  py-8 bg-[#2eaf7d]  ">
        <h1 className="text-xl font-bold text-center text-gray-900 sm:text-2xl p-2 mx-4 bg-blue-gray-200 rounded-3xl">
          मेरी सूची
        </h1>
        <form className="mt-12 px-10">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-[#2eaf7d] "
          >
            <h2 id="cart-heading" className="sr-only">
              {" "}
              Items in your List
            </h2>
            <ul role="list" className=" bg-gray-200 p-10 rounded-xl">
              {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {cartItems.map((item, index) =>{
                    const { id, title, productImageUrl, category } = item;
                    return (
                        <motion.div initial={{ y: 200 }}
                                               whileInView={{ y: 0 }}
                                              transition={{ duration: 0.5 }}
                        key={index} className="rounded overflow-hidden shadow-lg">
        
                    
                            <div className="relative">
                                {/* image */}
                                <div>
                                    <img 
                                   
                                className="sm:h-45 sm:w-45 h-25 w-25 rounded-md object-fill object-center"
                                src={productImageUrl}
                                alt="product img"
                                    />
                                    <div   onClick={() => navigate(`/productinfo/${id}`)}
                                     className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                    </div>
                                </div>
                        
                                {/* delete */}
                                <button 
                               
                                onClick={() => deleteCart(item)}
                                type="button"
                                >
                                    <div
                                    className="text-sm absolute top-0 right-0 bg-tranp px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                            <Trash size={20} className="text-red-500" />
                                            <small>हटाएँ</small>
                                    </div>
                                </button>
                            </div>
                            {/* text detail */}
                            <div className="px-6 py-4">
        
                                <p className="font-semibold text-lg inline-block hover:text-blue-gray-800 transition duration-500 ease-in-out">Best
                                    {title}</p>
                                <p className="text-gray-700 text-sm">
                                    {category}
                                </p>
                            </div>
                   
                        </motion.div>    
                    );
                })
        
                }
                
               
                
            </div>
              ) : (
                <h1>Not Found</h1>
              )}
            </ul>
          </section>
        </form>
      </div>
    </Layout>
  );
};
export default Mylist;


// <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
//     <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
//         {cartItems.map((item, index) =>{
//             const { id, title, productImageUrl, category } = item;
//             return (
//                 <div key={index} className="rounded overflow-hidden shadow-lg">

            
//                     <div className="relative">
//                         {/* image */}
//                         <div>
//                             <img 
//                                 onClick={() => navigate(`/productinfo/${id}`)}
//                         className="w-full"
//                         src={productImageUrl}
//                         alt="product img"
//                             />
//                             <div
//                              className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
//                             </div>
//                         </div>
                
//                         {/* delete */}
//                         <button 
//                         onClick={() => deleteCart(item)}
//                         type="button"
//                         >
//                             <div
//                             className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
//                                     <Trash size={15} className="text-red-500" />
//                                     <small>remove</small>
//                             </div>
//                         </button>
//                     </div>
//                     {/* text detail */}
//                     <div className="px-6 py-4">

//                         <p className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">Best
//                             {title}</p>
//                         <p className="text-gray-500 text-sm">
//                             {category}
//                         </p>
//                     </div>
           
//                 </div>    
//             );
//         })

//         }
        
       
        
//     </div>
// </div>


// if true
// <div className="flex flex-col gap-10">
//                   {cartItems.map((item, index) => {
//                     const { id, title, productImageUrl, category } = item;
//                     return (
//                       <motion.div
//                         initial={{ y: 100 }}
//                         whileInView={{ y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         key={index}
//                         className="bg-[#5bb193] hover:shadow-xl hover:shadow-gray-600 duration-200 rounded-xl"
//                       >
//                         <li className="flex py-3 sm:px-8 px-4 border-none   ">
//                           <div className="">
//                             <img
//                               onClick={() => navigate(`/productinfo/${id}`)}
//                               src={productImageUrl}
//                               alt="img"
//                               className="sm:h-40 sm:w-40 h-24 w-24 rounded-md object-contain object-center"
//                             />
//                           </div>
//                           <div className="flex flex-col justify-between ml-10 sm:ml-20">
//                             <div className="">
//                               <h3 className="text-lg">
//                                 <div className="font-semibold uppercase text-black">
//                                   {title}
//                                 </div>
//                               </h3>
//                             </div>
//                             <div className="  text-sm">
//                               <p className=" text-white">{category}</p>
//                             </div>
//                             <div className="mb-2">
//                               <div className="ml-3 flex text-sm">
//                                 <button
//                                   onClick={() => deleteCart(item)}
//                                   type="button"
//                                   className="flex items-center space-x-1 px-2 py-1 pl-0 hover:scale-110 duration-300"
//                                 >
//                                   <Trash size={15} className="text-red-500" />
//                                   <span className="text-base font-medium text-red-500">
//                                     Remove
//                                   </span>
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                       </motion.div>
//                     );
//                   })}
//                 </div>