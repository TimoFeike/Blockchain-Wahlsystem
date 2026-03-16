export const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "string[]", "name": "candidateNames", "type": "string[]" }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    { "inputs": [],
        "name": "admin",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    { "inputs": [],
        "name": "endVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { "inputs": [], "name": "getCandidates", "outputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" }], "internalType": "struct Voting.Candidate[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
    { "inputs": [],
        "name": "getWinner",
        "outputs": [
            { "internalType": "bool", "name": "tie", "type": "bool" },
            { "internalType": "string", "name": "winnerName", "type": "string" },
            { "internalType": "uint256", "name": "winnerVotes", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutility": "view",
        "type": "function"
    },
    { "inputs": [], "name": "startVoting", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "votingActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];
