import React from 'react'
import { FaEdit, FaLink, FaShareAlt, FaChartLine } from 'react-icons/fa'
import { motion } from 'framer-motion'
const AboutPage = () => {
  return (
    <div className='lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-4'>
      <div className='bg-white w-full sm:py-10 py-8 rounded-lg'>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="sm:text-4xl text-3xl text-slate-800 font-bold mb-4"
        >
          About Linklystics
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-gray-600 text-sm mb-10 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full leading-relaxed'
        >
          Linklystics is a modern URL shortening and link management platform designed 
          to simplify sharing while providing powerful insights. Create short, 
          branded, and reliable links, track engagement in real time, and make 
          data-driven decisions with confidence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full"
        >
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <FaLink className='text-blue-500 text-3xl flex-shrink-0' />
            <div>
              <h2 className='text-xl font-semibold text-slate-800 mb-1'>
                Simple & Efficient URL Shortening
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instantly convert long URLs into clean, shareable links that are easy 
                to remember and optimized for all platforms.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className='flex items-start gap-4'>
            <FaChartLine className='text-green-500 text-3xl flex-shrink-0' />
            <div>
              <h2 className='text-xl font-semibold text-slate-800 mb-1'>
                Advanced Link Analytics
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Monitor link performance with detailed analytics including click counts, 
                geographic insights, and traffic sources to maximize reach.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <FaEdit className='text-purple-500 text-3xl flex-shrink-0' />
            <div>
              <h2 className='text-xl font-semibold text-slate-800 mb-1'>
                Secure & Reliable Links
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your data is protected with enterprise-grade security and encrypted 
                infrastructure, ensuring safe and reliable redirection at all times.
              </p>
            </div>
          </div>
          {/* Feature 4 */}
          <div className='flex items-start gap-4'>
            <FaShareAlt className='text-red-500 text-3xl flex-shrink-0' />
            <div>
              <h2 className='text-xl font-semibold text-slate-800 mb-1'>
                Fast & Highly Available
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Built for speed and scalability, Linklystics ensures your links remain 
                accessible anytime, anywhere—without delays.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
