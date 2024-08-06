import hero from '../assets/hero.mp4'
import { motion } from "framer-motion"
const Herosection = () => {
    
    return (
        <section className=" bg[#2eaf7d]">
        
        
       
    <section className=" relative h-screen -z-10 flex flex-col items-center justify-top pt-20 text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video
          className="min-w-full min-h-screen absolute object-cover"
           src={hero}
          type="video/mp4"
          autoPlay
          muted
          loop
        > </video>
      </div>
      <motion.div 
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{opacity: 1, scale: 1 }}
         transition={{ duration: 1 ,delay:1 }}
         
        className="video-content space-y-2 z-10 px-16">
        <h1 className="font-bold text-6xl mt-6">परियोजना विवरण...</h1>
        <h3 className="font-normal text-xl">कृषि मित्र समीक्षा में आपका स्वागत है, जो आपके खेत के लिए सर्वोत्तम कृषि रसायनों को खोजने का आपका प्रमुख मंच है। यहाँ, आप अपने सह-किसानों से विस्तृत रेटिंग्स देख सकते हैं, जो आपको अपनी विशिष्ट आवश्यकताओं के अनुसार उत्पाद चुनने में मदद करती हैं। हमारे समुदाय संचालित अंतर्दृष्टि सुनिश्चित करती हैं कि आप स्वस्थ फसलों और उच्च उपज के लिए सूचित निर्णय लें। हमारे साथ जुड़ें और साझा अनुभवों के माध्यम से स्मार्ट और प्रभावी कृषि प्रथाओं को बढ़ावा दें।</h3>
      </motion.div>
    </section>


    </section>

       
    );
}

export default Herosection;

         {/* <img className=" h-30 w-full lg:h-full" src="https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />*/}  
        