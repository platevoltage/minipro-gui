import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);

async function listDevices() {
    const { stdout } = await exec(`minipro -l -q TL866A`);
    console.log(stdout);
}

async function getDeviceInfo(device: string) {
    const { stderr } = await exec(`minipro -d ${device} -q TL866A`);
    console.log(stderr);
}

getDeviceInfo("SST29SF512");
// listDevices();