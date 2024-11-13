
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import crypto from 'crypto'

const algorithm = 'aes-256-cbc'

dotenv.config() // Reads the .env file and merges it into process.env

let currentYear = new Date().getFullYear()

const { INPUT_DECRYPTION_KEY } = process.env

const isDirectory = dirPath => fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

function encryptFile(filePath) {
    const input = fs.readFileSync(filePath);
    const iv = crypto.randomBytes(16); // Generate a random IV for each file
    const key = crypto.scryptSync(INPUT_DECRYPTION_KEY, 'salt', 32); // Derive a key from the password

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]); // Prepend IV to encrypted data

    const encryptedPath = `${filePath}.enc`;
    fs.writeFileSync(encryptedPath, encrypted);

    console.log(`Encrypted ${filePath} -> ${encryptedPath}`);
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
