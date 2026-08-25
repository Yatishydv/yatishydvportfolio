import express from 'express';
const app = express();
app.get('/test/:id', (req, res) => {
  req.query = { ...req.query, id: req.params.id };
  res.json({ queryId: req.query.id, paramsId: req.params.id });
});
app.listen(4001, async () => {
  const res = await fetch('http://localhost:4001/test/123');
  console.log(await res.json());
  process.exit(0);
});
