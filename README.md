# Blockchain Wahlsystem – Bachelorarbeit "Dezentrale Wahlsysteme auf der Blockchain: Eine technische und kritische Untersuchung mit prototypischem System"

Dieses Repository enthält den Prototyp eines Blockchain-basierten Wahlsystems, entwickelt im Rahmen meiner Bachelorarbeit. Das Projekt umfasst ein Smart Contract, ein Frontend sowie die Deployment Konfiguration mit Hardhat.

## Projektstruktur

- `contracts/` – enthält den Smart Contract (Voting.sol)  
- `frontend/` – React-Frontend (App.js) 
- `ignition/` – Hardhat Deployments  

## Voraussetzungen

Um das Projekt lokal auszuführen, werden folgende Programme benötigt:

- Node.js
- Git  
- Hardhat 3
- MetaMask
  
## Anwendung starten

1. Repository klonen
2. Abhängigkeiten installieren
   - npm install
   - cd frontend
   - npm install
   - cd ..
3. Lokalen Knoten erstellen
   - npx hardhat node
4. Deployment und Frontend starten
   - npx hardhat ignition deploy ignition\modules\VotingModule.ts --network localhost
   - cd frontend
   - npm start
5. Browser über gegebenen localhost abrufen

## Anmerkung

Eine ausführliche Beschreibung sowie erläuterung der Voraussetzungen und der genuen Vorbereitung befinden sich im Anhang der Bachelorarbeit
