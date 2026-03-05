import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import type { Votes } from "../../types/votes.ts";
import { useState } from "react";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

export default function App() {
  const [votesCounter, setVotesCounter] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (key: keyof Votes) => {
    setVotesCounter({
      ...votesCounter,
      [key]: votesCounter[key] + 1,
    });
  };

  const resetVotes = () => {
    setVotesCounter({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes =
    votesCounter.good + votesCounter.neutral + votesCounter.bad;

  const positiveRate =
    totalVotes > 0 ? Math.round((votesCounter.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votesCounter}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}