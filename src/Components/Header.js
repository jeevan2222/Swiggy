import React, { useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

import imageUrl from "../utils/images";
import { IoMdRestaurant } from "react-icons/io";
import { IoIosRefreshCircle } from "react-icons/io";
const Header = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [refreshoriginalRestaurants, setRefreshOriginalRestaurants] = useState(
    []
  );

  async function logMovies() {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const movies = await response.json();
      let data =
        movies.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
      setRestaurants(data);
      setOriginalRestaurants(data);
      setRefreshOriginalRestaurants(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    logMovies();
  }, []);

  function filterRating() {
    const filteredRestaurants = originalRestaurants.filter(
      (el) => el.info.avgRating > 4.5
    );

    setRestaurants(filteredRestaurants);
  }
  function refreshData() {
    setRestaurants(refreshoriginalRestaurants);
  }

  return (
    <div>
      <div className="filter">
        <p>
          <input
            class="input-text"
            type="text"
            id="location"
            placeholder="Search  Restaurants"
          />
          <div className="search-icon">
            <FaSearch />
          </div>
        </p>
        <p className="top">
          <div className="filter-btn">
            <a onClick={filterRating} href="#">
              Top Rated Restaurants
            </a>
          </div>
          <div className="refresh">
            <a href="#" onClick={refreshData}>
              {" "}
              <IoIosRefreshCircle />
            </a>
          </div>
        </p>
      </div>

      <div className="card">
        {restaurants.length ? (
          restaurants.map((item, index) => (
            <div className="card-items" key={index}>
              <Link to={`/restaurant/${item.info.id}`}>
                <img
                  src={imageUrl + item.info.cloudinaryImageId}
                  width={250}
                  height={180}
                  alt="logo"
                />
              </Link>
              <h5>
                {item.info.name} <IoMdRestaurant />
              </h5>

              <h5>
                {item.info.areaName} <CiLocationOn style={{ color: "red" }} />
              </h5>
              <h5>
                {item.info.avgRating}{" "}
                <span>
                  <FontAwesomeIcon icon={faStar} className="checked" />
                </span>
              </h5>
            </div>
          ))
        ) : (
          <div class="loader"></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Header;
