import { Button, Input } from "antd";
import {
  useCoffeeStore,
  setAddress,
  clearCart,
  orderCoffee,
} from "../model/coffeeStore";
import { useShallow } from "zustand/react/shallow";

export const Cart = () => {
  const [cart, address] = useCoffeeStore(
    useShallow((state) => [state.cart, state.address])
  );
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
