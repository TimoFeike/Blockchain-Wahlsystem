// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public hasVoted;

    Candidate[] public candidates;

    address public admin;

    bool public votingActive;

    event VoteCast(address indexed voter, uint indexed candidateIndex);
    event VotingStarted();
    event VotingEnded();

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], voteCount: 0}));
        }
        votingActive = false;
    }

    function getCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function startVoting() public onlyAdmin {
        require(!votingActive, "Voting already active");

        votingActive = true;

        emit VotingStarted();
    }

    function endVoting() public onlyAdmin {
        require(votingActive, "Voting is not active");

        votingActive = false;

        emit VotingEnded();
    }


    function vote(uint candidateIndex) public {
        require(votingActive, "Voting is not active");
        require(!hasVoted[msg.sender], "Address already voted");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;

        emit VoteCast(msg.sender, candidateIndex);
    }

    function getWinner() public view returns (bool tie, string memory winnerName, uint winnerVotes) {
        require(!votingActive, "Voting still active");

        uint highestVotes = 0;
        uint winnerIndex = 0;
        tie = false;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVotes) {
                highestVotes = candidates[i].voteCount;
                winnerIndex = i;
                tie = false;
            } else if (candidates[i].voteCount == highestVotes) {
                tie = true;
            }
        }
        return (tie, candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
}
