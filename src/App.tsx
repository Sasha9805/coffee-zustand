import "./App.css";
import { addTen } from "./helpers/addTen";
import { counter2, useCounterStore } from "./model/counterStore";

function App() {
  const { counter, increment, decrement } = useCounterStore();
  const newCounter = counter2;
  console.log(newCounter);
  return (
    <div className="wrapper">
      <button onClick={increment}>+</button>
      <span>{counter}</span>
      <span>{newCounter}</span>
      <button onClick={decrement}>-</button>
      <button onClick={addTen}>add 10</button>
    </div>
  );
}

export default App;
