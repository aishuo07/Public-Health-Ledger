const Express = require("express");
const BodyParser = require("body-parser");
const bodyParser = require("body-parser");


var app = Express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const port = 3000
let books = []
app.listen(port, ()=> {
    console.log("server running on port 3000")
});
app.get("/url", (req, res, next)=>{
    res.json(["Aish", "Archit", "Tina", "Nishu", "Himani","Golgappe"]);
});
app.post('/book', (req, res)=>{
    var book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to db');
});
app.get('/books', (req, res) => {
    res.json(books);
});


