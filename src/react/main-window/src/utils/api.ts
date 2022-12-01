

export function getSupportedDevices(setDevices: Function, setSelectedDevice: Function) {
    window.api.getSupportedDevices().then((result: any) => {
        const deviceList = result.stdout.split("\n")
        setDevices(deviceList);
        setSelectedDevice(deviceList[0]);
    }); 
}

export function getPackageType(device: string) {
    const packageType = getInfo(device)
    console.log( packageType );
}

export async function getInfo(selectedDevice: string, setTerminalText?: Function, terminalText?: string) {
    return window.api.getInfo(selectedDevice).then((result: any) => {
        let newText = "";
        const info = result.stderr;

        newText +=  result.execString + "\n" + info + "\n";
        if (!("err" in result)) {
            newText += "done \n\n";
            if (setTerminalText) setTerminalText(terminalText + newText);
            return parseJSON(info);
        } else {
            newText += result.err + "\n";
            if (setTerminalText) setTerminalText(terminalText + newText);
            return "error";
        }

    }); 

}
//figure out how to read fuse file!!!! don't forget!
export function readDevice(selectedDevice: string, isForced: boolean, setHexEditorFile: Function, setTerminalText: Function, terminalText: string) {
    window.api.readData(selectedDevice, isForced).then((result: any) => {
        let newText = "";
        console.log(result);
        newText +=  result.execString + "\n";
        if (!("err" in result)) {
            setHexEditorFile(result.file);
            console.log(result.file);
            newText += "done \n\n";
        } else {
            newText += result.err + "\n";
        }
        setTerminalText(terminalText + newText);
    });
}
export function writeDevice(file: Buffer, selectedDevice: string, isForced: boolean, setTerminalText: Function, terminalText: string) {
    window.api.writeData(file, selectedDevice, isForced).then((result: any) => {
        let newText = "";
        console.log(result);
        newText +=  result.execString + "\n";
        if (!("err" in result)) {
            // setHexEditorFile(result.file);
            // console.log(result.file);
            newText += "done \n\n";
        } else {
            newText += result.err + "\n";
        }
        setTerminalText(terminalText + newText);
    });
}

export function saveFile(file: Buffer) {
    window.api.saveFile(file).then((result: any) => {});
}



function parseJSON(input: string) {
    const lines = input.split("\n");
    const object = Object();
    for (let line of lines) {
        const keyValuePair = line.split(":");
        const key = keyValuePair[0];
        const value = keyValuePair[1];
        object[key as keyof typeof object] = value;
    }
    return object;
}