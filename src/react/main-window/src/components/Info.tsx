import { useEffect, useState } from 'react';
import { getSupportedDevices, readDevice } from '../utils/api';
import './Info.css';

interface Props {
  setHexEditorFile: Function;
  setTerminalText: Function;
  terminalText: string;
}

export default function Info({setHexEditorFile, setTerminalText, terminalText}: Props) {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [isForced, setIsForced] = useState(false);

  useEffect(() => {
    getSupportedDevices(setDevices, setSelectedDevice);
  }, []);

  useEffect(() => {
    setFilteredDevices(devices.filter((device: string) => {
      return device.toLowerCase().includes(filter.toLowerCase()); 
    }));
    setSelectedDevice(filteredDevices[0]);
  }, [devices, filter, filteredDevices]);
  

  return (
    <div className="info-container">
        <button onClick={() => getSupportedDevices(setDevices, setSelectedDevice)}>Refresh Devices</button>
 
        <select id="chip-select" name="chip-select" onChange={(e) => setSelectedDevice(e.target.value)}>
          <>{ 
              filteredDevices.map((device: any, index: number) => {
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
