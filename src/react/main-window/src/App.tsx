
import './App.css';
import TL866 from './components/TL866';
import HexWindow from './components/HexWindow';
import WriteDialog from './components/WriteDialog';
import Nav from './components/Nav';
import Info from './components/Info';
import Divider from './components/Divider';
import Options, { IOptions } from './components/Options';
import { MutableRefObject, useRef, useState, MouseEvent } from 'react';
import { Buffer } from 'buffer';
import TerminalWindow from './components/TerminalWindow';

const dividerWidth = 4;

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

  const [terminalText, setTerminalText] = useState("");
  const [cursor, setCursor] = useState("default");
  const [options, setOptions] = useState<IOptions>({
    selectedDevice: "",
    isForced: false,
  });
  // const memory = +(options.chipInfo?.Memory.split(" ")[1] || 0);
  const [hexEditorFile, setHexEditorFile] = useState(
    Buffer.allocUnsafe(256).fill(Buffer.from('00','hex'))
  );

  const [hexWidth, setHexWidth] = useState(500);
  const [updateHexWindowWidth, setUpdateHexWindowWidth] = useState({});
  const [terminalWidth, setTerminalWidth] = useState(500);
  const [programmerWidth, setProgrammerWidth] = useState(500);
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");


  const handleDrag = (e: MouseEvent<HTMLDivElement>, element: string) => {
    e.preventDefault();

    const _programmerWidth = programmerRef.current.getBoundingClientRect().width;
    const _hexWidth = hexRef.current.getBoundingClientRect().width;
    // const terminalWidth = terminalRef.current.getBoundingClientRect().width;
    const _rowWidth = rowRef.current.getBoundingClientRect().width;
    
    const mouseMove = (e: {clientX: number}) => {

      setCursor("col-resize");
      switch (element) {
        case "hex": 
          setHexWidth(e.clientX+dividerWidth); 
          if (e.clientX >=0) setTerminalWidth(_rowWidth-e.clientX-_programmerWidth-dividerWidth);
          break;
        case "terminal": 
          setProgrammerWidth(_rowWidth-e.clientX-dividerWidth)
          if (e.clientX < _rowWidth - 30) setTerminalWidth(e.clientX - _hexWidth+dividerWidth); 
          break;
      
      }
    }

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      setCursor("default");
      setUpdateHexWindowWidth({});
    }
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    
  };


  return (
    <main style={{cursor}}>
      <Nav setHexEditorFile={setHexEditorFile} hexEditorFile={hexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText} setShowWriteDialog={setShowWriteDialog} showWriteDialog={showWriteDialog}/>
      <Info setHexEditorFile={setHexEditorFile} hexEditorFile={hexEditorFile} setTerminalText={setTerminalText} terminalText={terminalText} setOptions={setOptions} options={options} setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice}/>

      <div className="row" ref={rowRef}>

        <div className="hex-container" style={{width: `${hexWidth}px`}} ref={hexRef}>
          { showWriteDialog ?
              <WriteDialog file={hexEditorFile} selectedDevice={selectedDevice} setTerminalText={setTerminalText} terminalText={terminalText} options={options}/> :
              <HexWindow file={hexEditorFile} width={hexWidth} update={updateHexWindowWidth}/> 
          }
        </div>
        <Divider handleDrag={handleDrag} component="hex" width={dividerWidth} />
        

        <div className="terminal-container" style={{width: `${terminalWidth}px`}} ref={terminalRef}>
          <TerminalWindow text={terminalText}/>
        </div>
        <Divider handleDrag={handleDrag} component="terminal" width={dividerWidth} />


        <div className="programmer-container" style={{width: `${programmerWidth}px`}} ref={programmerRef}>
          <TL866 options={options}/>
        </div>

      </div>


      <Options options={options} setOptions={setOptions}/>

    </main>
  );
}

export default App;
