import { useQuery } from "@tanstack/react-query";
import { getCoffeeList, setData } from "../model/coffeeStore";
import { useEffect } from "react";
import type { GetCoffeeListRequestParams } from "../types/coffeeTypes";

export const useCustomQuery = (params: GetCoffeeListRequestParams) => {
  const { data, status } = useQuery({
    queryKey: ["coffeeList", params],
    queryFn: () => getCoffeeList(params),
  });

  useEffect(() => {
    setData(data);
  }, [data, status]);
};
