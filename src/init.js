import "regenerator-runtime";
import "dotenv/config";  // 왜 이렇게 하면 잘 작동되는지 그래도 제대로 알아두어야 할거 같다
import "./db";
import "./model/Video";
import "./model/User";
import "./model/Comment";
import app from "./server";


const PORT = process.env.PORT || 5050;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 😎`);

app.listen(PORT, handleListening);
