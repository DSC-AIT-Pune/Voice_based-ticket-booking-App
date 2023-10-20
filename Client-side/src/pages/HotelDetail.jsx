import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ErorComponent from '../components/ErorComponent';
import Loader from '../components/Loader';
import HotelDetailsCard from '../components/HotelDetailsCard';

function HotelDetail() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [HotelDetails, setHotelDetails] = useState("");
    const [hotelStatus, setHotelStatus] = useState("");
    const [HotelDetailsData, setHotelDetailsData] = useState();

    useEffect(() => {
        const fetchHotelDetails = () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://travel-advisor.p.rapidapi.com/hotels/get-details',
                    params: { location_id: id, lang: 'en_US' },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                };
                axios.request(options).then(function (response) {
                    console.log(response.data.data);
                    setHotelDetailsData(response.data.data)
                    setHotelDetails(response.data.data[0])
                    setHotelStatus(response.data.status)
                }).catch(function (error) {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
                setLoading(false);
                <ErorComponent />
            }
        };
        fetchHotelDetails();
        setLoading(false);
    }, [id])

    return (
            <div>
                {
                    loading ? <Loader /> : (
                        <div>
                            {Array.isArray(HotelDetailsData) && HotelDetailsData.length > 0 ? (
                                <div>
                                    <HotelDetailsCard
                                        id={HotelDetails?.location_id}
                                        key={HotelDetails?.location_id}
                                        name={HotelDetails?.name}
                                        num_reviews={HotelDetails?.num_reviews}
                                        timezone={HotelDetails?.timezone}
                                        is_closed={HotelDetails?.is_closed}
                                        price={HotelDetails?.price}
                                        category={HotelDetails?.category?.name}
                                        address={HotelDetails?.address}
                                        phone={HotelDetails?.phone}
                                        img={HotelDetails?.photo?.images?.original?.url || 'https://media-cdn.tripadvisor.com/media/photo-o/08/17/37/eb/concordia-guesthouse.jpg'}
                                        available={HotelDetails?.hac_offers?.offers[0]?.is_bookable}
                                        about={hotelStatus?.pricing_disclaimer}
                                    />
                                </div>) : (<ErorComponent />)
                            }
                        </div>
                    )
                }
            </div>
    )
}

export default HotelDetail