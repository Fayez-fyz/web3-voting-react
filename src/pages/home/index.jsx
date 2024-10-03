import LoginComponent from "../../components/home/login.component";
import { useEffect, useState } from "react";
import WalletConnectedComponent from "../../components/home/walletConnected.component";
import { createEthereumContract } from "../../utils/create-contract/createContract";
import VoteFinishedComponent from "../../components/home/finished.component";
import { ethers } from "ethers";

const HomePage = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [candidateNumber, setCandidateNumber] = useState("");
  const [canVote, setCanVote] = useState(false);

  useEffect(() => {
    getCandidateDetails();
    getCurrentStatus();
    getRemainingTime();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanger);
    }
  }, [account]);

  const handleAccountsChanger = (accounts) => {
    if (accounts.length > 0 && accounts[0] !== account) {
      setAccount(accounts[0]);
      setIsConnected(true);
      checkVoteStatus();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  };

  const voteFunction = async () => {
    try {
      const { contract } = await createEthereumContract();
      const vote = await contract.vote(candidateNumber);
      await vote.wait();
      getCandidateDetails();
      getCurrentStatus();
      getRemainingTime();
      checkVoteStatus();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const checkVoteStatus = async () => {
    try {
      const { contract, signer } = await createEthereumContract();
      const voteStatus = await contract.voters(await signer.getAddress());
      console.log(voteStatus, "voteStatus");
      setCanVote(voteStatus);
    } catch (error) {
      console.error("Failed to check if can vote:", error);
    }
  };

  const getCandidateDetails = async () => {
    try {
      const { contract } = await createEthereumContract();
      const candidateDetails = await contract.getAllVotesOfCandidates();
      const formattedCandidateDetails = candidateDetails.map(
        (detail, index) => {
          return {
            id: index,
            name: detail.name,
            voteCount: Number(detail.voteCount),
          };
        }
      );
      console.log(formattedCandidateDetails, "formattedCandidateDetails");
      setCandidateDetails(formattedCandidateDetails);
    } catch (error) {
      console.error("Failed to get candidate details:", error);
    }
  };

  const getCurrentStatus = async () => {
    try {
      const { contract } = await createEthereumContract();
      const status = await contract.getVotingStatus();
      console.log(status, "status");
      setVotingStatus(status);
    } catch (error) {
      console.error("Failed to get current voting statussss:", error);
    }
  };

  const getRemainingTime = async () => {
    try {
      const { contract } = await createEthereumContract();
      const time = await contract.getRemainingTime();
      console.log(time, "time");
      setRemainingTime(parseInt(time, 16));
    } catch (error) {
      console.error("Failed to get remaining time:", error);
      setRemainingTime(0);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        const address = signer.address;
        setAccount(address);
        setIsConnected(true);
        checkVoteStatus();
      } else {
        throw new Error("Ethereum provider not found");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {votingStatus ? (
        isConnected ? (
          <WalletConnectedComponent
            account={account}
            votingStatus={votingStatus}
            remainingTime={remainingTime}
            candidateDetails={candidateDetails}
            candidateNumber={candidateNumber}
            setCandidateNumber={setCandidateNumber}
            voteFunction={voteFunction}
            showButton={canVote}
          />
        ) : (
          <LoginComponent connectWallet={connectWallet} />
        )
      ) : (
        <VoteFinishedComponent />
      )}
    </div>
  );
};
export default HomePage;
