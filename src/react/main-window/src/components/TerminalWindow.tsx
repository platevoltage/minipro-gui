import { useEffect } from 'react'
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import "xterm/css/xterm.css";
import "./TerminalWindow.css";


export default function TerminalWindow() {
  useEffect(() => {
    const term = new Terminal();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal-container') as HTMLElement);
    fitAddon.fit();

  },[])

  return (
    <div>
      <div id="terminal-container">

      </div>
    </div>
  )
}
