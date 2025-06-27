// Dependencies
const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require("./router/user");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRoute);

// MongoDB Connection
mongoose.connect("mongodb+srv://gerodayos:admin123@dayosportfolio.qf0uvrz.mongodb.net/DayosPortfolio?retryWrites=true&w=majority&appName=DayosPortfolio",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log("Connected Successfully"));

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server Running at Port ${process.env.PORT || 4000}`)
    })
}

module.exports = {app, mongoose};