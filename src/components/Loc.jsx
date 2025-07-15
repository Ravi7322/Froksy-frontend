import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Loc = () => {
    const [cod,setcod]=useState({lat:null,lng:null})
    const [city,setcity]=useState()
    const [err,seterr]=useState(null)
    const api='5d1de942e6904a928eacf60815741cc3'
    useEffect(()=>{
        if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async (position)=>{
            const lat=position.coords.latitude
            const lng=position.coords.longitude
            setcod({lat,lng})

        try{
            const response=await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api}`)
            const cityname=response.data.results[0].components.city
            setcity(cityname)
        }
        catch (err){
            seterr('Failed')

        }
    },);}
},[])
  return (
    <div>
        <h6>your location</h6>
        <h6>City: {city}</h6>
      
    </div>
  )
}

export default Loc





