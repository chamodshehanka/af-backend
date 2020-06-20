import app from "./app";
import config from "./src/config/config";

const PORT = config.PORT;

// Node app eka empty naha
// App eke code thiyenne app folder eke
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
