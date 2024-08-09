const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const mongoDB = require('./db')
mongoDB()

app.use(cors())

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://quickbite-7.onrender.com")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(express.json())
app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/DisplayData'))
app.use('/api', require('./Routes/OrderData'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/proxy', (req, res) => {
  const url = 'https://quickbite-3.onrender.com' + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})