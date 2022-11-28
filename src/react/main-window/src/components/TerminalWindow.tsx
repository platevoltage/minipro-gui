import { MutableRefObject, useEffect, useRef, useState } from 'react'

import "./TerminalWindow.css";

interface Props {
  text: string;
}
export default function TerminalWindow({text}: Props) {
  const bottomRef = useRef() as MutableRefObject<HTMLDivElement>;;

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [text]);

  return (
    <div id="terminal-container">
      <pre><code>
        {text}
      </code></pre>


      <div ref={bottomRef} />
    </div>
  )
}
