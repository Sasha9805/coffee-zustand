import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useState, useEffect } from "react";
import { useCounterStore } from "./model/counterStore";
import { useTodoStore } from "./model/todoStore";
import { resetAllStores } from "./helpers/create";

function App() {
  // const { coffeeList, getCoffeeList } = useCoffeeStore();
  // const [text, setText] = useState<string | undefined>();

  // useEffect(() => {
  //   getCoffeeList();
  // }, []);

  // const handleSearch = (text: string) => {
  //   getCoffeeList({ text });
  //   setText(text);
  // };

  const { counter, persistedCounter, decrement, increment, resetStore } =
    useCounterStore();

  const { todos, addTodo } = useTodoStore();

  return (
    <div className="wrapper">
      <Button onClick={increment}>+</Button>
      <span>{counter}</span>
      <span>{persistedCounter}</span>
      <Button onClick={decrement}>-</Button>

      {/* <Button onClick={resetStore}>reset</Button> */}

      <Button onClick={resetAllStores}>reset</Button>
      <Button onClick={() => addTodo("some")}>addTodo</Button>

      {todos.map((todo, index) => (
        <span key={index}>{todo.title}</span>
      ))}
      {/* <Input
        placeholder="поиск"
        value={text}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="cardsContainer">
        {coffeeList &&
          coffeeList.map((coffee) => (
            <Card
              key={coffee.id}
              cover={<img alt={coffee.name} src={coffee.image} />}
              actions={[
                <Button icon={<ShoppingCartOutlined />}>{coffee.price}</Button>,
              ]}
            >
              <Card.Meta title={coffee.name} description={coffee.subTitle} />
              <Tag color="purple" style={{ marginTop: 12 }}>
                {coffee.type}
              </Tag>
              <Rate
                style={{ marginTop: 12 }}
                defaultValue={coffee.rating}
                disabled
                allowHalf
              />
            </Card>
          ))}
      </div> */}
    </div>
  );
}

export default App;
