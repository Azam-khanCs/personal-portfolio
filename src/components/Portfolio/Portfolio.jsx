import React, { useContext } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper"; // Import necessary Swiper components
import { themeContext } from "../../Context";

// Import Swiper styles (CSS files)

import Vivenda from "../../img/vivenda.png";
import HeadHunters from "../../img/the head hunters.png";
import RedStore from "../../img/red store.png";
import FileConverter from "../../img/file converter.png";
import Railway from "../../img/railway.png";
import Portfolio1 from "../../img/porfolio 1.png";
import Portfolio3 from "../../img/porfilio3.png";
import whyPorfolio from "../../img/whyPorfolio.png";
import Gymclub from "../../img/fitClub.png";
import { useState } from "react";
import { useEffect } from "react";

SwiperCore.use([Navigation, Pagination]);

const Portfolio = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesPerView(3);
      } else if (screenWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    // Initial call to set the initial slidesPerView value based on the screen size
    handleResize();

    // Event listener to update slidesPerView when window size changes
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="portfolio" id="portfolio">
      {/* heading */}
      <span style={{ color: darkMode ? "white" : "" }}>Recent Projects</span>
      <span>Portfolio</span>

      {/* slider */}
      <Swiper
        dots={true}
        spaceBetween={80}
        slidesPerView={slidesPerView}
        grabCursor={true}
        className="portfolio-slider"
        navigation={true} // Enable navigation arrows
        pagination={{ clickable: true }} // Enable pagination dots
      >
        <SwiperSlide>
          <a href="http://vivenda.pe/">
            <img src={Vivenda} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://symphonious-sundae-395465.netlify.app/">
            <img src={HeadHunters} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://leafy-fenglisu-b5192f.netlify.app/">
            <img src={RedStore} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://64b8fafccbdc555f8e0c85e9--chic-selkie-57328a.netlify.app/">
            <img src={Gymclub} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://whyportfolio1.netlify.app/">
            <img src={whyPorfolio} alt="" />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          <a href="https://pakrailway.netlify.app/">
            <img src={Railway} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://azamkhan-porfolio.netlify.app/">
            <img src={Portfolio1} alt="" />
          </a>
        </SwiperSlide>

        <SwiperSlide>
          <a href="https://fileconverterapp.netlify.app/">
            <img src={FileConverter} alt="" />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Portfolio3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Portfolio;
