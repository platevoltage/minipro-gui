import React from 'react'
import "./TL866.css";



export default function TL866() {
  return (
    <div className="body">
      <div className="zif">
        <div className="pin-row left">
            {[...Array(20)].map((pin, index) =>
                <div className="pin" key={index}></div>
            )}
        </div>
        <div className="pin-row right">
            {[...Array(20)].map((pin, index) =>
                <div className="pin" key={index}></div>
            )}
        </div>
      </div>
    </div>
  )
}
