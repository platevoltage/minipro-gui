
import './App.css';
import TL866 from './components/TL866';
import HexWindow from './components/HexWindow';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

declare global {
  interface Window {
      api? : any
  }
}

function App() {
  const [hexEditorFile, setHexEditorFile] = useState(Buffer.from("test"));

  
  useEffect(() => {
    window.api.readData().then((result: any) => setHexEditorFile(result));
  },[])

  return (
    <div>
      <HexWindow file={hexEditorFile}/>
      <div className="programmer-container">
        {/* <TL866 /> */}
      </div>
    </div>
  );
}

export default App;
