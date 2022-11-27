import React, { useState } from 'react'
import './Info.css';

interface Props {
  setTerminalText: Function;
  terminalText: string;
}

export default function Info({setTerminalText, terminalText}: Props) {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState("");
  

  return (
    <div className="info-container">
        <button onClick={() => {
            window.api.getSupportedDevices().then((result: any) => {
              setDevices(result.stdout.split("\n"));
            });
        }}>Refresh Devices</button>
 
        <select id="chip-select" name="chip-select">
          <>{ devices.filter((device: string) => {
              return device.includes(filter); 
            }).map((device: any, index: number) => {
              return <option key={index} value={device}>{device}</option>
            })
          }</>
        </select>

        <input type="text" onChange={(e) => {
          e.preventDefault();
          setFilter(e.target.value);
        }}>

        </input>



    </div>
  )
}
