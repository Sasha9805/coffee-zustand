import { Card, Checkbox, Input } from "antd";
import "./App.css";
import { useTodoStore } from "./model/todoStore";
import { useState } from "react";

function App() {
  const { todos, addTodo, changeIsComplete } = useTodoStore();
  const [value, setValue] = useState<string>("");

  return (
    <div className="wrapper">
      <Input
        style={{ width: 300 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(value);
            setValue("");
          }
        }}
      />
      {todos.map((todo, index) => (
        <Card className="card" key={index}>
          <Checkbox
            checked={todo.isComplete}
            onChange={() => changeIsComplete(index)}
          />
          <span>{todo.title}</span>
        </Card>
      ))}
    </div>
  );
}

export default App;
