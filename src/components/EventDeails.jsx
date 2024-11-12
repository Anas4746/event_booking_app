
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import LoaderStyle from "../css/Loader.module.css"
import Style from "../css/event.module.css"
import StyleEvents from "../css/events.module.css"

function EventDeails() {
    let {eid} = useParams()
    let [event, setEvent]= useState(null)
    let navigte = useNavigate()

    let getEvent = async()=>{
        try {
            const { data } = await axios(
              `https://app.ticketmaster.com/discovery/v2/events/${eid}.json?apikey=oUvi85YUtgiy8e8badw5FyuSrGE9sHcm`
            );
            console.log(data)
            setEvent(data)
          } catch (err) {
            console.error(err);
          }
    }

    let navigateToEvents = ()=>{
        navigte(`/events`)
    }

    useEffect(()=>{
        getEvent()
    }, [eid])

    if (!event){
        return ( <div style={{alignItem:"center"}} className={StyleEvents.main}>
                    <h1 style={{marginTop:"30px"}}>Book your events now!!</h1>
                    <div className={StyleEvents.eventDiv}>
                    <div className={LoaderStyle.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            </div>
        )
    }

    let { name,id,classifications, dates, priceRanges, images } = event;
        classifications = classifications ? classifications[0] : false
        let category = classifications?.segment?.name || "Unknown";
        let date = dates?.start?.localDate || "No Date Available";
        priceRanges = priceRanges ? priceRanges[0] : false
        let price = priceRanges?.min || "N/A";
        let image = images[0]?.url || "https://s1.ticketm.net/dam/a/2e4/68baa9a2-339a-467b-9db4-516afb4d52e4_1339941_CUSTOM.jpg";
        let des = "Good Event"
        let avl_seats = 10

  return (
    <div style={{alignItem:"center"}} className={StyleEvents.main}>
         <h1 style={{marginTop:"30px"}}>Book your events now!!</h1>
         <div className={StyleEvents.eventDiv} >
            <div className={Style.card}>
                <div className={Style.cardImg}>
                    <img src={image} alt={`${name} Image.`} />
                </div>
                <div className={Style.cardContent}>
                    <div className={Style.titleDiv}>
                        <h2>Title: {name}</h2>
                    </div>
                    <div className={Style.categoryDiv}>
                        <h4>Category: {category}</h4>
                    </div>
                    <div className={Style.description}>
                        <h4>Description: {des}</h4>
                    </div>
                    <div className={Style.price}>
                        <h4>Price: ${price}</h4>
                    </div>
                    <div className={Style.date}>
                        <h4>Date: {date}</h4>
                    </div>
                    <div className={Style.seatAvlDiv}>
                        <h4>Seats Available: {avl_seats}</h4>
                    </div>
                    <div className={Style.bookTicketDiv}>
                        <button onClick={navigateToEvents}>Go to Events</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventDeails