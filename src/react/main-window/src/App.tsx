
import './App.css';
import TL866 from './components/TL866';
import HexWindow from './components/HexWindow';
import Nav from './components/Nav';
import Info from './components/Info';
import Divider from './components/Divider';
import Options, { IOptions } from './components/Options';
import { MutableRefObject, useEffect, useRef, useState, MouseEvent } from 'react';
import { Buffer } from 'buffer';
import TerminalWindow from './components/TerminalWindow';

declare global {
  interface Window {
      api? : any
  }
}

function App() {
  const hexRef = useRef() as MutableRefObject<HTMLDivElement>;
  const terminalRef = useRef() as MutableRefObject<HTMLDivElement>;
  const programmerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const rowRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dividerWidth = 10;

  const [terminalText, setTerminalText] = useState("");
  const [options, setOptions] = useState<IOptions>({
    selectedDevice: "",
    isForced: false,
  });
  // const memory = +(options.chipInfo?.Memory.split(" ")[1] || 0);
  const [hexEditorFile, setHexEditorFile] = useState(
    Buffer.allocUnsafe(256).fill(Buffer.from('00','hex'))
  );

  const [hexWidth, setHexWidth] = useState(500);
  const [terminalWidth, setTerminalWidth] = useState(500);
  const [programmerWidth, setProgrammerWidth] = useState(500);


  const handleDrag = (e: MouseEvent<HTMLDivElement>, element: string) => {
    e.preventDefault();

    const programmerWidth = programmerRef.current.getBoundingClientRect().width;
    const hexWidth = hexRef.current.getBoundingClientRect().width;
    // const terminalWidth = terminalRef.current.getBoundingClientRect().width;
    const rowWidth = rowRef.current.getBoundingClientRect().width;
    
    const mouseMove = (e: {clientX: number}) => {
      switch (element) {
        case "hex": 
          setHexWidth(e.clientX+dividerWidth); 
          setTerminalWidth(rowWidth-e.clientX-programmerWidth-dividerWidth*2);
          break;
        case "terminal": 
          setTerminalWidth(e.clientX - hexWidth+dividerWidth); 
          setProgrammerWidth(rowWidth-e.clientX-dividerWidth*2)
          break;
      }
    }
    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    }
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    
  };


  return (
    <main>
      <Nav setHexEditorFile={setHexEditorFile} hexEditorFile={hexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText}/>
      <Info setHexEditorFile={setHexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText} setOptions={setOptions} options={options}/>

      <div className="row" ref={rowRef}>

        <div className="hex-container" style={{width: `${hexWidth}px`}} ref={hexRef}>
          <HexWindow file={hexEditorFile}/>
        <Divider handleDrag={handleDrag} component="hex" width={dividerWidth} />
        </div>
        
          {/* <div draggable style={{height: '100%', width: "10px", backgroundColor: "blue"}} onMouseDown={(e) => handleDrag(e, "hex")}></div> */}

        <div className="terminal-container" style={{width: `${terminalWidth}px`}} ref={terminalRef}>
          <TerminalWindow text={terminalText}/>
        <Divider handleDrag={handleDrag} component="terminal" width={dividerWidth} />
        </div>


        <div className="programmer-container" style={{width: `${programmerWidth}px`}} ref={programmerRef}>
          <TL866 options={options}/>
        </div>

      </div>


      <Options options={options} setOptions={setOptions}/>

    </main>
  );
}

export default App;
