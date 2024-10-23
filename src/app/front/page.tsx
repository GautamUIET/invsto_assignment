"use client";
import React, { useState } from "react";
import { Manrope } from "@next/font/google";

const manrope = Manrope({
  weight: ["600", "800"],
  subsets: ["latin"],
});

export default function Front() {
  const [slider, setSlider] = useState({
    max: 100,
    min: 0,
    value: 0,
    label: "0",
    price: "$8.00",
    pageviews: "10K",
    isMonthlyBilling: true,
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const onSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    let price = 8.0;
    let pageviews = "10K";

    if (newValue <= 20) {
      price = 8.0;
      pageviews = "10K";
    } else if (newValue <= 40) {
      price = 12.0;
      pageviews = "50K";
    } else if (newValue <= 60) {
      price = 16.0;
      pageviews = "100K";
    } else if (newValue <= 80) {
      price = 24.0;
      pageviews = "500K";
    } else if (newValue <= 100) {
      price = 36.0;
      pageviews = "1M";
    }

    if (!slider.isMonthlyBilling) {
      price = price * 12 * 0.75;
    }

    setSlider((prev) => ({
      ...prev,
      value: newValue,
      price: `$${price.toFixed(2)}`,
      pageviews: pageviews,
    }));
  };

  const toggleBilling = () => {
    setSlider((prev) => {
      const newIsMonthlyBilling = !prev.isMonthlyBilling;

      let newPrice = parseFloat(prev.price.replace("$", ""));

      if (!newIsMonthlyBilling) {
        newPrice = newPrice*12*0.75;
      } else {
        if (prev.value <= 20) {
          newPrice = 8.0;
        } else if (prev.value <= 40) {
          newPrice = 12.0;
        } else if (prev.value <= 60) {
          newPrice = 16.0;
        } else if (prev.value <= 80) {
          newPrice = 24.0;
        } else {
          newPrice = 36.0;
        }
      }

      return {
        ...prev,
        isMonthlyBilling: newIsMonthlyBilling,
        price: `$${newPrice.toFixed(2)}`,
      };
    });
  };

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // }; 

  const toggleTheme = () => {
    setIsDarkTheme(prev => {
      console.log("Toggling theme: ", !prev);
      return !prev;
    });
  };
  
  return (
    <div className={`${manrope.className} ${isDarkTheme ? "dark" : ""}`}>
      <div
        className={`${
          isDarkTheme ? "bg-[#0A1018]" : "bg-[#E8F2FF]"
        } w-full p-4 flex justify-end`}
      >
        <button
          onClick={toggleTheme}
          className="py-2 px-4 bg-blue-950 text-xs text-white rounded-lg hover:bg-blue-900 focus:outline-none"
        >
          {isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      <div
        className={`h-screen w-full flex flex-col items-center ${
          isDarkTheme ? "bg-[#0A1018]" : "bg-[#E8F2FF]"
        }`}
      >
        <div
          className={`rounded-full bg-center bg-cover bg-no-repeat h-[50vh] w-full flex flex-col gap-20 items-center justify-center text-green-500 ${
            isDarkTheme ? "bg-slate-950" : "bg-[url('/images/bg-pattern.svg')]"
          }`}
        >
          <div
            className={`h-[200px] w-[200px] bg-no-repeat flex items-center justify-center mt-[-70px] md:mt-0 ${
              isDarkTheme ? "" : "bg-[url('/images/pattern-circles.svg')]"
            }`}
          ></div>
          <div className="text-3xl flex flex-col items-center justify-center font-bold w-full absolute top-[120px]">
            <div className="md:mt-10 mt-[-30px] p-0 text-[#2B3A5D] text-2xl sm:text-2xl md:text-3xl">
              Simple, traffic-based pricing
            </div>
            <div className="text-[#A6B4C2] text-sm w-[55vw] text-center font-thin">
              Sign-Up for our 30-day trial. No credit card required
            </div>
          </div>
        </div>

        <div
          className={ `${
            isDarkTheme?"bg-slate-900":"bg-white"
          } md:h-[400px] h-[490px] rounded-xl w-full md:pl-10 md:pr-10 max-w-[500px] flex justify-center  mt-[-140px] md:mt-[-120px] `}
        >
          <div className="range-slider w-full p-4">
            <div className="flex flex-col md:flex-row mt-10 mb-10 justify-between items-center md:items-start">
              <div className="text-[#A6B4C2] flex justify-center  gap-2 md:mt-[-10px] text-center font-semibold md:text-left md:ml-6  md:w-[10%] w-full">
                <div>{`${slider.pageviews}`}</div>
                <div>pageviews</div>
              </div>

              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={slider.value}
                onChange={onSlide}
                className="slider md:absolute md:hidden md:w-[10%] w-[80%] mt-10 mb-10 md:mt-0 md:mb-0"
                id="myRange"
                style={{
                  background: `linear-gradient(
                    to right,
                    #A4F3EB ${slider.value}%,
                    #E2E9F5 ${slider.value}% 
                  )`,
                }}
              />

              <div className="text-[#2B3A5D] font-extrabold flex justify-center items-center gap-2 text-3xl md:ml-4  md:w-[20%] w-full md:mt-[-20px]">
                <span>{`${slider.price}`}</span>
                <span className="text-sm font-semibold text-[#A6B4C2]">
                  {slider.isMonthlyBilling ? "/month" : "/year"}
                </span>
              </div>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              value={slider.value}
              onChange={onSlide}
              className="slider hidden md:block  md:w-[60%] w-[80%]   md:mt-0 md:mb-0"
              id="myRange"
              style={{
                background: `linear-gradient(
                  to right,
                  #A4F3EB ${slider.value}%,
                  #E2E9F5 ${slider.value}% 
                )`,
              }}
            />

            <div className="flex justify-end gap-2 mt-10 md:mt-16 w-full">
              <div className="text-xs text-[#A6B4C2] font-semibold">
                Monthly billing
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={slider.isMonthlyBilling}
                  onChange={toggleBilling}
                  className="hidden"
                />
                <div
                  className={`toggle-switch w-10 h-5 rounded-full shadow-inner transition-colors ${
                    slider.isMonthlyBilling ? "bg-[#1FA393]" : "bg-gray-300"
                  }`}
                ></div>
              </label>
              <div className="text-xs text-[#A6B4C2] font-semibold">
                Yearly Billing
              </div>

              <div className="bg-[#FEE6E0] flex items-center justify-center rounded-md p-1 text-[#FF7A56] font-semibold">
                <span className="text-[10px] sm:hidden">-25%</span>
                <span className="text-[10px] hidden sm:inline">
                  25% discount
                </span>
              </div>
            </div>

            <hr className="w-[80%] border-t border-[#E2E9F5] mt-10 mb-5 mx-auto" />

            <div className="flex md:flex-row flex-col justify-center md:justify-between mt-7">
              <div className="left flex flex-col md:justify-start justify-center items-center md:items-start gap-2">
                <div className="flex gap-2">
                  <div className="bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center w-4 h-4"></div>
                  <div className="text-xs text-[#A6B4C2] font-semibold">
                    Unlimited websites
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center w-4 h-4"></div>
                  <div className="text-xs text-[#A6B4C2] font-semibold">
                    100% data ownership
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center w-4 h-4"></div>
                  <div className="text-xs text-[#A6B4C2] font-semibold">
                    Email reports
                  </div>
                </div>
              </div>

              <div className="right flex items-center justify-center">
                <div className=" mt-3 h-[40px] bg-blue-950 text-xs rounded-full flex items-center justify-center text-white font-semibold  md:relative w-[150px] md:w-[150px] cursor-pointer">
                  Start my trial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 10px;
          outline: none;
          opacity: 0.7;
          transition: opacity 0.15s ease-in-out;
        }

        /* Webkit Slider Thumb (for Chrome, Safari) */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 40px;
          height: 40px;
          background-color: #1fa393; /* Cyan background */
          background-image: url("/images/icon-slider.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 60%; /* Adjust size based on SVG size */
          border-radius: 50%;
          cursor: pointer;
        }

        /* Moz Range Thumb (for Firefox) */
        input[type="range"]::-moz-range-thumb {
          width: 50px;
          height: 50px;
          background: url("/images/slider-thumb-icon.svg") no-repeat center;
          background-size: contain;
          cursor: pointer;
        }

        /* Toggle Switch Styles */
        .toggle-switch {
          position: relative;
          background-color: #7ed3d2;
          border-radius: 30px; /* Keep this for rounded shape */
          height: 22px; /* Height of the toggle switch */
          width: 49px; /* Width of the toggle switch */
          transition: background-color 0.2s;
        }

        .toggle-switch:before {
          content: "";
          position: absolute;
          width: 16px; /* Size of the inner ball */
          height: 16px; /* Size of the inner ball */
          left: 3px; /* Positioning inside the toggle */
          bottom: 2px; /* Positioning inside the toggle */
          background-color: #fff; /* Inner ball color */
          border-radius: 50%; /* Circular shape */
          transition: transform 0.2s;
        }

        input[type="checkbox"]:checked + .toggle-switch {
          background-color: #7faed8; /* Active state color */
        }

        input[type="checkbox"]:checked + .toggle-switch:before {
          transform: translateX(30px); /* Move the inner ball when checked */
        }
      `}</style>
    </div>
  );
}
