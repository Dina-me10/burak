import MemberModel from "../scheme/Member.model";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
// @ts-ignore
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";
// @ts-ignore

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA */

  public async getRestaurant(): Promise<Member> {
  const result = await this.memberModel
    .findOne({ memberType: MemberType.RESTAURANT })
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt(); //Parolni shifrlash uchun salt yaratiladi va parol hash qilinadi.
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
  //service model ichdan

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel //schema modelni
      .findOne(
        //findone static methodini ishga tushirdik
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }, //3 ta qiymatni argument sifatida olib
      )
      .exec(); //natijanni kutib const memberga tengladik

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(
      //bcrypt objectini compare methodi ishlab
      input.memberPassword, //frontenddan kegan qiymat
      member.memberPassword, //databasedagi password.. wait kutilib isMatchga tenglandi
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD); //malumot mos kemasa xatolik
    }

    return await this.memberModel.findById(member._id).exec(); //member schema model findbyyifid methodi orqali (memberid argumet) exec kutib
    // rewturn qvomiz
  }

  
  public async getMemberDetail(member: Member): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
    .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  return result;
}
public async updateMember(
  member: Member,
  input: MemberUpdateInput
): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
    .findOneAndUpdate({ _id: memberId }, input, { new: true })
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

  return result;
}

public async getTopUsers(): Promise<Member[]> {
  const result = await this.memberModel
    .find({
      memberStatus: MemberStatus.ACTIVE,
      memberPoints: { $gte: 1 },
    })
    .sort({ memberPoints: -1 })
    .limit(4)
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  return result;
}


  /** SSR */

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();

    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  //define
  public async processLogin(input: LoginInput): Promise<Member> {
    //processlogin methodini input nomli parametr bor
    //promiseda memberni qaytaradi
    const member = await this.memberModel //memberschema modelни findone static methodi ishlab
      .findOne(
        //2 ta argument berdik
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 },
      )
      .exec(); //exec qilib, javobni kuttirib memberga joyladik

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    //agarda member mavjud bolmasa xatolik beradi

    const isMatch = await bcrypt.compare(
      //bcrypt objectini comapre methodini ishlatib
      input.memberPassword, //inputdan kegan passwordni
      member.memberPassword, //databasedan kegan password bn solishtiradi
    );
    //va kutttirib ismatchga tengladik
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
      ////agar parollar mos kelmasa, ruxsat berilmagan xatolikни otadi
    }

    return await this.memberModel.findById(member._id).exec();
    //parollar mos tushsa, a'zoning ID execkuttirib return qilamz
  }

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel //this.memberModel — MongoDB bilan ishlovchi schema/model
      .find({ memberType: MemberType.USER }) //faqat memberType "USER" bo'lganlarni filterlab izlaymiz (restoranlarni emas)
      .exec(); //query'ni haqiqatda bajarib, natijani Promise sifatida qaytaradi
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(input._id);
    //input._id — string ko'rinishida keladi, MongoDB esa ObjectId talab qiladi, shu funksiya orqali to'g'ri formatga o'tkazamiz

    const result = await this.memberModel
      .findOneAndUpdate({ _id: memberId }, input, { new: true })
      //findOneAndUpdate — berilgan _id bo'yicha bitta dokumentni topib, input ichidagi maydonlar bilan yangilaydi
      //{ new: true } — yangilangandan keyingi (yangi) holatni qaytaradi, eski holatni emas
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }
}

export default MemberService;
