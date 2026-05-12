import { useEffect, useState } from "react";
import { config } from "./config";
import { apiService } from "./services";

function App() {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExampleTodo() {
      try {
        const data = await apiService.get("/todos/1");
        setTodo(data);
      } catch (requestError) {
        setError(requestError.message);
      }
    }

    loadExampleTodo();
  }, []);

  return (
    <main>
      <h1>Hola Mundo</h1>
      <p>{config.appName}</p>
      <p>Base URL API (env): {config.apiUrl}</p>
      <p>Endpoint: /todos/1</p>
      {error ? <p>Error: {error}</p> : null}
      {todo ? <pre>{JSON.stringify(todo, null, 2)}</pre> : <p>Cargando ejemplo...</p>}
    </main>
  )
}

export default App