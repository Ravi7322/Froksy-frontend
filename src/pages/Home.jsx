import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import './home.css'
import Pagecard from '../components/Pagecard'
import axios from 'axios'

const Home = ({searchText}) => {
  const [data,setdata]=useState([])
  useEffect(()=>{
    axios.get('https://dummyjson.com/c/bbdf-897f-4e4c-9a07')
    .then(res=>{
      console.log(res.data)
      setdata(res.data.products)
    })
    .catch(err => console.error("Error fetching data:", err));
  },[])
  return (
    <div>
      <Carousel searchText={searchText} />
      <div className='pagecard d-flex justify-content-start row-gap-2 column-gap-2 flex-wrap p-3'>
        {data.map((item) =>{
          return <Pagecard product={item}  searchText={searchText}/>
        })}
      </div>
    </div>
  )
}

export default Home
