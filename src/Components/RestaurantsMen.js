import React, { useEffect, useState } from "react";
import "./Header.css";
import "./RestaurantsMen.css";
import imageUrl from "../utils/images";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { addItem, clearCart } from "../utils/CardSlice";
import { useDispatch,useSelector } from "react-redux";
import  j from  "../Components/public/j.png"
const RestaurantsMen = () => {
  const [resMenu, setResMenu] = useState([]);
  const [avgRating, setAvgRating] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);


  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.406498&lng=78.47724389999999&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      );
      const data = await response.json();
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);

      const { avgRating, city, name } = data.data.cards[0].card.card.info;
      setAvgRating(avgRating);
      setCity(city);
      setName(name);
    
      const menuItems =
        data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card
          ?.card.itemCards;
      setResMenu(menuItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleDispatch(item) {

    console.log("dispact item>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", item);
    dispatch(addItem(item));
  }

  function handleRemoveItem(removeItem) {
console.log("???????????????????????????????????????????????????????????",removeItem)
    const {id} =removeItem?.card?.info?.id
   
    const updatedCart = cart.item.filter(item => item.card.info.id !== id);
    dispatch(clearCart())
    dispatch(addItem(updatedCart));
  }
  

  return (
    <div>
      {resMenu.length ? (
        <div>
          <div className="res-text">
            <h1>{name}</h1>
            <h2>{city}</h2>

            <p>
              <h2>
                {avgRating}
                <FontAwesomeIcon icon={faStar} className="checked" />{" "}
              </h2>{" "}
            </p>
            <h1>Menu Items</h1>
          </div>

          <div className="card">
            {resMenu.map((menuItem, index) => (
              <div className="card-items" key={index}>
                <img
                  src={imageUrl + menuItem.card.info.imageId}
                  width={250}
                  height={180}
                  alt={j}
                />
                <h5>{menuItem.card.info.name}</h5>
                
                <h5>{menuItem.card.info.price/ 100 || menuItem.card.info.defaultPrice / 100 }</h5>
                <button
                  onClick={() => {
                    handleDispatch(menuItem);
                  }}
                >
                  Add To Card
                </button>
                {/* <button onClick={() => handleRemoveItem(menuItem)} > Remove</button> */}
              </div>
            ))}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default RestaurantsMen;
