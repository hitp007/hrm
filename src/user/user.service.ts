import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { Token, TokenDocument } from './schema/token.schema';
import { throwError } from 'rxjs';
const nodemailer = require("nodemailer");
const crypto = require("crypto");

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, "users") private userModel: Model<UserDocument>,
    @InjectModel(Token.name, "tokens") private tokenModel: Model<TokenDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async find(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: mongoose.Schema.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }

  async updateUser(
    id: mongoose.Schema.Types.ObjectId,
    updateUser: UserUpdateDto
  ): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("User Does Not Exist");
    }
    Object.assign(user, updateUser);
    await user.save();
    return user;
  }

  async deleteUserById(id: mongoose.Schema.Types.ObjectId) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("User Does Not Exist");
    }
    await user.remove();
  }

  async checkadmin(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user.admin) {
      return false;
    }
    return true;
  }

  async entermail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    console.log('user',user)
    let token = await this.tokenModel.findOne({owner:user._id});
    if(!token){
      token =await new this.tokenModel({
        owner: user._id,
        token: await crypto.randomBytes(32).toString("hex"),
      });
      token.save();
    }
    const link = `http://localhost:3000/user/${user._id}/${token.token}`;
    await this.sendmail(user.email,link)
  }

  async sendmail(email: string,link:string) {
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
      subject: "Hello", // Subject line
      text: link, // plain text body
      // html body
    });
  }

  async forgetpassword(userid:string, token:string,password:string){

    const user =await this.userModel.findById(userid);
    if(!user){
      throw new HttpException("Link expired", HttpStatus.BAD_REQUEST);
    }
    const gettoken = await this.tokenModel.findOne({token});
    if(!gettoken){
       throw new HttpException("Link expired", HttpStatus.BAD_REQUEST);
    }
    user.password = password;
     await user.save();
    return 'Changed Successfully';
  }
}
