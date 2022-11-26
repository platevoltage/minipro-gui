import React from 'react'
import "./TL866.css";



export default function TL866() {
  return (
    <div className="body">
      <div className="zif">
        <div className="pin-row left">
            {[...Array(20)].map((_, index) =>
                <div className="pin" key={index}></div>
            )}
        </div>
        <div className="pin-row right">
            {[...Array(20)].map((_, index) =>
                <div className="pin" key={index}></div>
            )}
        </div>
        <div className="chip">
            <div className="notch"></div>   
        </div>

      </div>

      <div className="vents">
            {[...Array(6)].map((_, index) =>
                <div className="vent" key={index}></div>
            )}
      </div>
    </div>
  )
}
