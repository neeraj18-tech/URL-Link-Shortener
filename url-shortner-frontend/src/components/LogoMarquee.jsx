import React from "react";
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.svg";
import logo4 from "../assets/logo4.svg";
import logo5 from "../assets/logo5.svg";
import logo6 from "../assets/logo6.svg";
import logo7 from "../assets/logo7.svg";
import logo8 from "../assets/logo8.svg";
import logo9 from "../assets/logo9.svg";
import logo10 from "../assets/logo10.svg";
import logo11 from "../assets/logo11.svg";
import logo12 from "../assets/logo12.svg";
import logo13 from "../assets/logo13.svg";
import logo15 from "../assets/logo15.svg";
import logo16 from "../assets/logo16.svg";
import logo17 from "../assets/logo17.svg";
import logo18 from "../assets/logo18.svg";
import logo19 from "../assets/logo19.svg";
import logo20 from "../assets/logo20.svg";

const logos = [
  logo1, logo2, logo3, logo4, logo5,
  logo6, logo7, logo8, logo9, logo10,
  logo11, logo12, logo13, logo15, logo16,
  logo17, logo18, logo19, logo20
];

const LogoRow = () => (
  <div className="flex items-center gap-20 px-10">
    {logos.map((logo, index) => (
      <img
        key={index}
        src={logo}
        alt="logo"
        className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
    ))}
  </div>
);

const LogoMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden mt-6">
      <div className="flex w-max animate-marquee">
        <LogoRow />
        <LogoRow />
      </div>
    </div>
  );
};

export default LogoMarquee;
