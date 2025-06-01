import { Input } from "antd";
import { setParams, useCoffeeStore } from "../model/coffeeStore";
import { useShallow } from "zustand/react/shallow";
import { useUrlStorage } from "../helpers/useUrlStorage";
import { useCustomQuery } from "../helpers/useCustomQuery";

export const SearchInput = () => {
  const [params] = useCoffeeStore(useShallow((state) => [state.params]));

  //   useEffect(() => {
  //     getCoffeeList(params);
  //   }, []);

  useUrlStorage(params, setParams);
  useCustomQuery(params);

  return (
    <Input
      placeholder="поиск"
      value={params.text}
      onChange={(e) => setParams({ text: e.target.value })}
    />
  );
};
