import React, { useCallback, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Dashboard = ({ handleUpdateBanner }) => {
  const [bannerDescription, setBannerDescription] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [link, setLink] = useState("");
  const [isVisible, setIsVisible] = useState(handleUpdateBanner);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description: bannerDescription,
      date: targetTime,
      link,
      isVisible,
    };
    const res = await axios
      .post("https://banner-dynamic-app-backend.vercel.app/api/banner", data)
      .then((res) => {
        setSubmittedData({ ...data, res: res.data });
      });
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedVisibilityChange = useCallback(
    debounce(async (visible) => {
      await axios.post(
        "https://banner-dynamic-app-backend.vercel.app/api/visibility",
        {
          visible,
        }
      );
      console.log("Visibility changed:", visible);
    }, 1000),
    []
  );

  const handlevisibility = () => {
    setIsVisible(!isVisible);
    debouncedVisibilityChange(!isVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header goTo="banner" />
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 flex-grow relative">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
        <div className="absolute flex top-5 right-5  items-center">
          <label
            htmlFor="isVisible"
            className="block text-sm font-medium text-gray-700 mr-4"
          >
            Banner Visibility
          </label>
          <div>
            <button
              className="relative w-16 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center"
              onClick={handlevisibility}
            >
              <div
                className={`mx-2 w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  isVisible ? "translate-x-6 bg-indigo-500" : " bg-white"
                }`}
              ></div>
            </button>
            <p className="text-gray-700 ml-2">
              {isVisible ? "Visible" : "Hidden"}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="bannerDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Banner Description
            </label>
            <input
              id="bannerDescription"
              type="text"
              value={bannerDescription}
              onChange={(e) => setBannerDescription(e.target.value)}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter banner description"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="targetTime"
              className="block text-sm font-medium text-gray-700"
            >
              Target Time
            </label>
            <input
              id="targetTime"
              type="datetime-local"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter URL"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
        {submittedData && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-900">Submitted Data</h2>
            <p>
              <strong>Banner Description:</strong> {submittedData.description}
            </p>
            <p>
              <strong>Target Time:</strong>{" "}
              {new Date(submittedData.date).toLocaleString()}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={submittedData.link}
                className="text-indigo-500 hover:underline"
              >
                {submittedData.link}
              </a>
            </p>
            <p>
              <strong>Visible:</strong> {submittedData.isVisible ? "Yes" : "No"}
            </p>
            <p>
              <strong>Response</strong> {submittedData.res}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
