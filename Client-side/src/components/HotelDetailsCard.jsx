import React from 'react'
import '../styles/components/hotelDetailCard.css'
import { useNavigate } from 'react-router-dom';

function HotelDetailsCard({id,name,address,phone,category,price,num_reviews,timezone,available,about,img}) {
    const navigate = useNavigate();
    async function handleClick (){
        const setMoodPromise = MoodContract.setMood(id);
        await setMoodPromise;
        navigate(`/payment/${id}/${price}`);
    }
    const { ethers } = window;

    const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "goerli"
    );
    const MoodContractAddress = "0x25460959ce53a97A6ef6e8f47a759aBD7E872222";
    const MoodContractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_mood",
                    "type": "string"
                }
            ],
            "name": "setMood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMood",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    let MoodContract;
    let signer;

    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then(function (accounts) {
            signer = provider.getSigner(accounts[0]);
            MoodContract = new ethers.Contract(
                MoodContractAddress,
                MoodContractABI,
                signer
            );
        });
    });

    return (
        <div className="hotel-details-card">
            <div className="hotel-details-card__image">
                <img src= {img} alt="img" />
            </div>
            <div className="hotel-details-card__content">
                <h2 className="hotel-details-card__name">Name: {name}</h2>
                <p className="hotel-details-card__address">Address: {address}</p>
                <p className="hotel-details-card__phone">Phone: {phone}</p>
                <p className="hotel-details-card__category">Category: {category}</p>
                <p className="hotel-details-card__price">price: {price}</p>
                <p className="hotel-details-card__reviews">{num_reviews} Reviews</p>
                <p className="hotel-details-card__timezone">Timezone: {timezone}</p>
                <p className="hotel-details-card__availability">booking:{available ? 'Available' : 'Not available'}</p>
                <p className="hotel-details-card__about">About Pricing:{about}</p>
            </div>
            <div>
                <button onClick={handleClick}>Book Now</button>
            </div>
        </div>
    )
}

export default HotelDetailsCard