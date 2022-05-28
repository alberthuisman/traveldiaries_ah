const express = require ('express');
const app = express();
const PORT = 5000;
const {json} = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({origin:'*'}));

//IMPORT ROUTERS
const usersRouter = require('./routes/user-routes')
const destinationsRouter = require('./routes/destination-routes')

//ACTIVE(USE) THE ROUTES
app.use('/', usersRouter)
app.use('/', destinationsRouter)

//WELCOME PAGE
app.get('/', (req, res) => {
    res.status(200).json({message:"Welcome to the server"})
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
});
