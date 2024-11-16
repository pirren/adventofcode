// Description: Script entrypoint for decryption/encryption of files.
import { encryptFiles, decryptFiles } from '../core/fileCrypto.js';

const action = process.argv[2] || 'both';
if (action === 'both') {
    decryptFiles();
    encryptFiles();
}
if (action === 'encrypt') {
    encryptFiles();
}
if (action === 'decrypt') {
    decryptFiles();
}