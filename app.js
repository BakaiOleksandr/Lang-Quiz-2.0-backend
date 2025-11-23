require('./env.loader');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const authRouter = require('./routes/auth.routes');
const public10Words = require('./routes/public10words.routes');
const level_1Router = require('./routes/level.routes');
const level1get30Router = require('./routes/level1get30.routes');
const levelRoutes = require('./routes/level.routes');
//APP
const app = express();
app.use(cors());
app.use(express.json());
//AuthRouter
app.use('/auth', authRouter);
app.use('/publicwords', public10Words);
app.use('/play_level_1', level1get30Router);
//
app.use('/game', levelRoutes);

//Try server
app.get('/', (req, res) => {
  res.json("Welcome to Language Quiz Game");
});
//not existing route
app.use((req, res) => {
  console.log(chalk.yellow(`⚠️  Unknown route accessed: ${req.originalUrl}`));
  res.status(404).json({message: `Route ${req.originalUrl} not found.`});
});

//MONGO
mongoose
  .connect(process.env.MONGO_URL)
  .then(async (x) => {
    console.log(
      chalk.green(
        `Connected to Mongo!\nDatabase name: "${x.connections[0].name}"`
      )
    );
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    if (collections.length === 0) {
      console.log(chalk.yellow('⚠️ No collections found in this database.'));
    } else {
      console.log(chalk.cyan('📂 Collections:'));
      collections.forEach((c) => console.log(' -', c.name));
    }
  })
  .catch((err) => {
    const errorLog = chalk.red('Mongo Error:');
    console.log(errorLog, err);
  });

app.listen(5000, () => {
  const listenPort = chalk.green('Server is running on port:5000');

  console.log(listenPort);
});
