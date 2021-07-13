import React, { useEffect, useState } from 'react';
import './Voting.css';
import getBlockchain from '../ethereum/connect';
import { ethers } from 'ethers';

const Voting = () => {
  const [instance, setInstance] = useState(null);
  const [votesForYes, setVotesForYes] = useState('');
  const [votesForNo, setVotesForNo] = useState('');

  useEffect(() => {
    const load = async () => {
      const { poll } = await getBlockchain();
      console.log(poll);
      setInstance(poll);
    };
    loadYesVotes();
    load();
  }, [votesForYes]);

  const loadYesVotes = async () => {
    if (instance) {
      const votes = await instance.functions.votesForYes();
      setVotesForYes(votes[0]._hex / 1000000000000000000);
      // const number = votes[0]._hex.toFixed();
      // console.log(number);
    }
  };
  return (
    <div className="voting">
      <div className="voting__right">
        <h2>Number of Yes Votes: {votesForYes} </h2>
        <button className="voting__right__button">Vote Yes</button>
      </div>

      <div className="voting__left">
        <h2>Number of No Votes:</h2>
        <button className="voting__left__button">Vote No</button>
      </div>
    </div>
  );
};

export default Voting;
