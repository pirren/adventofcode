![Continuous](https://github.com/pirren/adventofcode/actions/workflows/continuous.yml/badge.svg)

# Advent of Code
Solving [Advent of Code](http://adventofcode.com) puzzles.

## Table of Contents
1. [Setup](#setup)
2. [Local Environment](#local-environment)
3. [NPM Scripts](#npm-scripts)

---

## Setup
To get started with this project, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 20.x recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Optional: Visual studio code [VSCode](https://code.visualstudio.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pirren/adventofcode.git
   cd adventofcode
   ```
2. Install dependencies using `npm install`
3. **You're ready to solve puzzles!**
4. Optional: Install OpenSSL on local machine if you want to use encrypted input data files. Advent of Code is against uploading personalized puzzle input to storage such as Github.
   Easiest way is to install [Chocolatey](https://chocolatey.org/install) and run:
  ```ps
  choco install openssl 
   ```

--- 

## Local Environment
Local environment must be set up to support functions such as Leaderboard as well as crypto functions. 
To benefit from these create a file called `.env` in project root and enter the following:
```
AOC_SESSION=''
LEADERBOARD_ID=''
INPUT_DECRYPTION_KEY=''
```
1. `AOC_SESSION` stores your Advent of code session cookie. It is used to authenticate your requests and fetch leaderboard data.
2. `LEADERBOARD_ID` stores the unique ID of the leaderboard you are using.
3. `INPUT_DECRYPTION_KEY` stores the encryption/decryption key used by OpenSSL.

---

## NPM Scripts
The project includes several npm scripts:
| Script                         | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `npm run start`                | Run a specific solution                       |
| `npm run setup`                | Setup a given year/day                        |
| `npm run test`                 | Run all tests                                 |
| `npm run encrypt`              | Encrypts all non-encrypted input files        |
| `npm run decrypt`              | Decrypts all encrypted input files            |
| `npm run leaderboard`          | Displays a given leaderboard                  |

### Setup
To run specific solution(year/day/part): 
```bash
npm run start 2015 10 1
```

### Setup
To set up environment for a new puzzle(year/day):
```bash
npm run setup 2015 10
```

### Setup
Runs all tests:
```bash
npm run test
```

### Encrypt
Encrypts all (`.txt`, `.json`) files found in solution folders but skips already encrypted files:
```bash
npm run encrypt
```

### Encrypt
Decrypts all encrytped (`.enc`) files found in solution folders:
```bash
npm run decrypt
```

### Leaderboard
Shows the leaderboard of a given year:
```bash
npm run leaderboard 2015
```
