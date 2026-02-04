import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaEnvelope,
  FaGithub
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-custom-gradient text-white py-8 relative z-40">
      <div className="container mx-auto px-6 lg:px-14">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Linklytics</h2>
            <p className="text-sm opacity-90">
              Simplifying URL shortening for efficient sharing
            </p>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-sm opacity-90">
              © 2025 Linklytics. All rights reserved.
            </p>
            <a
              href="mailto:ironheart.mayank@gmail.com"
              className="flex items-center justify-center gap-2 mt-2 text-sm hover:text-gray-200 transition"
            >
              <FaEnvelope size={16} />
              ironheart.mayank@gmail.com
            </a>
          </div>

          {/* Right */}
          <div className="flex space-x-5">
            
            <a href="https://x.com/ninjaxmayank" className="hover:text-gray-200 transition">
              <FaTwitter size={22} />
            </a>
            <a href="https://www.instagram.com/astatine_x_/?hl=en" className="hover:text-gray-200 transition">
              <FaInstagram size={22} />
            </a>
            <a href="https://www.linkedin.com/in/mayank-raj-4040b5264/" className="hover:text-gray-200 transition">
              <FaLinkedin size={22} />
            </a>
            <a href="https://github.com/aquariusmayankraj" className="hover:text-gray-200 transition">
              <FaGithub size={22} />
            </a>
            
            
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
