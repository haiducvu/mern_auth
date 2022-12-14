const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(`mongodb://localhost:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`);
    console.log('Connect database success');
  } catch (error) {
    console.log(`Connect Database Failed ${error}`);
  }
}

module.exports = connectDatabase;