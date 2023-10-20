import React from 'react'
import '../styles/pages/home.css'
import Landing from '../components/Landing'
import Display from '../components/Display'

export default function Home() {

  const [isTrue, setIsTrue] = React.useState(false)

  function handleTrue(){
    setIsTrue( prevIsTrue => !prevIsTrue)
  }

  return (
    <div className='homepage'>
        {isTrue?<Display/> : <Landing state = {handleTrue}/>}
    </div>
  )
}


