import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

/***RESTAURANT*****/
routerAdmin.get("/", restaurantController.goHome);

// Login
routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.post("/login", restaurantController.processLogin);

// Signup
routerAdmin.get("/signup", restaurantController.getSignup);

routerAdmin.post("/signup", restaurantController.getSignup);

/*****product ****** */

/****user***** */
export default routerAdmin;
