import React, { useEffect, useState } from 'react';
import './Voting.css';
import getBlockchain from '../ethereum/connect';
import { ethers } from 'ethers';

const Voting = () => {
  const [instance, setInstance] = useState(null);
  const [votesForYes, setVotesForYes] = useState('');
  const [votesForNo, setVotesForNo] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { poll } = await getBlockchain();
      let Yesvotes = await poll.functions.votesForYes();
      const Yesnumber = ethers.utils.arrayify(Yesvotes[0]._hex);
      setVotesForYes(Yesnumber[0]);

      let Novotes = await poll.functions.votesForNo();
      const Nonumber = ethers.utils.arrayify(Novotes[0]._hex);
      setVotesForNo(Nonumber[0]);
      console.log(poll);
      setInstance(poll);
    };
    load();
  }, [votesForYes, success]);

  const handleYesVote = async () => {
    console.log('Yes');
    try {
      let overrides = {
        value: ethers.utils.parseEther('0.01'),
      };
      const voteTx = await instance.functions.vote(2, overrides);
      const txReceipt = await voteTx.wait();
      setSuccess(true);
      alert('Voting successful');
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleNoVotes = async () => {
    console.log('No');
    try {
      let overrides = {
        value: ethers.utils.parseEther('0.01'),
      };
      const voteTx = await instance.functions.vote(1, overrides);
      const txReceipt = await voteTx.wait();
      setSuccess(true);
      alert('Voting successful');
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="voting">
      <div className="voting__right">
        <h2>Number of Yes Votes: {votesForYes} </h2>
        <button onClick={handleYesVote} className="voting__right__button">
          Vote Yes
        </button>
      </div>

      <div className="voting__left">
        <h2>Number of No Votes: {votesForNo}</h2>
        <button onClick={handleNoVotes} className="voting__left__button">
          Vote No
        </button>
      </div>
    </div>
  );
};

export default Voting;
