
const express = require('express')
const app = express()
const port = 3000
let pdf = require("html-pdf")
app.use((req, res, next) => {

    if (req.originalUrl === '/stripe/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/pdf',(req,res)=>{
    let options = { format: 'Letter' };
    let html = "<h1>TVOJE MÁMA</h1>"

    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
