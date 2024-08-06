import Layout from "../components/Layout";
import { useNavigate } from "react-router";
import { useContext ,useEffect} from "react";
import Mycontext from "../context/Mycontext";
import { useDispatch, useSelector } from "react-redux";
//import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from "../components/Loader";
import { addToCart, deleteFromCart } from "../redux/Cartslice";
import { motion } from "framer-motion";
const productData = [
    {
        id: 1,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/ehYSX7Tl-400-400.webp',
        title: 'Applomax (Krushi Bio Chemicals) 250 ML',
        desc: 'Applomax is a bio stimulant to be used in apple to improve the fruit size through elongation of the fruit and development of more prominent calyx lobes. It also increases weight of individual fruit and yield per tree. It increases fruit size at harvest, thus improving total yield and financial return. Maximizes fruit shape and quality to meet consumer demand. Delivers consistent, proven field performance. Provide us excellent return on investment',
        trendingProductName: 'Featured',
       
    },
    {
        id: 2,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/2aq3d8cM.webp',
        title: 'ProGibb Gibberellic Acid i.e : 90% w/w (Vlent & Sumitomo Chemicals India Ltd) 25 GRM',
        desc: 'ProGibb, also known as Berelex™ Plant Growth Regulator, Activol™ Plant Growth Regulator and GroCel™ Plant Growth Regulator in some regions, is a gibberellic acid (GA3) plant growth regulator product naturally found in plant species. It is a highly effective growth promoter that increases size and quality of fruits, vegetables, and other crops, essential for optimum growth and development. GA3 is used in many crops to improve crop yield, quality, and value.',
        trendingProductName: 'Featured',
       
    },
    {
        id: 3,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/01cvDSCr-400-400.webp',
        title: 'Miraculan - Dow AgroSciences (Plant Growth Regulator) 1 LTR',
        desc: 'Miraculan is based on triacontanol, which is a long chain aliphatic alcoholMiraculan is registered as a plant growth regulator, used for increasing the yields of cotton, potato, chili, tomato, rice and ground. Triacontanol present in Miraculan, in physiological terms, is a plant growth regulator that shows its effects by influencing mineral uptake, increased permeability of water, enhances the activity of naturally available enzymes and plant hormones, increasing the rate of photosynthesis and enhancing the synthesis of proteins',
        trendingProductName: 'Featured',
       
    },
    {
        id: 1,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/Kq4MrZPD.webp',
        title: 'Ethrel (Ethephon 39 SL (39% w/w) 1 LTR',
        desc: 'Ethrel is plant growth regulator with systemic properties. It penetrates into the plant tissues, and is translocated and progressively decomposed to ethylene, which positively affects the growth process.',
        trendingProductName: 'Featured',
       
    },
    {
        id: 1,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/Gsx98Pnz-400-400.webp',
        title: 'Planofix (Alpha Naphthyl Acetic Acid (4.5% w/w) 500 ML',
        desc: 'Planofix Alpha Growth Promoter is an aqueous solution containing 4.5% (w/w) of Alpha napthyl acetic acid active ingredient. It is a plant growth regulator used for the purpose of inducing flowering, preventing shedding of flower buds and unripe fruits. It helps in enlarging fruit size, increasing and improving the quality and yield of fruits.',
        trendingProductName: 'Featured',
       
    },
    {
        id: 1,
        image: 'https://cdn.dotpe.in/longtail/item_thumbnails/8009603/QTMLijFj-400-400.webp',
        title: 'Planofix (Alpha Naphthyl Acetic Acid (4.5% w/w) 100 ML',
        desc: 'Planofix Alpha Growth Promoter is an aqueous solution containing 4.5% (w/w) of Alpha napthyl acetic acid active ingredient. It is a plant growth regulator used for the purpose of inducing flowering, preventing shedding of flower buds and unripe fruits. It helps in enlarging fruit size, increasing and improving the quality and yield of fruits.',
        trendingProductName: 'Featured',
       
    },
   
]

const Explore=()=>{
    const MySwal = withReactContent(Swal);
            const navigate = useNavigate();
            const context = useContext(Mycontext);
    //const {getAllProduct,getAllProductFunction} = context;
    //getAllProductFunction();
    const {loading,getAllProduct} = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
      //  toast.success("Add to cart")
        MySwal.fire({
            title: 'Added successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          });

    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
      //  toast.success("Delete cart")
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
            <div className="p-2 mx-4 bg-gray-200 rounded-3xl">
                <h1 className=" text-center text-2xl font-semibold text-black ">
                सभी उत्पाद</h1>
            </div>
            {/* main  */}
            <section className="text-gray-600 body-font bg-gray-200 mx-6 mt-6 rounded-xl">
                <div className="container px-10 lg:px-0 py-5 mx-auto ">
                <div className="flex justify-center">
                            {loading && <Loader/>}
                        </div>
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct.map((item, index) => {
                            const { id, title,productImageUrl} = item
                            console.log(item);
                            return (
                                <motion.div
                                initial={{ y:200}}
                                whileInView={{ y:0 }}
                                transition={{ duration: 0.5 }}
                                key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border bg-[#4cb08a] hover:bg-[#098354] hover:scale-105 duration-300   border-gray-400 rounded-xl overflow-hidden shadow-xl shadow-black cursor-pointer">
                                        <img
                                        onClick={()=> navigate(`/productinfo/${id}`)}
                                            className="lg:h-60  h-70 w-full object-cover"
                                            src={productImageUrl}
                                            alt="blog"
                                        />
                                        <div className="p-6">
                                            
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 28)}
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
                    </div>
                </div>
            </section>
        </div>
        </Layout>
    );
}
export default Explore;