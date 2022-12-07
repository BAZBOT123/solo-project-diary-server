// Load our .env file
require('dotenv').config();

// Import express and cors
const express = require('express');
const cors = require('cors');

// Set up express
const app = express();
app.disable('x-powered-by');
app.use(cors({
  origin: 'https://my-diary--server.herokuapp.com/diary?startDate=Wed%20Dec%2007%202022%2011:02:17%20GMT+0000%20(Greenwich%20Mean%20Time)&endDate=Wed%20Dec%2007%202022%2011:02:17%20GMT+0000%20(Greenwich%20Mean%20Time)'
}));
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
const diaryRouter = require('./routers/diary');
app.use('/diary', diaryRouter);

const userRouter = require('./routers/user');g
app.use('/user', userRouter);
// const registerRouter = require('./routers/register');
// app.use('/register', registerRouter);

// Set up a default "catch all" route to use when someone visits a route
// that we haven't built - like a cache all
app.get('*', (req, res) => {
  res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});