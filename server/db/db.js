const mongoose = require('mongoose')
const url = "mongodb+srv://khushbukm133:khushbukm133@cluster0.1jrk5li.mongodb.net/divadrapesdb?retryWrites=true&w=majority"

// MongoDB connection
mongoose.connect(url, {
    dbname: "divadrapesdb",
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('mongoDb connect'))
    .catch((err) => console.log(`mongoDb not connect : ${err}`));