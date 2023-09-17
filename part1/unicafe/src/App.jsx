import { useState } from "react";
import Button from "./componets/Button";
import StatisticLine from "./componets/StatisticLine";

const Statistics = ({ good, bad, neutral, total }) => (
  <div>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={total} />
    <StatisticLine text="average" value={(good - bad) / total} />
    <StatisticLine text="positive" value={good / total} />
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allClicks = good + neutral + bad;

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood((prev) => prev + 1)} text="good" />
        <Button
          handleClick={() => setNeutral((prev) => prev + 1)}
          text="neutral"
        />
        <Button handleClick={() => setBad((prev) => prev + 1)} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        {allClicks !== 0 ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={allClicks}
          />
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    </div>
  );
};

export default App;
