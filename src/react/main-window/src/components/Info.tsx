import React, { useState } from 'react'
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
  

  return (
    <div className="info-container">
        <button onClick={() => {
            window.api.getSupportedDevices().then((result: any) => {
              setDevices(result.stdout.split("\n"));
            });
        }}>Refresh Devices</button>
 
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

        <input type="text" onChange={(e) => {
          e.preventDefault();
          setFilter(e.target.value);
        }}>

        </input>

        <button onClick={() => {
            window.api.readData(selectedDevice, isForced).then((result: any) => {
                let newText = "";
                console.log(result);
                newText +=  result.execString + "\n";
                if (!("err" in result)) {
                    setHexEditorFile(result.file);
                    newText += "done \n";
                } else {
                    newText += result.err + "\n";
                }
                setTerminalText(terminalText + newText);
              });
        }}>Read</button>

      <input type="checkbox" id="force" name="force" value="true" onChange={(e) => {
        setIsForced(e.target.checked);
      }}/>
      <label htmlFor="force">Force</label>





    </div>
  )
}
