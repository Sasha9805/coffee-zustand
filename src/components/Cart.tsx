import { Button, Input } from "antd";
import { useCoffeeStore } from "../model/coffeeStore";

export const Cart = () => {
  const { cart, address, setAddress, orderCoffee, clearCart } =
    useCoffeeStore();
  return (
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
  );
};
