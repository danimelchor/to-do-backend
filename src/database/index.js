const mongoose = require("mongoose");

const main = async () => {
  const pass = encodeURI(process.env.MONGO_PASSWORD);
  const uri = `mongodb+srv://todo_app:${pass}@cluster0.lsnao.mongodb.net/TodoApp?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Can't connected to database:", err);
  }
};

main().catch(console.error);
