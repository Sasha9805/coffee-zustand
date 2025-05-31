import { Button, Card, Input, Rate, Tag } from "antd";
import "./App.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCoffeeStore } from "./model/coffeeStore";
import { useEffect } from "react";
import { useSearchStore } from "./model/searchStore";

function App() {
  const {
    coffeeList,
    cart,
    address,
    setAddress,
    addToCart,
    clearCart,
    orderCoffee,
    getCoffeeList,
  } = useCoffeeStore();
  const { text, setText } = useSearchStore();

  useEffect(() => {
    getCoffeeList();
  }, []);

  return (
    <div className="wrapper">
      <Input
        placeholder="поиск"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ display: "flex" }}>
        <div className="cardsContainer">
          {coffeeList &&
            coffeeList.map((coffee) => (
              <Card
                key={coffee.id}
                cover={<img alt={coffee.name} src={coffee.image} />}
                actions={[
                  <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={() => addToCart(coffee)}
                  >
                    {coffee.price}
                  </Button>,
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
        <aside className="cart">
          <h1>Заказ</h1>
          {cart && cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
              <Input
                placeholder="адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button type="primary" onClick={orderCoffee} disabled={!address}>
                Сделать заказ
              </Button>
              <Button onClick={clearCart}>Очистить корзину</Button>
            </>
          ) : (
            <span>Добавьте напитки</span>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
