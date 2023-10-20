import React from 'react'
import '../styles/components/commands.css'
import commands from '../data/commands'

function Commands() {

    return (
        <div className='commandsContainer'>
            <label>
                Voice Commands
            </label>
            {commands.map((command,index) => {
                return (
                    <div className='commands' key={index}>
                        {command.dialog}
                    </div>
                )
            })}
        </div>
    )
}

export default Commands