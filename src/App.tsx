import "./App.css";
import { useCounterStore } from "./model/counterStore";

function App() {
  const { counter, increment, decrement } = useCounterStore();
  return (
    <div className="wrapper">
      <button onClick={increment}>+</button>
      <span>{counter}</span>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
