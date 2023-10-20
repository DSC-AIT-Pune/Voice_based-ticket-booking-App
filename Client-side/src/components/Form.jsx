import React, { useRef, useState } from 'react';
import '../styles/components/form.css'
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useNavigate } from 'react-router-dom';

function Form() {
    const firstNameRef = useRef();
    const destinationRef = useRef();
    const checkIndateRef = useRef();
    const noOfGuestsRef = useRef();
    const phoneNoRef = useRef();
    const emailAddressRef = useRef();

    const [checked, setChecked] = useState(false);
    console.log({ checked })

    const navigate = useNavigate();

    React.useEffect(() => {
        if (checked) {
            console.log("listening for speech recognition")
            SpeechRecognition.startListening({ continuous: true })
        }
        if (!checked) {
            console.log("stopped listening for speech recognition")
            SpeechRecognition.stopListening()
        }
    }, [checked])

    const clickedmic = () => {
        setChecked(!checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // perform validation
        const firstName = firstNameRef.current.value.trim();
        const Destination = destinationRef.current.value.trim();
        const checkInDate = checkIndateRef.current.value.trim();
        const NoOfGuests = noOfGuestsRef.current.value.trim();
        const PhoneNo = phoneNoRef.current.value.trim();
        const EmailAddress = emailAddressRef.current.value.trim();

        if (firstName === '') {
            alert('Please enter your first name.');
            return;
        }
        if (Destination === '') {
            alert('Please enter the Destination.');
            return;
        }
        if (checkInDate === '') {
            alert('Please enter the check In Date.');
            return;
        }
        if (NoOfGuests === '') {
            alert('Please enter the No Of Guests.');
            return;
        }
        if (PhoneNo.length > 15) {
            alert('Phone number cannot be greater than 10 digits.');
            return;
        }
        if (EmailAddress === '') {
            alert('Please enter the EmailAddress.');
            return;
        }

        navigate(`/hotels/${firstName}/${EmailAddress}/${checkInDate}/${Destination}/${NoOfGuests}/${PhoneNo}`);

        // reset the form
        event.target.reset();
    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    const commands = [
        {
            command: 'My name is *',
            callback: (username) => {
                console.log(username);
                firstNameRef.current.value = username
            }
        },
        {
            command: 'I want to go to *',
            callback: (userDestination) => destinationRef.current.value = userDestination
        },
        {
            command: 'I want to book hotel from *',
            callback: (userTravelDate1) => checkIndateRef.current.value = userTravelDate1
        },
        {
            command: 'we are * people',
            callback: (userGuest) => noOfGuestsRef.current.value = userGuest
        },
        {
            command: 'My phone number is *',
            callback: (userPhoneNumber) => phoneNoRef.current.value = userPhoneNumber
        },
        {
            command: 'My email address is *',
            callback: (useremailAddress) => emailAddressRef.current.value = useremailAddress
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
    console.log(transcript);
    React.useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return null
        }
    }, [])

    return (
        <div className='mainhome-both'>
            <div>
                {transcript}
            </div>
            <div className='input-form'>
             <p className='form-title'>Enter Your Details Here!</p> 
                <form onSubmit={handleSubmit} className="formContainer">
                    <div>
                        <label htmlFor="firstName">Name:</label>
                        <input type="text" id="firstName" placeholder="(Ex. firstName...)" ref={firstNameRef} value={firstNameRef.current?.value} />
                    </div>
                    <div>
                        <label htmlFor="destination">Destination:</label>
                        <input type="text" id="Destination" placeholder="(Ex. End point...)" ref={destinationRef} value={destinationRef.current?.value} />
                    </div>
                    <div>
                        <label htmlFor="checkInDate">Hotel Check-In Date:</label>
                        <input type="" id="checkInDate" placeholder="(Ex. check In Date...)" ref={checkIndateRef} value={checkIndateRef.current?.value} />
                    </div>
                    <div>
                        <label htmlFor="noOfGuests">No. of Guests:</label>
                        <input type="number" id="NoOfGuests" placeholder="(Ex. NoOfGuests...)" ref={noOfGuestsRef} value={noOfGuestsRef.current?.value} />
                    </div>
                    <div>
                        <label htmlFor="phoneNo">Phone No.:</label>
                        <input type="tel" id="PhoneNo" placeholder="(Ex. PhoneNo...)" ref={phoneNoRef} value={phoneNoRef.current?.value} />
                    </div>
                    <div>
                        <label htmlFor="emailAddress">Email Address:</label>
                        <input type="" id="EmailAddress" placeholder="(Ex. ajaysingh1234@gmail....)" ref={emailAddressRef} value={emailAddressRef.current?.value} />
                    </div>
                    <button type="submit">Submit</button>
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                            label="Mic"
                            checked={checked} onClick={clickedmic}
                        />
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}

export default Form
