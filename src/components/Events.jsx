
import axios from "axios"
import { useEffect, useReducer, useState } from "react";
import Event from "./Event";
import Style from "../css/events.module.css"
import LoaderStyle from "../css/Loader.module.css"

function Events() {

    let [search, setSearh ] = useState("dance")
    let [searchedShow, setSearchedShow] = useState(search)

    let updateSearch = ({target:{value}})=>{
        console.log(value.trim());
        if(value==""){
            return setSearh("dance")
        }
        setSearh(value.trim())
    }

    let updateSearchedShow = ()=>{
        console.log("button clicked");
        setSearchedShow(search)
    }

    let obj = {
        events: [],
        error:false,
        loader:true
    }

    let reducer = (currentState, data)=>{
        return data
    }

    let [eventsData, dispatcher] = useReducer(reducer, obj)

    let getEvents = async ()=>{
        try{
            dispatcher({loader:true})
            let {data} = await axios(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=oUvi85YUtgiy8e8badw5FyuSrGE9sHcm&keyword=${searchedShow}&size=10&page=2`)
            let EventsData = data._embedded.events
            console.log(EventsData);
            dispatcher({events:EventsData, loader:false})
            // title, description, category, date, available_seats, price
        }
        catch(err){
            console.log(err);
            dispatcher({loader:false})
            if(err.message == "Network Error"){
                return dispatcher({error:err.message})
            }
            dispatcher({error:`Events only available for 
                music,
                comedy,
                sports,
                theater,
                family and
                dance.`
            })
        }
    }
    useEffect(()=>{
        getEvents()
    },[searchedShow])
    // console.log(eventsData.events);
    // console.log(eventsData.error);
    console.log(eventsData.loader);
  return (
    <div className={Style.main}>
        <h1 className={Style.eventheading}>Book your events now!!</h1>
        <div className={Style.searchBar}>
                <div className={Style.searchDiv}>
                <div className={Style.inputDiv}>
                    <input type="text" onChange={updateSearch} placeholder="Search Event"/>
                </div>
                <div className={Style.searchButtonDiv}>
                    <button onClick={updateSearchedShow}>Search</button>
                </div>
                </div>
            </div>
        <div className={Style.eventDiv}>
            {eventsData.loader&&
            <div className={LoaderStyle.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
            {eventsData.error ? 
                <div className={Style.errorDiv}>
                    <h2 style={{color:"red"}}>*{eventsData.error}*</h2>
                </div>
                : eventsData.events&&eventsData?.events?.map((event) => {
                    let { name,id,classifications, dates, priceRanges, images } = event;
                    classifications = classifications ? classifications[0] : false
                    let category = classifications?.segment?.name || "Unknown";
                    let date = dates?.start?.localDate || "No Date Available";
                    priceRanges = priceRanges ? priceRanges[0] : false
                    let price = priceRanges?.min || "N/A";
                    let image = images[0]?.url || "https://s1.ticketm.net/dam/a/2e4/68baa9a2-339a-467b-9db4-516afb4d52e4_1339941_CUSTOM.jpg";
                    let des = "Good"
                    let avl_seats = 10
                    return <Event key={id} title={name} des={des} category={category} date={date} price={price} avl_seats={avl_seats} image={image} id={id} />
                    
                })
            }
    </div>
    </div>
  )
}

export default Events