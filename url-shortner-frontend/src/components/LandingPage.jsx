import React from 'react';
import img1 from '../assets/img1.png';
import Card from './Card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LogoMarquee from "./LogoMarquee";
import { useStoreContext } from '../contextApi/ContextApi'

const LandingPage = () => {
  const navigate = useNavigate();
  const {token} = useStoreContext()
  
  const dashboardNavigateHeadler = () => {
    
  };
  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-20 sm:px-10 px-6 py-10">
      
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center lg:gap-16 gap-10">
        
        {/* Left Side */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight"
          >
            Linklystics Simplifies URL Shortening for Smarter & Faster Sharing
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-slate-700 text-sm md:text-base leading-relaxed mt-6 lg:w-full md:w-[75%] w-full'>
            Linklystics is a powerful and user-friendly URL shortening platform designed 
            to help individuals, marketers, and businesses create short, clean, and 
            reliable links in seconds. Our platform transforms long and complex URLs 
            into easy-to-share links that enhance readability, improve engagement, 
            and strengthen your online presence.
            
            <br /><br />

            With built-in analytics and real-time tracking, Linklystics allows you to 
            monitor how your links perform across different channels. Track clicks, 
            analyze audience locations, and understand referral sources to optimize 
            campaigns and maximize reach. Whether you're sharing links on social media, 
            emails, or marketing campaigns, Linklystics ensures every click counts.
            
            <br /><br />

            Built with speed, security, and scalability in mind, Linklystics guarantees 
            fast redirection, high availability, and enterprise-grade protection for 
            your data. From personal use to large-scale business needs, Linklystics 
            provides a reliable solution for managing and sharing links efficiently.
          </motion.p>

          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              onClick={dashboardNavigateHeadler}
              className="bg-custom-gradient text-white px-6 py-2 rounded-lg hover:bg-custom-gradient-2 transition-colors"
            >
              Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              onClick={dashboardNavigateHeadler}
              className="bg-custom-gradient text-white px-6 py-2 rounded-lg hover:bg-custom-gradient-2 transition-colors"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center w-full">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            src={img1} 
            alt="Illustration" 
            className="sm:w-[480px] w-[400px] object-cover rounded-xl"
          />
        </div>
      </div>


      {/* Trusted Section */}
<motion.div className="mt-16 text-center">
  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.1 }}
    className="text-slate-800 font-bold text-xl"
  >
    Trusted by millions of users worldwide
  </motion.p>

  {/* LOGO MARQUEE */}
  <LogoMarquee />
</motion.div>


      {/* Cards Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6"
      >
        <Card
          title="Simple URL Shortening"
          desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface makes shortening URLs quick and effortless."
        />
        <Card
          title="Powerful Analytics"
          desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographic data, and referral sources."
        />
        <Card
          title="Enhanced Security"
          desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe."
        />
        <Card
          title="Fast and Reliable"
          desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure, ensuring a seamless experience for your users."
        />
      </motion.div>

    </div>
  );
};

export default LandingPage;
