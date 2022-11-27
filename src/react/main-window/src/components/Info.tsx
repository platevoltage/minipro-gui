import React, { useEffect, useState } from 'react';
import { getSupportedDevices, readDevice } from '../utils/api';
import './Info.css';

interface Props {
  setHexEditorFile: Function;
  setTerminalText: Function;
  terminalText: string;
}

export default function Info({setHexEditorFile, setTerminalText, terminalText}: Props) {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [isForced, setIsForced] = useState(false);

  useEffect(() => {
    getSupportedDevices(setDevices, setSelectedDevice);
  }, [])
  

  return (
    <div className="info-container">
        <button onClick={() => getSupportedDevices(setDevices, setSelectedDevice)}>Refresh Devices</button>
 
        <select id="chip-select" name="chip-select" onChange={(e) => setSelectedDevice(e.target.value)}>
          <>{ 
            devices.filter((device: string) => {
                return device.toLowerCase().includes(filter.toLowerCase()); 
            })
              .map((device: any, index: number) => {
                return <option key={index} value={device}>{device}</option>
              })
          }</>
        </select>

        <input type="text" onChange={(e) => setFilter(e.target.value)}></input>

        <button onClick={() => readDevice(selectedDevice, isForced, setHexEditorFile, setTerminalText, terminalText)}>Read</button>

      <input type="checkbox" id="force" name="force" value="true" onChange={(e) => setIsForced(e.target.checked)}/>
      <label htmlFor="force">Force</label>





    </div>
  )
}
