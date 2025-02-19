# 🚀 DECENTRASEC Uploader with Pinata
## Securely upload, store, and verify research papers using blockchain technology.


## 🛠 Features
✅ Upload PDFs directly to Pinata  
✅ View uploaded files with CIDs and timestamps  
✅ Copy CID to clipboard  
✅ Search & filter uploaded files  
✅ Public/Private file tabs (UI only)  

---

## 📂 **Project Setup (Windows Users)**
Follow these steps to install and run the project **on Windows**.

### **1️⃣ Install Required Dependencies**
Ensure you have the following installed:

- **Node.js & npm** – [Download Here](https://nodejs.org/)
- **Git** – [Download Here](https://git-scm.com/)
- **Foundry (Solidity Compiler & Tools)**

### **2️⃣ Install Foundry (Windows)**
Open **PowerShell** as **Administrator** and run:

```powershell
iwr -useb https://foundry.paradigm.xyz | iex
```

Then restart PowerShell and update Foundry:
```powershell
foundryup
```

Verify installation:
```powershell
forge --version
```

---

## 🚀 **Getting Started**
### **1️⃣ Clone the Repository**
```sh
git clone [https://github.com/PanaverseDevTeam/DECENTRASEC](https://github.com/PanaverseDevTeam/DECENTRASEC)
cd decentrasec
```

### **2️⃣ Install Project Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env`** file in the root directory and add:

```env
PINATA_JWT=your_pinata_jwt_here
```

Replace `your_pinata_jwt_here` with your **Pinata JWT**.

---

## 📡 **Deploy Smart Contracts (Optional)**
To deploy contracts to the **Polygon Mumbai Testnet**, set up **Infura** and **your private key**.

### **1️⃣ Set Up Environment Variables for Deployment**
Add the following to your `.env` file:

```env
POLYGON_RPC_URL=https://polygon-mumbai.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_wallet_private_key
```

### **2️⃣ Deploy Contract**
```sh
forge create contracts/YourContract.sol:YourContract --rpc-url $POLYGON_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

---

## 🎮 **Running the Application**
Start the development server:
```sh
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🎯 **Usage Guide**
1️⃣ Click **"Upload PDF"** and select a file  
2️⃣ Wait for the file to be uploaded to **Pinata**  
3️⃣ View your file’s **CID (IPFS Hash)** in the table  
4️⃣ Click the **copy icon** to copy the CID  
5️⃣ Open your file via `https://gateway.pinata.cloud/ipfs/CID`  

---

## 🔥 **Troubleshooting (Windows Users)**
### ❌ **"Command Not Found" Errors**
- If `foundryup` is not recognized, run:
  ```powershell
  $env:PATH += ";$HOME\.foundry\bin"
  ```

### ❌ **Environment Variables Not Working**
- Restart your terminal after adding **.env** variables.

### ❌ **Deployment Issues**
- Ensure your **Infura API Key** is correct.
- Use a **test wallet** (Do not expose your real private key).

---

## 📜 **License**
This project is open-source under the **MIT License**.

---

## 🤝 **Contributing**
Want to improve the project? Contributions are welcome! 🚀  
1️⃣ **Fork the repo**  
2️⃣ **Create a new branch**  
3️⃣ **Make your changes**  
4️⃣ **Submit a Pull Request**  

---

## 📩 **Contact**
For any issues, feel free to reach out:  
📧 **Email:** your@email.com  
🌐 **Website:** [yourwebsite.com](https://yourwebsite.com)  

