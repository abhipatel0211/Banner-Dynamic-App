import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import Header from "./Header";

const Banner = ({ description, link, targetDate, onHide, onHideBanner }) => {
  if (targetDate < Date.now()) {
    onHide = true;
  }
  return (
    <div className="flex flex-col h-screen">
      <Header goTo="dashboard" />
      <div className="App flex flex-col items-center justify-center flex-grow bg-gray-100">
        <>
          {onHide ? (
            <>
              <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
                No Banner Available
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
                {description}
              </h1>
              <h1 className="text-sm font-extrabold mb-8 text-gray-900">
                Banner will Disapper in
              </h1>
              <CountdownTimer
                targetDate={targetDate}
                onCountdownComplete={onHideBanner}
              />
              <a
                className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
                href={`${link}`}
                target="_blank"
              >
                Goto Banner
              </a>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Banner;
