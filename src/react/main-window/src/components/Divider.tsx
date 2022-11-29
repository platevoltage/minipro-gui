import React from 'react';
import "./Divider.css";

interface Props {
    handleDrag: Function
    component: string
    width: number
}

export default function Divider({handleDrag, component, width}: Props) {
  return (
    
      <div style={{width: `${width}px`}} className="divider" draggable onMouseDown={(e) => handleDrag(e, component)}></div>
    
  )
}
