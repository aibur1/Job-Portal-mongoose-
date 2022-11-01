const mongoose = require("mongoose");
require("dotenv").config();
require("colors")

const app = require("./app")

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log(`Database connection is successfull 🛢`.blue.bold);
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});
