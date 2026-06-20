import { Request, Response, NextFunction } from "express";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("Error, goHome:", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup:", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processSignup"); //processsignup ma'lumot oladi → DB ga saqlaydi → session ochadi
    const file = req.file; //fileni qayerga saqlaganini korsatadi
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.RESTAURANT;
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember); //call

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`,
    );
  }
};

restaurantController.processLogin = async (
  //restaurantController objectini
  //processogin aync methodi ishga tuhadi
  req: AdminRequest,
  res: Response, //va req,res parameter bor
) => {
  try {
    console.log("processLogin"); //standartga kora login qildik

    const input: LoginInput = req.body; //kirib kegan req.body ni Logininput interface orqali inputga joylashtirdik
    const memberService = new MemberService(); //memberservice intance caqirib objectga aylantirvoldik
    const result = await memberService.processLogin(input); //memberservice objectini processlogin methodi chqiirib
    // inputni argument qvoldik va kuttrb resultga tengladik. va servicemodelga yol oladi CALL

    req.session.member = result; //COOKIE yaratilib , sessionga member malumotni joylimz
    req.session.save(function () {
      res.redirect("/admin/product/all"); //va callback function orqali boshqa pagega yuboradi
    });
  } catch (err) {
    console.log("Error, processLogin:", err); //xatolik yuz beradi
    const message = //xatoni turiga qarab message yozadi
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      //xatolik bosa alert orqali loginga jonatadi
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`,
    );
  }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout:", err);
    res.send("/admin");
  }
};

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const memberService = new MemberService(); //MemberService classidan yangi object(instance) yaratamiz
    const result = await memberService.getUsers(); //service ichidagi getUsers methodini chaqirib, await bilan natijani kutamiz

    res.render("users", { users: result }); //"users" nomli ejs/pug sahifasini render qilamiz,
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const memberService = new MemberService();
    const result = await memberService.updateChosenUser(req.body);
    //req.body — Postman/frontenddan kelgan { _id, memberStatus, ... } ma'lumotlarini service'ga uzatamiz va yangilangan natijani kutamiz

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      //sessiya ichida foydalanuvchi (member) ma'lumotlari bor-yo'qligini tekshirad
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`,
    );
  }
};

export default restaurantController;
