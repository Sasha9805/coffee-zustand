import { Input } from "antd";
import "./App.css";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect } from "react";
import { useUrlStorage } from "./helpers/useUrlStorage";
import { CoffeeCard } from "./components/CoffeeCatd";
import { Cart } from "./components/Cart";

function App() {
  const { coffeeList, params, setParams, getCoffeeList } = useCoffeeStore();

  useEffect(() => {
    getCoffeeList(params);
  }, []);

  useUrlStorage(params, setParams);

  return (
    <div className="wrapper">
      <Input
        placeholder="поиск"
        value={params.text}
        onChange={(e) => setParams({ text: e.target.value })}
      />
      <div style={{ display: "flex" }}>
        <div className="cardsContainer">
          {coffeeList &&
            coffeeList.map((coffee) => <CoffeeCard coffee={coffee} />)}
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default App;
