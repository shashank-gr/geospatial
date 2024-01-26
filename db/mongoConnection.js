const mongoose = require('mongoose');
require('dotenv').config()
module.exports = async function () {
  try {
    const pass = encodeURIComponent(process.env.MONGO_PASS);
    const user = encodeURIComponent(process.env.MONGO_ADMIN);
    
    const uri = `mongodb+srv://${user}:${pass}@cluster0.omndki8.mongodb.net/?retryWrites=true&w=majority`;
     return await mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ).then(() => { console.log('connected to DB') })

  } catch (e) {
    console.error(e)
    console.log("could not connect");
  }
}