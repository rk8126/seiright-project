const express = require('express');
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.listen(3000, err => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening to 3000`);
  });

module.exports ={
    app
}