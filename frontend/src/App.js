import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS, CONTRACT_ABI} from "./contract-config";

function App() {
    const [account, setAccount] = useState(null);
    const [voted, setVoted] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [votingActive, setVotingActive] = useState(false);
    const [winner, setWinner] = useState(null);
    const [admin, setAdmin] = useState(null);

    async function connectWallet() {
        if (!window.ethereum) return alert("Bitte MetaMask installieren!");
        const [selectedAccount] = await window.ethereum.request({method: "eth_requestAccounts"});
        setAccount(selectedAccount);
    }

    async function getContract(signer = false) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer ? await provider.getSigner() : provider
        );
        return contract;
    }

    async function loadCandidates() {
        const contract = await getContract();
        const data = await contract.getCandidates();
        const parsed = data.map(c => ({
            name: c[0],
            voteCount: Number(c[1])
        }));
        console.log(parsed);
        setCandidates(parsed);
    }

    async function loadStatus() {
        const contract = await getContract();

        const active = await contract.votingActive();
        const adminAddress = await contract.admin();
        setVotingActive(active);
        setAdmin(adminAddress);
    }

    async function vote(index) {
        try {
            const contract = await getContract(true);
            const tx = await contract.vote(index);
            await tx.wait();
            await loadCandidates();
            setVoted(true);
        } catch (error) {
            console.error(error);
        }
    }

    async function toggleVoting() {
        try {
            const contract = await getContract(true);
            if (votingActive) {
                const tx = await contract.endVoting();
                await tx.wait();
            } else {
                const tx = await contract.startVoting();
                await tx.wait();
            }
            await loadStatus();
            await loadCandidates();
            setWinner(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchWinner() {
        try {
            const contract = await getContract();
            const [tie, name, votes] = await contract.getWinner();
            setWinner({tie, winnerName: name, voteCount: votes});
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (window.ethereum) {
            loadCandidates();
            loadStatus();
        }
    },);

    return (
        <div style={{textAlign: "center", padding: "4rem", fontFamily: "sans-serif"}}>
            <h1>Blockchain Wahlsystem</h1>

            {!account ? (
                <button onClick={connectWallet}>Wallet verbinden</button>
            ) : (
                <p>Verbunden mit: <b>{account}</b></p>
            )}

            <h2>Die Wahl ist {votingActive ? "geöffnet" : "geschlossen"}</h2>

            {account?.toLowerCase() === admin?.toLowerCase() && (
                <button onClick={toggleVoting}>
                    {votingActive ? "Wahl beenden" : "Wahl starten"}
                </button>
            )}

            <hr/>

            <h3>Kandidaten</h3>
            <ul style={{listStyle: "none"}}>
                {candidates.map((c, i) => (
                    <li key={i}>
                        <b>{c.name}</b> — Stimmen: {c.voteCount.toString()}
                        {votingActive && !voted && (
                            <button onClick={() => vote(i)}>
                                Stimme abgeben
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <hr/>

            {votingActive && voted && (
                <b>Ihre Stimme wurde erfolgreich abgegeben!</b>
            )}

            {!votingActive && account?.toLowerCase() === admin?.toLowerCase() && (
                <button onClick={fetchWinner}>Gewinner anzeigen</button>
            )}

            {winner && (
                winner.tie ? (
                    <h3>Gleichstand - Höchststimmen: {winner.voteCount}</h3>
                ) : (
                    <h3>Gewinner: {winner.winnerName} ({winner.voteCount} Stimmen)</h3>
                )
            )}
        </div>
    );
}

export default App;
