import { useEffect, useState, useMemo } from 'react';
import { getSupportedDevices, readDevice, getInfo, writeDevice } from '../utils/api';
import { IOptions } from './Options';
import './Info.css';

interface Props {
  setHexEditorFile: Function;
  setTerminalText: Function;
  terminalText: string;
  setOptions: Function;
  options: IOptions;
  hexEditorFile: Buffer;
  setSelectedDevice: Function;
  selectedDevice: string;
}

export default function Info({setHexEditorFile, hexEditorFile, setTerminalText, terminalText, setOptions, options, setSelectedDevice, selectedDevice}: Props) {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [filter, setFilter] = useState("");

  const memoizedMenu = useMemo(() => {
    return (<>
      {filteredDevices.map((device: any, index: number) => {
        return <option key={index} value={device}>{device}</option>
      })}
    </>)
  }, [filteredDevices])


  useEffect(() => {
    getSupportedDevices(setDevices, setSelectedDevice);
  }, []);

  useEffect(() => {
    (async() => {
      if (selectedDevice) {
        const chipInfo = await getInfo(selectedDevice)
        setOptions({...options, selectedDevice: selectedDevice, chipInfo});
      } else {
        setOptions({...options, selectedDevice: selectedDevice, chipInfo: null});
      }
    })();
  }, [selectedDevice]);
  
  useEffect(() => {
    const _filteredDevices = devices.filter((device: string) => {
      return device.toLowerCase().includes(filter.toLowerCase()); 
    });
    const _selectedDevice = _filteredDevices[0];
    setFilteredDevices(_filteredDevices);
    setSelectedDevice(_selectedDevice);
    (async() => {
      if (selectedDevice) {
        const chipInfo = await getInfo(selectedDevice)
        setOptions({...options, selectedDevice: _selectedDevice, chipInfo});
      } else {
        setOptions({...options, selectedDevice: _selectedDevice, chipInfo: null});
      }
    })();
  }, [devices, filter]);
  
  return (
    <div className="info-container">
        <button onClick={() => getSupportedDevices(setDevices, setSelectedDevice)}>Refresh Devices</button>
 
        <select id="chip-select" name="chip-select" onChange={(e) => setSelectedDevice(e.target.value)} value={selectedDevice}>
          <>{ filteredDevices.length>0 ?
                <>{memoizedMenu}</>
                :
                <option>No Matches</option>

          }</>
        </select>

        <input type="text" onChange={(e) => setFilter(e.target.value)}></input>

        <button disabled={!!!selectedDevice} onClick={() => readDevice(selectedDevice, options.isForced, setHexEditorFile, setTerminalText, terminalText)}>Read</button>

        <button onClick={async () => {
          console.log(await getInfo(selectedDevice, setTerminalText, terminalText))
          
          }}>Info</button>

        {/* <button onClick={() => writeDevice(hexEditorFile, selectedDevice, options.isForced, setTerminalText, terminalText)}>Write</button> */}

    </div>
  )
}
