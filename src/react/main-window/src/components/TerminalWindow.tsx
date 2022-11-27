import { useEffect, useState } from 'react'

import "./TerminalWindow.css";

interface Props {
  text: string;
}
export default function TerminalWindow({text}: Props) {





  return (
    <div id="terminal-container">
      <pre><code>
        {text}
      </code></pre>
    </div>
  )
}
