// category 
import { useNavigate } from "react-router-dom";
import { useRef,useState,useEffect } from "react";
import { motion } from "framer-motion";
const category = [
    {
        name: 'PLANT GROWTH REGULATOR',
        image: 'https://cdn-icons-png.flaticon.com/128/2988/2988557.png'
    },
    {
        name: 'BIO STIMULATES',
        image: 'https://cdn-icons-png.flaticon.com/128/4284/4284772.png'
    },
    {
        name: 'FUNGICIDES',
        image: 'https://cdn-icons-png.flaticon.com/128/9972/9972408.png'
    },
    {
        name: 'SPREADER & ACTIVATOR',
        image: 'https://cdn-icons-png.flaticon.com/128/5863/5863526.png'
    },
    {
        name: 'INSECTICIDES/ACARICIDE/MITICIDES',
        image: 'https://cdn-icons-png.flaticon.com/128/5093/5093656.png'
    },
    {
        name: 'FERTILIZER / SOIL NUTRITION',
        image: 'https://cdn-icons-png.flaticon.com/128/4849/4849540.png'
    },
    {
        name: 'PLANT NUTRITION',
        image: 'https://cdn-icons-png.flaticon.com/128/10490/10490230.png'
    },
    {
        name: 'GROWTH NUTRIENT',
        image: 'https://cdn-icons-png.flaticon.com/128/12615/12615233.png'
    },
    {
        name: 'BIOPESTICIDES',
        image: 'https://cdn-icons-png.flaticon.com/128/3402/3402109.png'
    },
    {
        name: 'AGI EQUIPMENTS/TOOLS',
        image: 'https://cdn-icons-png.flaticon.com/128/2592/2592037.png'
    },
    {
        name: 'HERBECIDES',
        image: 'https://cdn-icons-png.flaticon.com/128/4284/4284949.png'
    },
    {
        name: 'RODENTICIDE',
        image: 'https://cdn-icons-png.flaticon.com/128/14236/14236429.png'
    },
    {
        name: 'PLANT CARE',
        image: 'https://cdn-icons-png.flaticon.com/128/3968/3968246.png'
    },
    {
        name: 'SEEDS ',
        image: 'https://cdn-icons-png.flaticon.com/128/2227/2227504.png'
    },
    {
        name: 'GARDENING',
        image: 'https://cdn-icons-png.flaticon.com/128/4284/4284795.png'
    },
]

const Category = () => {
    const navigate=useNavigate();
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (containerRef.current && isVisible) {
          containerRef.current.scrollLeft =
            window.scrollY % containerRef.current.scrollWidth;
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isVisible]);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
  
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);
    return(
       
            <div className="  bg-blue-gray-100 pt-12 pb-1">
                
                <div 
                   ref={containerRef}
                   className="flex overflow-x-scroll   ">
                    
                   
                        {/* category  */}
                        {category.map((item, index) => {
                            return(
                                <div key={index} 
                                    
                                    className="px-1 lg:px-2 shadow-xl shadow-black">
                                    {/* Image  */}
                                    <motion.div  onClick={() => navigate(`/category/${item.name}`)}
                                     
                                      whileTap={{ scale: 0.9 }}
                                      className="  lg:w-24 lg:h-24  min-w-[120px] min-h-[180px] bg-[#4cb08a]  duration-300 rounded-lg shadow-md  my-3 p-3 text-center hover:bg-[#098354] hover:scale-110   transition-all  cursor-pointer mb-1 " >
                                        <div className=" mb-1 ">
                                            
                                            <img src={item.image} alt="img" className="rounded-full object-cover "/>
                                        </div>
                                        <h5 className=' text-base lg:text-base text-center  title-font first-letter:uppercase '>{item.name.substring(0,10)}..</h5>
                                    </motion.div>

                                    {/* Name Text  */}
                                    
                                </div>
                            )
                        })}
                   
                </div>
            </div>
          
        
    );
}

export default Category;