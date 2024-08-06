import { useContext, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Mycontext from "../context/Mycontext";
//import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../firebase/Firebaseconf";
import Loader from "../components/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = () => {
    const context = useContext(Mycontext);
    const { loading, setLoading } = context;
    const MySwal = withReactContent(Swal);
    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const LoginFun = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            MySwal.fire({
                title: 'All Feild are Required',
                icon: 'warning',
                confirmButtonText: 'ok'
              });
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    MySwal.fire({
                        title: 'Login successfull',
                        icon: 'success',
                        confirmButtonText: 'ok'
                      });
                    setLoading(false);
                   
                    navigate('/');
                    
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
                MySwal.fire({
                    title: 'Incorrect password',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                  });
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
            MySwal.fire({
                title: 'Login Failed',
                icon: 'error',
                confirmButtonText: 'ok'
              });
        }
    }


    return (
        <div>
        <div className='flex justify-center items-center h-screen  bg-[#C1F6ED]'>
             
            <div className="login_Form  bg-[#7ccda2] px-1 lg:px-8 py-6 border border-[#182628] rounded-xl shadow-md">

              
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#182628] '>
                        
लॉग इन
                    </h2>
                </div>

             
                <div className="mb-3">
                    <input
                       type="email"
                       name="email"
                       placeholder='ई-मेल एड्रेस'
                       value={userLogin.email}
                       onChange={(e) => {
                           setUserLogin({
                               ...userLogin,
                               email: e.target.value
                           })
                       }}
                        className='bg-[#C1F6ED] border border-[#3B945E] px-2 py-2 w-96 rounded-md outline-none placeholder-[#3B945E]'
                    />
                </div>

                
                <div className="mb-5">
                    <input
                         type="password"
                         placeholder='
पासवर्ड'
                         value={userLogin.password}
                         onChange={(e) => {
                             setUserLogin({
                                 ...userLogin,
                                 password: e.target.value
                             })
                         }}
                        className='bg-[#C1F6ED] border border-[#3B945E] px-2 py-2 w-96 rounded-md outline-none placeholder-[#3B945E]'
                    />
                </div>

                <div className="mb-5">
                    <button
                        type='button'
                        onClick={LoginFun}
                        className='bg-[#039b17] hover:bg-[#3B945E] w-full text-white text-center py-2 font-bold rounded-md '
                    >
                         
लॉग इन 
                    </button>
                </div>

                <div>
                <h2  className="text-[#3a3a3a]">   खाता नहीं है <Link className=' text-[#000000] font-bold' to={'/signup'}>
                साइन अप</Link></h2>
               
                </div>

            </div>
            
        </div>
        {loading && <Loader />}
        </div>
    );
}

export default Login;