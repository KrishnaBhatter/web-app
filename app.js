const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Hardcoded credentials
const USER_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login form on the root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Login</h1>
        <form method="POST" action="/login">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br><br>
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

// Handle login POST request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
    return res.send('Login Successful!');
  } else {
    return res.send('Login Failed. Please try again.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
