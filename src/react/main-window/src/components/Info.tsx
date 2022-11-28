import { useEffect, useState } from 'react';
import { getSupportedDevices, readDevice, getInfo, getPackageType } from '../utils/api';
import { IOptions } from './Options';
import './Info.css';

interface Props {
  setHexEditorFile: Function;
  setTerminalText: Function;
  terminalText: string;
  setOptions: Function;
  options: IOptions;
}

export default function Info({setHexEditorFile, setTerminalText, terminalText, setOptions, options}: Props) {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [chipInfo, setChipInfo] = useState({});

  useEffect(() => {
    getSupportedDevices(setDevices, setSelectedDevice);
  }, []);

  useEffect(() => {
    const _filteredDevices = devices.filter((device: string) => {
      return device.toLowerCase().includes(filter.toLowerCase()); 
    });
    const _selectedDevice = _filteredDevices[0];
    setFilteredDevices(_filteredDevices);
    setSelectedDevice(_selectedDevice);
    setOptions({...options, selectedDevice: _selectedDevice});
    (async() => {
      if (_selectedDevice) setChipInfo(await getInfo(selectedDevice, setTerminalText, terminalText))
    })();
  }, [devices, filter]);

  useEffect(() => {
    setOptions({...options, selectedDevice: selectedDevice});
    (async() => {
      if (selectedDevice) setChipInfo(await getInfo(selectedDevice, setTerminalText, terminalText))
    })();
  }, [selectedDevice]);
  

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

        <button onClick={() => readDevice(selectedDevice, options.isForced, setHexEditorFile, setTerminalText, terminalText)}>Read</button>

        <button onClick={async () => {
          console.log(await getInfo(selectedDevice, setTerminalText, terminalText))
          
          }}>Info</button>

        <>{JSON.stringify(chipInfo)}</>






    </div>
  )
}
