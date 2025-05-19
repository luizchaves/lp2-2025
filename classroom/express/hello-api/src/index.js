import express from 'express';
import morgan from 'morgan';

const server = express();

server.use(morgan('tiny'));

// route = Method (get, post, put, delete), Path, Handler
server.get('/hello', (req, res) => {
  return res.send('Hello World!');
});

// get /hello/pt
server.get('/hello/pt', (req, res) => {
  // const name = req.query.name;
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  return res.json({
    message: `Olá, ${name}!`,
  });
});

// get /hello/en
server.get('/hello/en/:name', (req, res) => {
  // const name = req.params.name;
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  return res.json({
    message: `Hello, ${name}!`,
  });
});

// post /hello/es

// 404 handler
server.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler
server.use((err, req, res, next) => {
  // console.error(err.stack);

  return res.status(500).json({ message: 'Something broke!' });
});

server.listen(3000, () => console.log('Server is running on port 3000'));
