import React from 'react'
import './Nav.css';


interface Props {
    setHexEditorFile: Function;
    setTerminalText: Function;
    terminalText: string;
}

export default function Nav({setHexEditorFile, setTerminalText, terminalText}: Props) {
  return (
    <div className="nav-container">
      <button onClick={() => {
            window.api.readData().then((result: any) => {
                let newText = "";
                console.log(result);
                newText +=  result.execString + "\n";
                if (!("err" in result)) {
                    setHexEditorFile(result.file);
                    newText += "done" + "\n";
                } else {
                    newText += result.err + "\n";
                }
                setTerminalText(terminalText + newText);
              });
      }}>+</button>
    </div>
  )
}
