import { Button, Card, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect } from "react";

function App() {
  const { coffeeList, getCoffeeList } = useCoffeeStore();

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className="wrapper">
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
