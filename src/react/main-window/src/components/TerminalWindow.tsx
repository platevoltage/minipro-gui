import { useEffect, useRef } from 'react'
import "./TerminalWindow.css";

interface Props {
  text: string;
}
export default function TerminalWindow({text}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

      const bottom = (bottomRef.current?.getBoundingClientRect().height || 0);
      console.log(bottom);
      containerRef.current?.scrollTo({top: bottom || 0, behavior: "smooth"});
      
  }, [text]);
    


  return (
    <div ref={containerRef} style={{width: "100%"}}>
        
      <div ref={bottomRef}>
      <pre><code>
        {text}
      </code></pre>
      </div>

    </div>
  )
}
