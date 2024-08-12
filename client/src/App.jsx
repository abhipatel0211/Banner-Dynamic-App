import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Banner from "./Components/Banner";
import Dashboard from "./Components/Dashboard";
import axios from "axios";

const App = () => {
  const [bannerData, setBannerData] = useState({
    description: "",
    date: new Date(),
    link: "",
    isVisible: true,
  });

  const location = useLocation();

  const handleUpdateBanner = bannerData.isVisible;
  const handleHideBanner = () => {
    setBannerData((prevData) => ({ ...prevData, isVisible: false }));
  };
  useEffect(() => {
    const fetchBannerData = async () => {
      const res = await axios.get(
        "https://banner-dynamic-app-backend.vercel.app/api/banner"
      );
      const data = res.data;
      console.log(data);
      console.log(data.date);
      const date = new Date(data.date);
      date.setHours(date.getHours() - 5);
      date.setMinutes(date.getMinutes() - 30);
      setBannerData({
        description: data.description,
        date: date,
        link: data.link,
        isVisible: data.is_visible,
      });
    };

    fetchBannerData();
  }, [location.pathname]);

  useEffect(() => {
    if (bannerData.date < new Date()) {
      setBannerData((prevBannerData) => ({
        ...prevBannerData,
        isVisible: false,
      }));
    }
  }, [bannerData.date]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Banner
            description={bannerData.description}
            link={bannerData.link}
            targetDate={bannerData.date}
            onHide={!bannerData.isVisible}
            onHideBanner={handleHideBanner}
          />
        }
      />
      <Route
        path="/dashboard"
        element={<Dashboard handleUpdateBanner={handleUpdateBanner} />}
      />
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
