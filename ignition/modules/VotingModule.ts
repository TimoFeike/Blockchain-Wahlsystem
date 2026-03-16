import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("VotingModule", (m) => {

    const candidates = ["Felix", "Nico", "Daniel"];
    const voting = m.contract("Voting", [candidates]);

    return { voting }
})