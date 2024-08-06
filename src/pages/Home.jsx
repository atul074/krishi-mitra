import Category from "../components/Category";
import Herosection from "../components/Herosection";
import Homeproductcard from "../components/Homeproductcard";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
//import Mycontext from "../context/Mycontext";
//import { useContext } from "react";

const Home = () => {
   // const context = useContext(Mycontextontext);
   // const name = context
    return (
        <Layout>
            <Herosection/>
            <Category/>
          <Homeproductcard/>  
          {/* <Loader/> */}
        </Layout>
    );
}

export default Home;