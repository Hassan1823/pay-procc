import React, { useState } from "react";
import Contact from "@/components/Contact";
import General from "@/components/General";
import Merchant from "@/components/Merchant";
import Payment from "@/components/Payment";
import UploadFiles from "@/components/UploadFiles";

const data = [
  "General",
  "Payment Features",
  "Merchant Terms",
  "Upload Files",
  "Contact details",
];

const components = [General, Payment, Merchant, UploadFiles, Contact];

const StepperContainer = () => {
  const [confirmPost, setConfirmPost] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePost = () => {
    setConfirmPost(!confirmPost)
    console.log(confirmPost)
  };
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const ActiveComponent = components[activeIndex];

  return (
    <div className="flex">
      <div className="fixed h-[72vh] w-[20vw] flex flex-col justify-around items-start ml-[8vw] my-4">
        {data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <button
                  className={`rounded-full w-10 h-10 text-lg font-semibold text-black transition-colors duration-300 ${
                    activeIndex === index ? "bg-green-700" : "bg-green-500"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  &#10003;
                </button>
                <span
                  className={`ml-3 text-[18px] uppercase w-3 h-10 ${
                    activeIndex === index ? "text-white" : "text-slate-500"
                  } transition-transform duration-300`}
                  style={{
                    transform:
                      activeIndex === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {item}
                </span>
              </div>
              {index !== data.length - 1 && (
                <div className="border-[2px] border-white rounded-full h-full mx-auto ml-5"></div>
              )}
            </React.Fragment>
          );
        })}
        <div className="fixed bottom-0 right-0 mr-6 mb-6 flex flex-col gap-4 justify-center items-center">
          <div className="">
            {/* previous button */}
            <button
              className={`mr-2 rounded-full w-10 h-10 text-[20px] font-semibold text-black transition-colors duration-300 ${
                activeIndex === 0 ? "bg-gray-400" : "bg-green-500"
              }`}
              disabled={activeIndex === 0}
              onClick={handlePrev}
            >
              &#8249;
            </button>
            {/* next button */}
            <button
              className={`rounded-full w-10 h-10 text-[20px] font-semibold text-black transition-colors duration-300 ${
                activeIndex === data.length - 1 ? "bg-gray-400" : "bg-green-500"
              }`}
              disabled={activeIndex === data.length - 1}
              onClick={handleNext}
            >
              &#8250;
            </button>
          </div>
          {/* complete button */}

          <button
            className={`flex items-center text-white py-2 px-4 rounded-full  ${
              activeIndex !== data.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700 cursor-pointer"
            }`}
            onClick={handlePost}
            disabled={activeIndex !== data.length - 1}
          >
            <span className="mr-2">Complete</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="#fff"
                d="M5.5 4.5l4 4-4 4"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
      {ActiveComponent && (
        <div className="ml-auto  w-[70vw]">
          <ActiveComponent confirmPost={confirmPost} />
        </div>
      )}
    </div>
  );
};

export default StepperContainer;
