import React from 'react'

function ErorComponent() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: '#f8f8f8'
        }}>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>
                Sorry, we are currently unavailable.<br />Our developers are working hard to scale our system.<br />Please refresh the page It works.<br/>REFRESH
            </h1>
        </div>
    )
}

export default ErorComponent