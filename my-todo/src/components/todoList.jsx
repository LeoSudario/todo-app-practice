import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API || 'http://localhost:3000';

function TodoList() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`${API}/simple`)
            .then(r => r.json())
            .then(setItems)
            .catch(console.error);
    }, []);

    const handleclick = (item) => {
        const updatedItem = { ...item, completed: !item.completed };
        const updatedItems = items.map(i => i.id === item.id ? updatedItem : i);
        setItems(updatedItems);
    }

    const handleDelete = (item) => {
        fetch(`${API}/simple/${item.id}`,
            { method: 'DELETE' })
            .then(() => {
                setItems(items.filter(i => i.id !== item.id));
            })
            .catch(console.error);
    }

    const handleAdd = (title) => {
        const newItem = { title, completed: false };
        fetch(`${API}/simple`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        }).then(r => r.json())
            .then(setItems)
            .catch(console.error);
    }

    return (
        <div>
            <h1>To Do List</h1>
            <form onSubmit={e => {
                e.preventDefault();
                const title = e.target.elements.title.value;
                handleAdd(title);
                e.target.reset();
            }}>
                <input className="input" type="text" name="title" placeholder="New task" required />
                <button type="submit">Add</button>
            </form>
            <ul className="itemTodo">
                {items.length === 0 ? <li>No items found</li> : items.map(i => (
                    <li key={i.id}>
                        {i.title} {i.completed ? '✓' : '✗'}
                        <button onClick={() => handleclick(i)}>{i.completed ? 'Undo' : 'done'}</button>
                        <button onClick={() => handleDelete(i)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;
