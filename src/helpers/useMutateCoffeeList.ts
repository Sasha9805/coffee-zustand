import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateCoffeeList = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => client.invalidateQueries({ queryKey: ["coffeeList"] }),
  });
  return mutate;
};
