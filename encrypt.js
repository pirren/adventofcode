// Description: Encrypts all input files using aes-256-cbc algorithm.
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import os from 'os';
import { execSync } from 'child_process'

const algorithm = 'aes-256-cbc'

dotenv.config() // Reads the .env file and merges it into process.env

const { INPUT_DECRYPTION_KEY } = process.env

const isDirectory = dirPath => fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
const isYear = value => /([0-9]{4})/.test(value);
const isValidFile = filePath => /\.(txt|json)$/i.test(filePath);
const isEncryptedFile = filePath => filePath.endsWith('.enc');

function encryptFile(filePath) {
    const input = fs.readFileSync(filePath);

    // -- Create a temporary file to store the base64-encoded content
    const tempBase64File = path.join(os.tmpdir(), `${path.basename(filePath)}.base64`);
    const encryptedFilePath = `${filePath}.enc`;
  
    try {
      console.log(`Encrypting ${filePath}...`);
  
      // -- Create the base64-encoded file
      fs.writeFileSync(tempBase64File, input.toString('base64'));
  
      // -- Run OpenSSL command to encrypt the file using aes-256-cbc, using the base64-encoded file as input
      execSync(`openssl enc -${algorithm} -e -base64 -pbkdf2 -k "${INPUT_DECRYPTION_KEY}" -in "${tempBase64File}" -out "${encryptedFilePath}"`);
  
      console.log(`Encrypted ${filePath} to ${encryptedFilePath}`);
  
      // -- Remove the temporary base64 file
      fs.unlinkSync(tempBase64File);
    } catch (error) {
      console.error(`Failed to encrypt ${filePath}: ${error.message}`);
    }
}

// TODO: Implement this function later
function decryptFile(filePath) {
    const decryptedFilePath = filePath.replace(/\.enc$/, ''); // Remove ".enc" to get the decrypted output path
    const decryptionKey = process.env.INPUT_DECRYPTION_KEY || 'your_decryption_key_here'; // Replace with your key or environment variable

    try {
        console.log(`Decrypting ${filePath}...`);
        
        // -- Run OpenSSL command to decrypt the file
        execSync(`openssl enc -aes-256-cbc -d -base64 -pbkdf2 -k "${decryptionKey}" -in "${filePath}" -out "${decryptedFilePath}.b64"`);
        
        console.log(`Decrypted ${filePath} to ${decryptedFilePath}.b64`);

        // -- Read the Base64-decoded file and convert it back to plain text
        const base64Content = fs.readFileSync(`${decryptedFilePath}.b64`, 'utf-8');
        const originalContent = Buffer.from(base64Content, 'base64').toString('utf-8');
        
        // -- Write the final plain text to the desired output file
        fs.writeFileSync(decryptedFilePath, originalContent);
        
        console.log(`Decoded and saved final output to ${decryptedFilePath}`);
        
        // -- Optionally, delete the intermediate .b64 file
        fs.unlinkSync(`${decryptedFilePath}.b64`);

    } catch (error) {
        console.error(`Failed to decrypt ${filePath}: ${error.message}`);
    }
}

function encryptAllInputFiles() {
    // -- Loop through each year and day folder and encrypt input and cache files
    let root = './';
    fs.readdirSync(root).filter(isDirectory).filter(isYear).forEach(year => {
        let subFolders = fs.readdirSync(year).filter(item => {
            const itemPath = path.join(year, item);
            return isDirectory(itemPath);
        });

        subFolders.forEach(dayFolder => {
            const subFolderPath = path.join(year, dayFolder);

            // -- Get all encrypted files. No need to encrypt them again
            let allFiles = fs.readdirSync(subFolderPath);
            const encryptedFiles = new Set(
                allFiles.filter(isEncryptedFile)
                .map(file => path.join(subFolderPath, file)
                .slice(0, -4)) // Remove the .enc extension
            ); 

            // -- Get all files that need to be encrypted
            const filesToEncrypt = allFiles
                .filter(isValidFile)
                .map(file => path.join(subFolderPath, file))
                .filter(file => !encryptedFiles.has(file)); 

            // -- Encrypt each file
            filesToEncrypt.forEach(encryptFile);
        });
    });
}

encryptAllInputFiles();