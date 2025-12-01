/**
 * fileCrypto.js
 *
 * Description: Encrypts and decrypts files using the aes-256-cbc algorithm.
 */

import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import os from 'os';
import chalk from 'chalk'
import { execSync } from 'child_process'

const algorithm = 'aes-256-cbc'

dotenv.config() // Reads the .env file and merges it into process.env

const { INPUT_DECRYPTION_KEY } = process.env

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

function decryptFile(filePath) {
    const decryptedFilePath = filePath.replace(/\.enc$/, ''); // Remove ".enc" to get the decrypted output path

    try {
        console.log(`Decrypting ${filePath}...`);
        
        // -- Run OpenSSL command to decrypt the file
        execSync(`openssl enc -aes-256-cbc -d -base64 -pbkdf2 -k "${INPUT_DECRYPTION_KEY}" -in "${filePath}" -out "${decryptedFilePath}.b64"`);
        
        console.log(`Decrypted ${filePath} to ${decryptedFilePath}.b64`);

        // -- Read the Base64-decoded file and convert it back to plain text
        const base64Content = fs.readFileSync(`${decryptedFilePath}.b64`, 'utf-8');
        const originalContent = Buffer.from(base64Content, 'base64').toString('utf-8');
        
        // -- Write the final plain text to the desired output file
        fs.writeFileSync(decryptedFilePath, originalContent);
        
        console.log(chalk.green(`Decoded and saved final output to ${decryptedFilePath}`));
        
        // -- Optionally, delete the intermediate .b64 file
        fs.unlinkSync(`${decryptedFilePath}.b64`);

    } catch (error) {
        console.error(`Failed to decrypt ${filePath}: ${error.message}`);
    }
}

// -- Returns all files in solution directories ("./YEAR/DAY/") of types [.txt, .json, .enc]
function getAllFiles() {
    const isDirectory = dirPath => fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
    const isYear = value => /([0-9]{4})/.test(value);
    const isSolutionDataFile = filePath => /\.(txt|json|enc)$/i.test(filePath);

    // -- Loop through each year and day folder
    const root = './';
    return fs.readdirSync(root).filter(isDirectory).filter(isYear).map(year => {
        const subFolders = fs.readdirSync(year).filter(item => {
            const itemPath = path.join(year, item);
            return isDirectory(itemPath);
        });

        return subFolders.map(dayFolder => {
            const subFolderPath = path.join(year, dayFolder);
            return fs.readdirSync(subFolderPath).filter(isSolutionDataFile).map(file => path.join(subFolderPath, file));
        });
    });
}

const encryptedFileTypes = filePath => filePath.endsWith('.enc');
const notEncryptedFileTypes = filePath => /\.(txt|json)$/i.test(filePath);

// -- Decrypts all files with the .enc extension
export function decryptFiles() {
    console.log(chalk.bgCyan('Decrypting files...'));
    const files = getAllFiles().flat(Infinity).filter(encryptedFileTypes);
    files.forEach(decryptFile);
    console.log(chalk.bgCyan('Decryption complete.'));
}

// -- Encrypts all files with the .txt or .json extension (except those that are already encrypted)
export function encryptFiles() {
    console.log(chalk.bgCyan('Encrypting files...'));
    const allFiles = getAllFiles().flat(Infinity);

    // -- Get all encrypted files. No need to encrypt them again
    const encryptedFiles = new Set(
        allFiles.filter(encryptedFileTypes).map(file => file.slice(0, -4)) // Remove the .enc extension
    ); 
    
    // -- Get all files that need to be encrypted (i.e., not already encrypted)
    const filesToEncrypt = allFiles
        .filter(notEncryptedFileTypes)
        .filter(file => !encryptedFiles.has(file)); 

    filesToEncrypt.forEach(encryptFile);
    console.log(chalk.bgCyan('Encryption complete.'));
}
