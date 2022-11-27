import React from 'react'
import "./TL866.css";

interface Props {
  selectedDevice: string;
}

export default function TL866({selectedDevice}:Props) {
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
      
            <div className="label">{selectedDevice}</div>
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
