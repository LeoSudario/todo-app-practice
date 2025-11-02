import { useEffect, useState } from "react";
import './App.css';

const API = import.meta.env.VITE_API || 'http://localhost:3000';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${API}/simple`)
      .then(r => r.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>To Do List</h1>
      <ul>
        {items.map(i => <li key={i.id}>{i.title}</li>)}
      </ul>

    </>
  )
}

export default App;