
import { Link,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Mycontext from "../context/Mycontext";
//import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../firebase/Firebaseconf.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";

const Signup = () => {
    const context = useContext(Mycontext);
    const {loading, setLoading } = context;
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        status:false
    });
    const SignupFun = async () => {
         
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
          
            MySwal.fire({
                title: 'All Fields are required',
              //  text: 'This is a SweetAlert2 alert in React',
                icon: 'error',
                confirmButtonText: 'ok'
              });
    
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
            console.log(users);
            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                status:true,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            
            MySwal.fire({
                title: 'Signup Successfully',
              //  text: 'This is a SweetAlert2 alert in React',
                icon: 'success',
                confirmButtonText: 'ok'
              });
    

            setLoading(false);
              navigate('/login')
           
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    return (
        <div className='flex justify-center items-center  h-screen bg-[#C1F6ED]'>
           {loading && <Loader/>}
            <div className="login_Form bg-[#7ccda2] px-1 lg:px-8 py-6  border border-[#182628] rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#182628] '>
                        
                    साइन अप
                    </h2>
                </div>

             
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='पूरा नाम'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className='bg-[#C1F6ED] border border-[#3B945E] px-2 py-2 w-96 rounded-md outline-none placeholder-[#3B945E]'
                    />
                </div>

                
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='ई-मेल एड्रेस'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className='bg-[#C1F6ED] border border-[#3B945E] px-2 py-2 w-96 rounded-md outline-none placeholder-[#3B945E]'
                    />
                </div>

              
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='पासवर्ड'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className='bg-[#C1F6ED] border border-[#3B945E] px-2 py-2 w-96 rounded-md outline-none placeholder-[#3B945E]'
                    />
                </div>

               
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={SignupFun}
                        className='bg-[#039b17] hover:bg-[#3B945E] w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        
साइन अप 
                    </button>
                </div>

                <div>
                    <h2 className='text-[#4f4f4f]'>खाता है <Link className=' text-[#000000] font-bold' to={'/login'}>
                    लॉग इन</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;