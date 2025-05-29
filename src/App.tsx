import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useState, useEffect } from "react";

function App() {
  const { coffeeList, getCoffeeList } = useCoffeeStore();
  const [text, setText] = useState<string | undefined>();

  useEffect(() => {
    getCoffeeList();
  }, []);

  const handleSearch = (text: string) => {
    getCoffeeList({ text });
    setText(text);
  };

  return (
    <div className="wrapper">
      <Input
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
      </div>
    </div>
  );
}

export default App;
