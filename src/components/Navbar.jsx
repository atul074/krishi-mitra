import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faPhone, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Navbar()
{
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    const cartItems = useSelector((state) => state.cart);

    const navList = (
        <>
        <ul className="text-black   cursor-pointer transition-all duration-400 relative group font-semibold text-base px-3 flex md:gap-3 lg:gap-8 sm: gap-5">
            {/* Home */}
            <li className="">
                <Link to={'/'}>
                            मुख्य पृष्ठ</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/explore'}>सभी उत्पाद
                </Link>
            </li>
            <li>
                <Link to={'/list'}> सूची ({cartItems.length})</Link>
            </li>
            {user ? <li>
                <Link to={'/additem'}> उत्पाद जोड़ें</Link>
            </li> : ""}
             {/* Signup */}
             {!user ? <li>
                <Link to={'/signup'}>साइन अप </Link>
            </li> : ""}
            {/* Signin */}
            {!user ? <li>
                <Link to={'/login'}>लॉग इन</Link>
            </li> : ""}
           
        </ul>
        {user && <div className=" text-black    cursor-pointer transition-all duration-400  font-semibold text-md px-3" onClick={logout}>
        लॉग आउट
        </div>}
        </> 
    )
    // bg-gradient-to-r from-[#2eaf7d] from-10% via-[#65CCB8] via-40% to-[#2eaf7d]  to-90% ...
    return (
        <nav className="z-50 sticky top-0 bg-gradient-to-r from-[#2eaf7d] from-10% via-[#65CCB8] via-40% to-[#2eaf7d]  to-90% ...  ">
            
            <div className="flex lg:flex-row lg:justify-between flex-col items-center py-3 lg:px-3 ">
                {/* website ka bda sa naam  */}
                <div className="  lg:py-0 ">
                    <Link Link to={'/'} className="flex items-center ">
                        <img src="https://svgsilh.com/svg/576549.svg"  className="w-15 h-10 "/>
                        <h2 className=" font-bold text-white text-2xl text-center">कृषि मित्र</h2>
                    </Link>
                </div>

                {/* functionality  */}
                <div className="z-50 flex mb-4 lg:mt-2 ">
                    {navList}
                </div>

                {/* Search Bar  */}
                <Searchbar />
            </div>
        </nav>
    );
    
}






