import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);

async function listDevices() {
    const { stdout } = await exec(`minipro -l`);
    console.log(stdout);
}

listDevices();