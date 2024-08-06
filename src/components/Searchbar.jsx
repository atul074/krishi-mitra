import { useState ,useContext} from "react";
import { useNavigate } from "react-router";
import Mycontext from "../context/Mycontext";
import { motion } from "framer-motion";
/*const searchData = [
    {
        name: 'PLANT GROWTH REGULATOR',
        image: 'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'BIO STIMULATES',
        image: 'https://images.unsplash.com/photo-1621256257758-276a90549f80?q=80&w=1437&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'FUNGICIDES',
        image: 'https://abanahomes.com/wp-content/uploads/2023/07/fungicide-for-bonsai.jpg'
    },
    {
        name: 'SPREADER & ACTIVATOR',
        image: 'https://images.pexels.com/photos/20796144/pexels-photo-20796144/free-photo-of-farmer-spraying-herbicides-on-green-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'INSECTICIDES/ACARICIDE/MITICIDES',
        image: 'https://images.pexels.com/photos/20706708/pexels-photo-20706708/free-photo-of-close-up-of-a-weevil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'FERTILIZER / SOIL NUTRITION',
        image: 'https://images.unsplash.com/photo-1587884934488-2c4044f0596c?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'PLANT NUTRITION',
        image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D'
    },
    {
        name: 'GROWTH NUTRIENT',
        image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'BIOPESTICIDES',
        image: 'https://media.istockphoto.com/id/1195698889/photo/farmer-is-spraying-weed-medicine-in-their-wheat-fields.jpg?b=1&s=612x612&w=0&k=20&c=bNJNkG7O3JeJX4OvUjGokylmtdGOBKhBx8UUAXe4AAM='
    },
    {
        name: 'AGI EQUIPMENTS/TOOLS',
        image: 'https://images.pexels.com/photos/2253412/pexels-photo-2253412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'HERBECIDES',
        image: 'https://images.unsplash.com/photo-1561407958-54aa9fa49a21?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'RODENTICIDE',
        image: 'https://images.pexels.com/photos/7180053/pexels-photo-7180053.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name: 'PLANT CARE',
        image: 'https://images.unsplash.com/photo-1562957429-ff708ca20e95?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'SEEDS ',
        image: 'https://images.pexels.com/photos/3040873/pexels-photo-3040873.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name: 'GARDENING',
        image: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58148?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ]
    */
export default function Searchbar()
{
    const context = useContext( Mycontext);
    const { getAllProduct } = context
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
   // Filter Search Data
   const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8)

  return (
    <div className="">
    {/* search input  */}
    <div className="input ">
        <input
            type="text"
            placeholder='Search here'
            onChange={(e) => setSearch(e.target.value)}
            className=' bg-gray-300 placeholder-gray-500 rounded-2xl px-2 py-2 w-90 lg:w-96 md:w-96 outline-none text-black '
        />
    </div>
    {/* search drop-down  */}
    <div className=" flex justify-center">
        {search && <div className="block absolute bg-gray-300 bg-opacity-90  w-96 md:w-96 lg:w-96 z-50 my-1 rounded-xl px-2 py-2  shadow-2xl shadow-[#02353c]">
            {filterSearchData.length > 0 ?
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <motion.div 
                            initial={{ y:50}}
                                whileInView={{ y:0 }}
                                transition={{ duration: 0.5 }}
                            key={index} className="py-2 px-2 hover:shadow-xl hover:bg-gray-50 rounded-lg "
                            onClick={() => navigate(`/productinfo/${item.id}`)}>
                                <div className="flex items-center gap-2">
                                    <img className="w-10" src={item.productImageUrl} alt="" />
                                    {item.title}
                                </div>
                            </motion.div>
                        )
                    })}
                </>
                :

                <>
                    <div className="flex justify-center">
                        <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                    </div>
                </>}
        </div>
        }
    </div>
</div>
  );
}