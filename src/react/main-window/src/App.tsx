
import './App.css';
import TL866 from './components/TL866';
import HexWindow from './components/HexWindow';
import Nav from './components/Nav';
import Info from './components/Info';
import Options, { IOptions } from './components/Options';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Buffer } from 'buffer';
import TerminalWindow from './components/TerminalWindow';

declare global {
  interface Window {
      api? : any
  }
}

function App() {
  const [hexEditorFile, setHexEditorFile] = useState(
    Buffer.allocUnsafe(512).fill(Buffer.from('00','hex'))
  );
  const [terminalText, setTerminalText] = useState("");
  const [options, setOptions] = useState<IOptions>({
    selectedDevice: "",
    isForced: false,
  });




  return (
    <main>

      <Nav setHexEditorFile={setHexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText}/>
      <Info setHexEditorFile={setHexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText} setOptions={setOptions} options={options}/>
      <div className="row">
        <HexWindow file={hexEditorFile}/>
        <TerminalWindow text={terminalText}/>
        <div className="programmer-container">
          <TL866 selectedDevice={options.selectedDevice}/>
        </div>
      </div>
      <Options options={options} setOptions={setOptions}/>
      {/* <div className="programmer-container"> */}
        {/* <TL866 /> */}
      {/* </div> */}
    </main>
  );
}

export default App;
