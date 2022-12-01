import { useRef } from 'react';
import './Nav.css';
import { saveFile } from '../utils/api'


interface Props {
    setHexEditorFile: Function;
    hexEditorFile: Buffer;
    setTerminalText: Function;
    terminalText: string;
    setShowWriteDialog: Function;
    showWriteDialog: boolean;
}


export default function Nav({setHexEditorFile, hexEditorFile, setTerminalText, terminalText, showWriteDialog, setShowWriteDialog}: Props) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  

  return (
    <div className="nav-container">
      {/* <button>Open File</button> */}
      <label className="button file-upload" htmlFor="file"><i className="bi bi-folder2-open"></i></label>
      <input hidden
       ref={fileUploadRef} 
       type="file"
       id="file" name="file"
       accept=".hex, .bin"
       onChange={(e) => {
        const fileList = e.target.files;
        const reader = new FileReader();
        
        if (fileList) {
          reader.readAsArrayBuffer(fileList[0]);
          reader.addEventListener('load', () => {
            const result = reader.result as ArrayBuffer;
            const buffer = new Uint8Array(result)
            console.log(buffer);
            setHexEditorFile(buffer);
            if(fileUploadRef.current) {
              fileUploadRef.current.files = new DataTransfer().files;
              console.log(fileUploadRef.current.files);
            }
          });
        }
        }}>
      </input>
      
      <button onClick={() => saveFile(hexEditorFile)}><i className="bi bi-save"></i></button>
      <button onClick={() => setShowWriteDialog(!showWriteDialog)}><i className="bi bi-cpu"></i></button>
      



    </div>
  )
}
