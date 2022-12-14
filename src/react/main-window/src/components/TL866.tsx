import React from 'react'
import "./TL866.css";
import { IOptions } from './Options';

interface Props {
  options: IOptions;
}

export default function TL866({options}:Props) {
  const packageType = options.chipInfo?.Package;
  const pinCount = +(options.chipInfo?.Package.match(/\d/g)!.join("") || 0) / 2;


  console.log(packageType, pinCount, options)
  return (
    <div className="body">
      <div className="zif">
        <div className="lock">
          <div className="post">
            <div className="handle"></div>
          </div>
        </div>
        <div className="pin-row left">
            {[...Array(20)].map((_, index) =>
                <div className="pin left" key={index}>
                  {index<pinCount && options.selectedDevice && <div className={`occupied-pin ${packageType}`}></div>}
                </div>
            )}
        </div>
        <div className="pin-row right">
            {[...Array(20)].map((_, index) =>
                <div className="pin right" key={index}>
                  {index<pinCount && options.selectedDevice && <div className={`occupied-pin ${packageType}`}></div>}
                </div>
            )}
        </div>
        {options.selectedDevice && <div className={`chip ${packageType}`}>

            <div className="notch"></div>   
            <div className="dot"></div>   
            <div className="label">{options.selectedDevice.split("@")[0]}</div>
        </div>}

      </div>

      <div className="vents">
            {[...Array(6)].map((_, index) =>
                <div className="vent" key={index}></div>
            )}
      </div>
    </div>
  )
}
