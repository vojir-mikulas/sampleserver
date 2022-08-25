
const express = require('express')
const app = express()
const port = 3000
let pdf = require("html-pdf")
const cors = require("cors")

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/pdf',(req,res)=>{
    let options = { format: 'Letter',childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } }  };
    let html = "<h1>TVOJE MÁMA</h1>"

    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening on port ${port}`)
})
