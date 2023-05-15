import React from 'react'
import './PageNotFoundStyle.css'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

    const navigate=useNavigate()

    return (
        <div className='ErrorPageBody'>
            <h1>CODERHUB</h1>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <button className="more-link" onClick={()=>navigate('/')}>
                    Back Home
                </button>
            </div>
        </div>
    )
}

export default PageNotFound