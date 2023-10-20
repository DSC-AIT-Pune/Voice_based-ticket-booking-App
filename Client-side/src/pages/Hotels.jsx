import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import dateFormat from 'dateformat';
import Loader from '../components/Loader';
import HotelCard from '../components/HotelCard';
import { useParams } from 'react-router-dom'

// fake hotels
import FakeHotel from '../data/FakeHotel.js';
import '../styles/components/hotelCard.css'
import ErorComponent from '../components/ErorComponent';

function Hotels() {
    let { firstName, email, checkIn, location, adults, phone } = useParams();

    const [loading, setLoading] = useState(true);
    // latitude and longitude
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    // final data from api 
    const [hotelsBigData, setHotelsBigData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
                    params: { address: location, language: 'en' },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
                    }
                };
                const locationData = await axios.request(options);
                setLat(locationData.data.results[0].location.lat);
                setLon(locationData.data.results[0].location.lng);
            } catch (error) {
                console.error(error);
                <ErorComponent />
            }
        };
        fetchData();
    }, [location]);


    const checkInDate = dateFormat(checkIn, 'yyyy-mm-dd');

    // fitering for email and phone numbers 
    const phoneNumber = phone.replace(/ /g, "")
    // console.log(phoneNumber);

    const goodEmail = email.replace(/ /g, "")
    // console.log(goodEmail);

    const newuserEmail = goodEmail.toLowerCase();
    // console.log(newuserEmail);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
                    params: {
                        latitude: lat,
                        longitude: lon,
                        // latitude: '18.5204',
                        // longitude: '73.8567',
                        lang: 'en_US',
                    },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                };
                const hotelsData = await axios.request(options);
                console.log(hotelsData.data.data);
                setHotelsBigData(hotelsData.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchHotels();
    }, [lat, lon]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let payload = {}
        for (let i = 0; i < event.target.length - 1; i++) {
            payload[event.target[i].id] = (event.target[i].value)
        }
        console.log(payload.EmailAddress);
        axios.post("https://innerve7-server.vercel.app/register", JSON.parse(JSON.stringify(payload))).then((Response) => {
            console.log("user registered worked")
        });
        alert("subscibed");
    }

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: 'auto',
                fontWeight: 'bold',
                color: 'white'
            }}>
                <h1>Welcome {firstName}, Here is the List of Hotels in {location}</h1>
            </div>
            <div>
                {
                    loading ? <Loader /> : (
                        <div className="card-container">
                            {Array.isArray(hotelsBigData) && hotelsBigData.length > 0 ? (hotelsBigData.map((i) => {
                                return (
                                    <HotelCard
                                        id={i.location_id}
                                        key={i.location_id}
                                        name={i.name}
                                        img={i.photo?.images?.original?.url || 'https://media-cdn.tripadvisor.com/media/photo-o/08/17/37/eb/concordia-guesthouse.jpg'}
                                        reviews={i.num_reviews}
                                        price={i.price}
                                        rating={i.rating}
                                    />
                                )
                            })) :
                                (<div className="card-container">
                                    {FakeHotel.map((i) => {
                                        return (
                                            <HotelCard
                                                id={i.location_id}
                                                key={i.location_id}
                                                name={i.name}
                                                img={i.photo?.images?.original?.url || 'https://media-cdn.tripadvisor.com/media/photo-o/08/17/37/eb/concordia-guesthouse.jpg'}
                                                reviews={i.num_reviews}
                                                price={i.price}
                                                rating={i.rating}
                                            />
                                        )
                                    })}
                                </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div style={{
                position: "fixed",
                bottom: 50,
                right: 50,
                "zIndex": 9999,
                background: "#ECEBEB",
                "borderRadius": "10px",
                "borderStyle": "solid",
                borderWidth: "2px",
                borderColor: "#000000",
            }}>
                <div style={{
                    fontSize: "30px",
                    fontFamily: "san-serif",
                    fontWeight: "bold",
                    color: "black",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }}>
                    Personalised hotel<br />recomendation in {location}
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="phoneNo" style={{
                            "fontSize": "14px",
                            "fontWeight": "bold",
                            "marginBottom": "5px",
                            "paddingRight": "40px",
                            "paddingLeft": "20px",
                            "paddingTop": "20px"
                        }}>Phone No:</label>
                        <input type="tel" id="PhoneNo" placeholder="(Ex. PhoneNo...)" value={phoneNumber} style={{
                            "padding": "5px",
                            "border": "1px solid #ccc",
                            "borderRadius": "3px",
                            "width": "200px",
                            "fontSize": "14px",
                            marginRight: "10px"
                        }} />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" style={{
                            "fontSize": "14px",
                            "fontWeight": "bold",
                            "marginBottom": "5px",
                            "paddingRight": "13px",
                            "paddingLeft": "20px",
                            "paddingTop": "20px"
                        }}>Email Address:</label>
                        <input type="email" id="EmailAddress" placeholder="(Ex. ajaysingh1234@gmail....)" value={newuserEmail} style={{
                            "padding": "5px",
                            "border": "1px solid #ccc",
                            "borderRadius": "3px",
                            "width": "200px",
                            "fontSize": "14px",
                            marginRight: "10px"

                        }} />
                    </div>
                    <div>
                        <label htmlFor="phoneNo" style={{
                            "fontSize": "14px",
                            "fontWeight": "bold",
                            "marginBottom": "5px",
                            "paddingRight": "40px",
                            "paddingLeft": "27.5px",
                            "paddingTop": "20px"
                        }}>Location:</label>
                        <input type="text" id="Location" placeholder="(Ex. Delhi...)" value={location} style={{
                            "padding": "5px",
                            "border": "1px solid #ccc",
                            "borderRadius": "3px",
                            "width": "200px",
                            "fontSize": "14px",
                            marginRight: "10px"
                        }} />
                    </div>
                    <button type="submit" style={{
                        marginBottom: "20px"
                    }}>Subscribe(It's free)</button>
                </form>
            </div>
        </>
    )
};


export default Hotels