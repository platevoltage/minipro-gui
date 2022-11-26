import { useState, useMemo, useCallback } from 'react';
import HexEditor from 'react-hex-editor';
import oneDarkPro from 'react-hex-editor/themes/oneDarkPro';


export default function HexWindow() {
    const file = `ddddddè;éé¼éÆéxè<è±è½èõèüéé
    éééGéNéUé\écéjéqééÉéÎéÓéØéÝéâêMêRêWê\êaêfê`
    // `data` contains the bytes to show. It can also be `Uint8Array`!
    const data = useMemo(() => file.split("").map((byte) => byte.charCodeAt(0)), []);
    // If `data` is large, you probably want it to be mutable rather than cloning it over and over.
    // `nonce` can be used to update the editor when `data` is reference that does not change.
    const [nonce, setNonce] = useState(0);
    // The callback facilitates updates to the source data.
    const handleSetValue = useCallback((offset: number, value: number) => {
      data[offset] = value;
      setNonce(v => (v + 1));
    }, [data]);

  return (
    
        <HexEditor
            // columns={0x10}
            data={data}
            nonce={nonce}
            onSetValue={handleSetValue}
            theme={{ hexEditor: oneDarkPro }}
            showAscii={true}
            showRowLabels={true}
        />
    
  )
}
