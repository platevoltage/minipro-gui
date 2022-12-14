import { useState, useMemo, useCallback } from 'react';
import HexEditor from 'react-hex-editor';
import oneDarkPro from 'react-hex-editor/themes/oneDarkPro';
import './HexWindow.css';

interface Props {
  file: Uint8Array;
  width: number;
  update: {};
  
}

export default function HexWindow({ file, width, update }: Props) {
    const _file = useMemo(() => file, [file]);
    const _width = useMemo(() => width,[update])
    // `data` contains the bytes to show. It can also be `Uint8Array`!
    // const data = useMemo(() => file.split("").map((byte) => byte.charCodeAt(0)), []);
    // If `data` is large, you probably want it to be mutable rather than cloning it over and over.
    // `nonce` can be used to update the editor when `data` is reference that does not change.
    const [nonce, setNonce] = useState(0);
    // The callback facilitates updates to the source data.
    const handleSetValue = useCallback((offset: number, value: number) => {
      _file[offset] = value;
      setNonce(v => (v + 1));
    }, [_file]);
    console.log(width);

  return (
    <div style={{height: "100%", width: "100%", maxWidth: `${_width}px`, minWidth: `${_width}px`}}>

        <HexEditor
            // columns={0x10}
            data={_file}
            nonce={nonce}
            onSetValue={handleSetValue}
            theme={{ hexEditor: oneDarkPro }}
            showAscii={true}
            showRowLabels={true}
            overscanCount={10}
            />
    </div>
    
  )
}
