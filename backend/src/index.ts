import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`[Xteink API] Running on http://localhost:${config.port}`);
  console.log(`[Xteink API] Environment: ${config.nodeEnv}`);
});
