import '../styles/components/Display.css'
import Commands from '../components/Commands'
import Form from '../components/Form'

export default function Display(){
    return(
    <div className="display-body">
        {/* <video src="/flight-video.mp4" autoPlay muted loop ></video> */}
        <div className='sampleCommands'>
            <Commands/>
        </div>
        <div className='home-inputForm'>
            <Form/>
        </div>
    </div>
    )
}