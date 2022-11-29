import React from 'react'
import { writeDevice } from '../utils/api';
import { IOptions } from './Options';

interface Props {
    file: Buffer;
    selectedDevice: string;
    options: IOptions;
    setTerminalText: Function;
    terminalText: string;
}

export default function WriteDialog({file, selectedDevice, options, setTerminalText, terminalText}:Props) {
  return (
    <div>
      <button onClick={() => writeDevice(file, selectedDevice, options.isForced, setTerminalText, terminalText)}>Write</button>
    </div>
  )
}
