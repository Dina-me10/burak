import express from "express";
import path from "path";
import router from "./router"; // React (SPA) uchun router
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import { T } from "./libs/types/common";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session"; //sessions bn ishlash uchun

const MongoDBStore = ConnectMongoDB(session); //store bn sessionni bir biriga boglimnz
//mongostore class hosil qildik
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL), //bu database link olib session hosilq iladi
  collection: "sessions",
});

/** 1-ENTRANCE **/ //MIDDLEWARE DESIGN PATTERN
const app = express(); //external package
app.use(express.static(path.join(__dirname, "public"))); //public folderni ochiqlaydi
app.use(express.urlencoded({ extended: true })); //traditional api ni support qiladi
app.use(express.json()); //rest api suport
app.use(morgan(MORGAN_FORMAT)); //login standartlarni qurib beradi

/** 2-SESSIONS **/ //REQ+SESSION TAMGA QURISH /TASDIQLASH
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), //Cookie ichidagi SID (Session ID) kalitini shifrlash
    //(himoya qilish) uchun ishlatiladigan maxfiy soʻz. U xavfsizlik uchun .env faylidan oʻqib olinmoqda

    cookie: {
      maxAge: 1000 * 3600 * 6, //6 HOURS
    },
    store: store,
    resave: true, //10;30 auth => 13:30 12:00 => 15:00
    saveUninitialized: true,
  }),
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member; //member malumotlani locals ga joylab qoydik
  next();
});

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS **/
app.use("/admin", routerAdmin); // BROWSER (SSR: EJS) uchun
app.use("/", router); // REACT (SPA) uchun

export default app;
