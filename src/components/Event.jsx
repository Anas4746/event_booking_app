

import React, { useState } from 'react'
import Style from "../css/event.module.css"
import { useNavigate } from 'react-router-dom'

function Event({title,des,category,date,price,avl_seats,image, id}) {
    // console.log(title,des,category,date,price,image);
    let [seact_avl, setSeactAvl] = useState(avl_seats) 
    let [seatFull, setSeatFull] = useState("")
    let navigate = useNavigate()
    let moreDetails = ()=>{
        navigate(`/eventDetails/${id}`)
    }
    let updateRating = ()=>{
        if(seact_avl == 0){
            return setSeatFull("Event is fully booked.")
        }
        setSeactAvl((seact_avl)=>seact_avl-1)
    }
  return (
    <div className={Style.card}>
        <div className={Style.cardImg}>
            <img src={image} alt={`${title} Image.`} />
        </div>
        <div className={Style.cardContent}>
            <div className={Style.titleDiv}>
                <h2>Title: {title}</h2>
            </div>
            <div className={Style.categoryDiv}>
                <h4>Category: {category}</h4>
            </div>
            <div className={Style.seatAvlDiv}>
                <h4>Seats Available: {seact_avl}</h4>
            </div>
            <div className={Style.seeMore}>
                <button onClick={moreDetails}>view more details...</button>
            </div>
            <div className={Style.seatFull}>
                <span style={{color:"red"}}>{seatFull && seatFull}</span>
            </div>
            <div className={Style.bookTicketDiv}>
                <button onClick={updateRating}>Book Ticket</button>
            </div>
        </div>
    </div>
  )
}

export default React.memo(Event)