# ETH Transaction Crawler

This is a simple web application that allows you to fetch transactions for a given ERC-20 address on the ETH blockchain.
The data is displayed in some sort of table with data cards and includes pagination at the top.

**Quick Start:**
- Clone the repository
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server
- Open your browser and navigate to `http://localhost:5173`
- You can also view the app on your mobile by navigating to `http://192.168.1.68:5173/` - CHECK IN TERMINAL WHEN RUNNING DEV

**Guide (features):**
- Enter a **valid ERC-20 address** in the input field and **block number**(starting block) in the second input field.
- Click **"Get Address Data"** - click **"Reset Params"** to reset the inputs and clear URL params.
- Below you will see the transactions displayed as data cards (10 results). You can navigate between the pages.
- Each card contains: 
  - TX direction - IN / OUT
  - Block number
  - From / To address
  - ETH value
  - Tx Fee
  - Date
- In the header above transactions container, you can see the BALANCE component on the right side. 
  - It shows the current balance of the address for ETH and some predefined ERC-20 tokens (TRAC, USDC, USDT).
  - Changing the date input will fetch the balances for that date.
  - ETH also shows the value in USD (using CoinGecko API).
- Application is responsive so feel free to check it on your mobile device.
- Run `npm run test` to run the unit tests (two unit tests).

**Tech Stack:**
- React
- Vite - for fast development and build
- TypeScript - for type safety
- SCSS (sass) - for styling
- TanStack Query (React Query) - for data fetching, caching and management
- Ethers(v6) - for interacting with the Ethereum blockchain and data validation
- React Router - for routing
- Axios - for HTTP requests

**Project Structure:**

- `main.tsx` - entry point of the application
- `index.scss` - global styles
- `vite.config.ts` - Vite configuration file
- `src/` - contains all the source code
  - `UI/components` - reusable components
  - `api/` - api hooks and fetching functions, models
  - `utils/` - utility functions, constants
  - `test/` - unit tests

## ⚠️ IMPORTANT

This project uses **Etherscan API** endpoints for fetching transactions and block by time.
It also uses **Infura** for fetching address balances.

So, it's important for you to set up API keys and add them to the `.env` file in the root directory of the project.
Create a `.env` file based on the `.env.example` file provided in the root directory.


**I'm happy to provide you with my TEST API keys if you don't have them, just let me know in the email (jaka.pozun2@gmail.com).**

