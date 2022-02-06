import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import apiRouter from "./routes/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));// 이렇게 사용하면 자바스크립트를 이해할수있도록 해준다

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //초기화 하지 않은 사용자는 쿠키를 저장하지 않는다는것 
    // cookie:{        //쿠키를 얼마나 유지할건지 지정해준다
    //     maxAge:20000
    // },
    store:MongoStore.create({ mongoUrl: process.env.DB_URL})
}));


app.use(localsMiddleware);
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("assets"));
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.use("/api",apiRouter);

export default app;