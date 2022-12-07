import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { Token, TokenDocument } from './schema/token.schema';
import { throwError } from 'rxjs';
import { InputUserType } from './dtos/inputype.dto';
import { UserType } from './dtos/create-user.type.dto';
const nodemailer = require("nodemailer");
const crypto = require("crypto");

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, "users") private userModel: Model<UserDocument>,
    @InjectModel(Token.name, "tokens") private tokenModel: Model<TokenDocument>
  ) {}

  async create(createUserDto: InputUserType): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isactive: true }).exec();
  }

  async find(email: string){
    const user= await this.userModel.findOne({ email, isactive: true });
    // console.log('find',user);
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id, isactive: true });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUser: UserUpdateDto
  ): Promise<User> {
    const user = await this.userModel.findOne({ _id: id, isactive: true });
    if (!user) {
      throw new NotFoundException("User Does Not Exist");
    }
    Object.assign(user, updateUser);
    await user.save();
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("User Does Not Exist");
    }
    user.isactive = false;
    await user.save();
    return `User ${user.email} Deleted Successfully`;
  }

  async checkadmin(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email, isactive: true });
    if (!user) {
      throw new NotFoundException("Admin Not Found");
    }
    if (!user.admin) {
      return false;
    }
    return true;
  }

  async entermail(email: string) {
    const user = await this.userModel.findOne({ email, isactive: true });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    // console.log('user',user)
    let token = await this.tokenModel.findOne({ owner: user._id });
    if (!token) {
      token = await new this.tokenModel({
        owner: user._id,
        token: await crypto.randomBytes(32).toString("hex"),
      });
      token.save();
    }
    const link = `http://localhost:3000/user/${user._id}/${token.token}`;
    await this.sendmail(user.email, link);
  }

  async sendmail(email: string, link: string) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      auth: {
        user: "hitpatelp79@gmail.com",
        pass: "jnysweyacgdytaxv",
      },
    });
    await transporter.sendMail({
      from: "hitpatelp79@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Change PassWord", // Subject line
      text: this.formatEmail(link), // plain text body
      // html body
    });
  }

  formatEmail(link: string) {
    return `This is Link To Change Password , If You Want To Change Please Enter Link        ${link}`;
  }

  async forgetpassword(userid: string, token: string, password: string) {
    const user = await this.userModel.findOne({ _id: userid, isactive: true });
    if (!user) {
      throw new HttpException("Link expired", HttpStatus.BAD_REQUEST);
    }
    const gettoken = await this.tokenModel.findOne({ token });
    if (!gettoken) {
      throw new HttpException("Link expired", HttpStatus.BAD_REQUEST);
    }
    user.password = password;
    await user.save();
    return "Changed Successfully";
  }
}
