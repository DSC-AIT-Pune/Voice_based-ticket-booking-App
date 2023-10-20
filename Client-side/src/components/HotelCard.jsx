import '../styles/components/hotelCard.css'
import { Link } from 'react-router-dom'

const HotelCard = ({ id, name, img, reviews, price, rating }) => {
    return (
        <Link to={`/hotels/${id}/`}>
            <div className="hotel-card">
                <div className='hotel-card-first'>
                    <img src={img} alt="img" />
                </div>
                <div className='hotel-card-second'>
                    <div>Rating: {rating}</div>
                    <div>Reviews: {reviews}</div>
                </div>
                <div className='hostel-card-third'>
                    <div>{name}</div>
                    <div>{price}</div>
                </div>
            </div>
        </Link>
    )
}
export default HotelCard