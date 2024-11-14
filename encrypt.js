
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import os from 'os';
import { execSync } from 'child_process'

const algorithm = 'aes-256-cbc'

dotenv.config() // Reads the .env file and merges it into process.env

let currentYear = new Date().getFullYear()

const { INPUT_DECRYPTION_KEY } = process.env

const isDirectory = dirPath => fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

function encryptFile(filePath) {
    const input = fs.readFileSync(filePath); // Read the file content

    // Create a temporary file to store the base64-encoded content
    const tempBase64File = path.join(os.tmpdir(), `${path.basename(filePath)}.base64`);
    const encryptedFilePath = `${filePath}.enc`;
  
    try {
      console.log(`Encrypting ${filePath}...`);
  
      // Create the base64-encoded file
      fs.writeFileSync(tempBase64File, input.toString('base64'));
  
      // Run OpenSSL command to encrypt the file using aes-256-cbc, using the base64-encoded file as input
      execSync(`openssl enc -${algorithm} -e -base64 -pbkdf2 -k "${INPUT_DECRYPTION_KEY}" -in "${tempBase64File}" -out "${encryptedFilePath}"`);
  
      console.log(`Encrypted ${filePath} to ${encryptedFilePath}`);
  
      // Remove the temporary base64 file
      fs.unlinkSync(tempBase64File);
    } catch (error) {
      console.error(`Failed to encrypt ${filePath}: ${error.message}`);
    }
}


function encryptAllFiles() {
    
    _.range(2015, currentYear + 1).forEach(year => {
        let yearFolder = year.toString();
        if (isDirectory(yearFolder)) {
            const subFolders = fs.readdirSync(yearFolder).filter(subFolder => {
                const subFolderPath = path.join(yearFolder, subFolder);
                return isDirectory(subFolderPath);
            });

            subFolders.forEach(subFolder => {
                const subFolderPath = path.join(yearFolder, subFolder);
                
                const txtFiles = fs.readdirSync(subFolderPath).filter(file => file.endsWith('.txt')).map(x => path.join(subFolderPath, x));

                txtFiles.forEach(encryptFile);
            });
        }
    });
}

encryptAllFiles();
