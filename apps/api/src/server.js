require('dotenv').config();
const app = require('./app');

const PORT = 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));

