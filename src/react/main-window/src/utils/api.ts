export function getSupportedDevices(setDevices: Function, setSelectedDevice: Function) {
    window.api.getSupportedDevices().then((result: any) => {
        const deviceList = result.stdout.split("\n")
        setDevices(deviceList);
        setSelectedDevice(deviceList[0]);
    }); 
}

export function getInfo(selectedDevice: string, setTerminalText: Function, terminalText: string) {
    window.api.getInfo(selectedDevice).then((result: any) => {
        let newText = "";
        const info = result.stderr;
        // const deviceList = result.stdout.split("\n")
        // setSelectedDevice(deviceList[0]);
        newText +=  result.execString + "\n" + info + "\n";
        if (!("err" in result)) {
            // setHexEditorFile(result.file);
            newText += "done \n\n";
        } else {
            newText += result.err + "\n";
        }
        setTerminalText(terminalText + newText);
    }); 
}

export function readDevice(selectedDevice: string, isForced: boolean, setHexEditorFile: Function, setTerminalText: Function, terminalText: string) {
    window.api.readData(selectedDevice, isForced).then((result: any) => {
        let newText = "";
        console.log(result);
        newText +=  result.execString + "\n";
        if (!("err" in result)) {
            setHexEditorFile(result.file);
            newText += "done \n\n";
        } else {
            newText += result.err + "\n";
        }
        setTerminalText(terminalText + newText);
    });
}