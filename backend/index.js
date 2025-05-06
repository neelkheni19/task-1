import express from 'express';
import cors from 'cors'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;


let data = [{ id: 1, name: 'Krutagna', age: 20, email: 'Krutagna28@gmail.com' }, { id: 2, name: 'KK', age: 21, email: 'kk@example.com' }]


app.get('/api/data', (req, res) => {
    res.json(data);
});


app.post('/api/data2', (req, res) => {
    const user = {
        ...req.body,
        age: parseInt(req.body.age) // convert to number
    };
    data.push(user);
    console.log(data);
    res.send('Data received!');
});


app.put('/api/edit/:id', (req, res) => {
    console.log("edit req");
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    const { name, age, email } = req.body;

    if (index !== -1) {
        data[index].name = name ? name : data[index].name;
        data[index].age = age ? age : data[index].age;
        data[index].email = email ? email : data[index].email;
    }
    res.send("data modeified!");
})


app.delete('/api/delete/:id', (req, res) => {
    console.log("delete req");
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        const removedItem = data.splice(index, 1); // remove item
        return res.json({ message: 'Deleted', item: removedItem });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});