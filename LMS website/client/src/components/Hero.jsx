import { Award, Search, User } from "lucide-react";
import HeroImage from "../assets/images/hero_image.png";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { useState } from "react";


function Hero() {
  
  return (
    <div className="bg-slate-800 pt-14">
      <div className="lg:h-[600px] max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center">
        {/* text Section  */}
        <div className="space-y-7 px-4 pt-14">
          <h1 className="text-4xl mt-10 md:mt-0 md:text-6xl font-extrabold text-gray-200">
            Explore our <span className="text-blue-500">14000+</span> <br />{" "}
            Online Courses of all{" "}
          </h1>
          <p className="text-gray-300 text-lg">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam,
            minima.
          </p> 
          
        </div>
        {/* image Section  */}
        <div className="flex md:h-[600px] items-end relative px-4 md:px-0">
          <img
            src={HeroImage}
            alt=""
            className="w-[480px] shadow-blue-500 drop-shadow-lg"
          />


          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[10%] left-0 px-4 py-2 ">
            <div className="rounded-full bg-blue-400 p-2 text-white ">
              <Award />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">
                {" "}
                <CountUp end={1250} />+{" "}
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Certified Students
              </p>
            </div>
          </div>

          <div className="bg-slate-200 hidden md:flex gap-3 items-center rounded-md absolute top-[45%] right-0 px-4 py-2 ">
            <div className="rounded-full bg-blue-400 p-2 text-white ">
              <User />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">
                {" "}
                <CountUp end={4500} />+{" "}
              </h2>
              <p className="italic text-sm text-gray-600 leading-none">
                Active Students
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
