import { useParams,useNavigate } from "react-router";
import Layout from "../components/Layout";
import { useContext ,useEffect} from "react";
import Mycontext from "../context/Mycontext";
import Loader from "../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/Cartslice";
//import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from "framer-motion";

const Categorypage = () => {
    const {categoryname} = useParams();
    const context = useContext(Mycontext);
    const { getAllProduct, loading } = context;
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    // filter product 
    const filterProduct = getAllProduct.filter((obj)=> obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        //toast.success("Add to cart")
        
MySwal.fire({
    title: 'Added successfully',
    icon: 'success',
    confirmButtonText: 'ok'
  });

    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
       // toast.success("Delete cart")
       
MySwal.fire({
    title: 'Removed successfully',
    icon: 'success',
    confirmButtonText: 'ok'
  });

    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <Layout>
            <div className=" bg-[#2eaf7d]">
                {/* Heading  */}
                <br/>
                <div className="p-2 mx-4 bg-blue-gray-200 rounded-3xl">
                    <h1 className=" text-center mb- text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>
                {loading ?

                    <div className="flex justify-center">
                        <Loader />
                    </div>

                    :

                    <section className="text-gray-600 body-font bg-gray-200 mx-6 mt-6 rounded-xl">
                    
                        <div className="container px-5 py-5 mx-auto">
                            {/* main 3  */}
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ?
                                    <>
                                        {filterProduct.map((item, index) => {
                                            const { id, title,  productImageUrl } = item;
                                            return (
                                                <motion.div
                                                initial={{ y:200}}
                                                whileInView={{ y:0 }}
                                                transition={{ duration: 0.5 }}
                                                key={index} className="p-4 w-full md:w-1/4">
                                                    <div className="h-full border bg-[#4cb08a] hover:bg-[#098354] hover:scale-105 duration-300  border-gray-400 rounded-xl overflow-hidden shadow-xl shadow-black cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-60  h-70 w-full object-cover"
                                                            src={productImageUrl}
                                                            alt="img"
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
                                                    className=" bg-[#02353c] hover:bg-white hover:text-[#02353c] w-full text-red-500 py-[4px] rounded-lg font-bold">
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
                                    </>

                                    :

                                    <div>
                                        <div className="flex justify-center">
                                            <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>

                }
            </div>
        </Layout>
    );
}

export default Categorypage;