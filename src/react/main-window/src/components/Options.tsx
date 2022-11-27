import { useState } from 'react'
import './Options.css';


interface Props {
  options: IOptions,
  setOptions: Function
}

export interface IOptions {
  isForced: boolean
}

export default function Options({options, setOptions}:Props) {
  // const [isForced, setIsForced] = useState(false);


  return (
    <div className="options-container">
      <input type="checkbox" id="force" name="force" value={`${options.isForced}`} onChange={(e) => setOptions({...options, isForced: e.target.checked})}/>
      <label htmlFor="force">Force</label>
    </div>
  )
}
