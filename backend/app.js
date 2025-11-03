import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const list = [
    { id: 1, title: 'Comprar leite', completed: false }
];

const nextId = () => {
    return list.length ? Math.max(...list.map(i => i.id)) + 1 : 1;
}
app.get('/simple', (req, res) => {
   
    res.json(list);
})


app.post('/simple', (req, res) => {
    const item = req.body;
    item.id = nextId();
    list.push(item);
    res.status(201)
    res.json(list)
})

app.delete('/simple/:id', (req, res) => {
    const id = Number(req.params.id);
    let item = list.filter(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    list.splice(list.indexOf(item), 1);
    res.status(204).send();

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});