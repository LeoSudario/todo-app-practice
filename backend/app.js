import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const list = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
];

app.get('/simple', (req, res) => {
    res.json(list);
})


app.post('/simple', (req, res) => {
    const item = req.body;
    list.push(item);
    res.status(201)
    res.json(list)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});