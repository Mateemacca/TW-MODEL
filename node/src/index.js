import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on ${PORT}`);
});
