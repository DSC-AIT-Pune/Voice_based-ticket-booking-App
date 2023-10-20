import '../styles/components/Landing.css'

export default function Landing(props){
    return(
        <div className="landing-container">
        <div className="landing-top">
          <div className="landing-text">
              <span className="purple">Udchalein</span>
              <h1 className="landing-header">"Fly with ease, book with voice."</h1>
          </div>
          <div className="image-container">
          <img src="/booking.png" alt="" className="landing-image" />
          </div>
      
          </div>
            <button className="landing-btn" onClick={props.state}>Let's go!</button>
      </div>
    )
}