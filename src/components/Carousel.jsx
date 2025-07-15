import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import './cos.css'
import { NavLink } from "react-router-dom";

const Carousel = ({searchText}) => {

    const [data,setdata]=useState([])
  
  const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3, // can keep this or remove
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  variableWidth: true // ✅ THIS IS KEY
};
  

  useEffect(()=>{
    axios.get('https://dummyjson.com/c/bbdf-897f-4e4c-9a07')
     .then(res => {
        setdata(res.data.products); // Use correct key
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);
  const highlightText = (text, highlight) => {
  if (!highlight) return text;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: "yellow" }}>{part}</mark>
    ) : (
      part
    )
  );
};
  return (
     <div className="slider-container">
      <Slider {...settings}>
  {data.map((item) => (
    <div className="custom-slide" key={item.id}  style={{ width: "150px", margin: "0 6px" }}>
      <NavLink to={`dish/${item.id}`}>
      <img
        src="./images/colo1.jpg"
        alt={item.name}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "50%"
        }}
      />
      </NavLink>
      <div>
        <h6>{highlightText(item.name, searchText)}</h6>
      </div>
      
    </div>
  ))}
</Slider>

     
    </div>
  )
}

export default Carousel
