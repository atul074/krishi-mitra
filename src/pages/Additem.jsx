import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import Mycontext from "../context/Mycontext";
//import toast from "react-hot-toast";
import { fireDB ,app} from "../firebase/Firebaseconf";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import { getDownloadURL ,getStorage,ref,uploadBytes} from "firebase/storage";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Layout from "../components/Layout";
import { motion } from "framer-motion";
const categoryList = [
    {
        name: 'PLANT GROWTH REGULATOR'
       // image: 'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'BIO STIMULATES'
       // image: 'https://images.unsplash.com/photo-1621256257758-276a90549f80?q=80&w=1437&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'FUNGICIDES'
       // image: 'https://abanahomes.com/wp-content/uploads/2023/07/fungicide-for-bonsai.jpg'
    },
    {
        name: 'SPREADER & ACTIVATOR'
        //image: 'https://images.pexels.com/photos/20796144/pexels-photo-20796144/free-photo-of-farmer-spraying-herbicides-on-green-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'INSECTICIDES'
       // image: 'https://images.pexels.com/photos/20706708/pexels-photo-20706708/free-photo-of-close-up-of-a-weevil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'FERTILIZER'
      //  image: 'https://media.istockphoto.com/id/1195698889/photo/farmer-is-spraying-weed-medicine-in-their-wheat-fields.jpg?b=1&s=612x612&w=0&k=20&c=bNJNkG7O3JeJX4OvUjGokylmtdGOBKhBx8UUAXe4AAM='
    },
    {
        name: 'PLANT NUTRITION'
       // image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D'
    },
    {
        name: 'GROWTH NUTRIENT'
       // image: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'BIOPESTICIDES'
       // image: 'https://media.istockphoto.com/id/1195698889/photo/farmer-is-spraying-weed-medicine-in-their-wheat-fields.jpg?b=1&s=612x612&w=0&k=20&c=bNJNkG7O3JeJX4OvUjGokylmtdGOBKhBx8UUAXe4AAM='
    },
    {
        name: 'AGI EQUIPMENTS'
      
    },
    {
        name: 'HERBECIDES'
        
    },
    {
        name: 'RODENTICIDE'
    },
    {
        name: 'PLANT CARE'
       
    },
    {
        name: 'SEEDS '
       
    },
    {
        name: 'GARDENING'
       
    }
]

const Additem = () => {
    const context = useContext(Mycontext);
    const { loading, setLoading } = context;
    const [image,setImage] = useState(undefined);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if(image){
            handleimg(image);
        }
    }, [image])
    // navigate 
    const navigate = useNavigate();

    // product state
    const [product, setProduct] = useState({
        title: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


    // Add Product Function
    const addProductFunction = async () => {
        if (product.title == ""  || product.productImageUrl == "" || product.category == "" || product.description == "") {
            return   MySwal.fire({
                title: 'all fields are required',
                icon: 'error',
                confirmButtonText: 'ok'
              });
    
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
           
            MySwal.fire({
                title: 'product Added successfully',
                icon: 'success',
                confirmButtonText: 'ok'
              });
    
            navigate('/')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
           
            MySwal.fire({
                title: 'Add product failed',
                icon: 'error',
                confirmButtonText: 'ok'
              });
    
        }

    }
    const handleimg = async(image) => {
            try{
                const storage=getStorage(app);
                const storageref=ref(storage,"image/"+image.name);
                await uploadBytes(storageref,image);
                const url=await getDownloadURL(storageref);
                console.log(url);
                setProduct({
                    ...product,
                    productImageUrl: url
                })
            } catch (error){ console.log(error);

            }
           
        
    }
    return (
        <Layout>
            <div className='flex justify-center items-center h-screen bg-gray-200'>
                {loading && <Loader />}
                {/* Login Form  */}
                <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                className=" bg-[#52b587] px-8 py-6 border border-[#7a7f7f] rounded-xl shadow-2xl shadow-black">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-black '>
                        उत्पाद जोड़ें
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-gray-200 border text-gray-900 border-[#182628] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-700'
                        />
                    </div>

                    

                    {/* Input Two  setProduct({
                                    ...product,
                                    productImageUrl: 
                                }) */}
                    <div className="mb-3">
                        <input
                            type="file"
                            name="productImage"
                           // value={product.productImageUrl}
                            onChange={(e) => { setImage(e.target.files[0])
                               
                            }}
                            placeholder='Product Image '
                            className='bg-gray-200 border text-gray-900 border-[#182628] px-2 py-2 w-96 rounded-md outline-none placeholder-gray-700'
                        />
                    </div>

                    {/* Input three */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-gray-900 bg-gray-200 border border-[#182628] rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase bg-gray-300" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-gray-900 bg-gray-200 border border-[#182628] rounded-md outline-none placeholder-gray-700 ">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-[#02353c] hover:bg-white w-full text-white hover:text-[#02353c] text-center py-2 font-extrabold rounded-md '
                        >
                            उत्पाद जोड़ें
                        </button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}

export default Additem;