
import './App.css';
import TL866 from './components/TL866';
import HexWindow from './components/HexWindow';
import { XTerm } from 'xterm-for-react'
import Nav from './components/Nav';
import Info from './components/Info';
import Options from './components/Options';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Buffer } from 'buffer';

declare global {
  interface Window {
      api? : any
  }
}

function App() {
  const [hexEditorFile, setHexEditorFile] = useState(
    Buffer.allocUnsafe(512).fill(Buffer.from('00','hex'))
  );
  const xtermRef = useRef() as MutableRefObject<any>

  useEffect(() => {
    //temporary
    window.api.readData().then((result: any) => setHexEditorFile(result));
    xtermRef.current.terminal.writeln("Hello, World!")
  },[])


  return (
    <main>
      <Nav />
      <Info />
      <div className="row">
        <HexWindow file={hexEditorFile}/>
        <XTerm ref={xtermRef}/>
      </div>
      <Options />
      {/* <div className="programmer-container"> */}
        {/* <TL866 /> */}
      {/* </div> */}
    </main>
  );
}

export default App;
