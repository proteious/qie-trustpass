import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";
import { CONTRACT_ADDRESS } from "./contract";
import "./App.css";

const QIE_CHAIN_ID = "0x7bf"; // 1983 in hex

function App() {
  const [account, setAccount] = useState(null);
  const [did, setDid] = useState("");
  const [trust, setTrust] = useState(null);
  const [status, setStatus] = useState("idle");
  const [networkOk, setNetworkOk] = useState(true);

  const [verifyAddr, setVerifyAddr] = useState("");
  const [verifyScore, setVerifyScore] = useState(null);

  useEffect(() => {
    checkNetwork();
    restoreSession();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", checkNetwork);
      window.ethereum.on("accountsChanged", logout);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", checkNetwork);
        window.ethereum.removeListener("accountsChanged", logout);
      }
    };
  }, []);

  async function checkNetwork() {
    if (!window.ethereum) return;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    setNetworkOk(chainId === QIE_CHAIN_ID);
  }

  async function restoreSession() {
    const saved = localStorage.getItem("connectedAccount");
    if (!saved || !window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);
    if (accounts[0]?.toLowerCase() === saved.toLowerCase()) {
      setAccount(saved);
    } else {
      localStorage.removeItem("connectedAccount");
    }
  }

  async function connectWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    localStorage.setItem("connectedAccount", accounts[0]);
    checkNetwork();
  }

  function logout() {
    localStorage.removeItem("connectedAccount");
    setAccount(null);
    setDid("");
    setTrust(null);
    setVerifyAddr("");
    setVerifyScore(null);
    setStatus("idle");
  }

  async function register() {
    if (!account || !did || !networkOk) return;
    setStatus("pending");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.registerIdentity(did);
      await tx.wait();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function fetchTrust() {
    if (!account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    const score = await contract.getTrustScore(account);
    setTrust(score.toString());
  }

  async function verifyOther() {
    if (!verifyAddr) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    try {
      const score = await contract.getTrustScore(verifyAddr);
      setVerifyScore(score.toString());
    } catch {
      setVerifyScore("Not Registered");
    }
  }

  return (
    <div className="app">
      {!networkOk && (
        <div className="network-warning">
          ⚠ Please switch to <b>QIE Testnet</b> to use this application
        </div>
      )}

      <nav className="nav">
        <h2>QIE TrustPass</h2>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div className="nav-right">
            <span className="wallet">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <button className="logout" onClick={logout}>Logout</button>
          </div>
        )}
      </nav>

      <main className="hero">
        <span className="badge">On-chain Identity · QIE Testnet</span>

        <h1>Trust, Verified<br />On-Chain</h1>
        <p>Decentralized identity & reputation with zero personal data storage.</p>

        <div className="card">
          <label>Your DID</label>
          <input disabled={!account} value={did} onChange={e => setDid(e.target.value)} />

          <button disabled={!account || !did || !networkOk || status === "pending"} onClick={register}>
            {status === "pending" ? "Confirming..." : "Create TrustPass"}
          </button>

          <button className="secondary" disabled={!account} onClick={fetchTrust}>
            Get Trust Score
          </button>

          {trust !== null && (
            <div className="result">
              <span>Trust Score</span>
              <strong>{trust}</strong>
              {trust >= 1 && <span className="verified">✔ Verified</span>}
            </div>
          )}

          <div className="divider" />

          <label>Verify Another Wallet</label>
          <input
            placeholder="0x..."
            value={verifyAddr}
            onChange={e => setVerifyAddr(e.target.value)}
          />
          <button className="secondary" onClick={verifyOther}>
            Verify Wallet
          </button>

          {verifyScore && (
            <div className="result">
              <span>Trust Score</span>
              <strong>{verifyScore}</strong>
            </div>
          )}
        </div>
      </main>

      <footer>© 2025 QIE TrustPass · Identity Infrastructure</footer>
    </div>
  );
}

export default App;
