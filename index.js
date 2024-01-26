const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');

const mongoConn = require('./db/mongoConnection')

const routes = require('./routes');
const router = require('./routes');
app.use(bodyParser.json())
app.use(routes)


app.use('*', (req, res) => {
    console.log(router.stack)
    res.status(404).json({ message: "page not found" })
})


mongoConn().then(()=>{
app.listen(3000,()=>{console.log('listining to port 3000');})
})