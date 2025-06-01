import { Card, Button, Tag, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { CoffeeType } from "../types/coffeeTypes";
import { useCoffeeStore } from "../model/coffeeStore";

export const CoffeeCard = ({ coffee }: { coffee: CoffeeType }) => {
  const { addToCart } = useCoffeeStore();
  return (
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
  );
};
