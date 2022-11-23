"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const token_schema_1 = require("./schema/token.schema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
let UserService = class UserService {
    constructor(userModel, tokenModel) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
    }
    async create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return createdUser;
    }
    async findAll() {
        return this.userModel.find({ isactive: true }).exec();
    }
    async find(email) {
        const user = await this.userModel.findOne({ email, isactive: true });
        return user;
    }
    async getUserById(id) {
        const user = await this.userModel.findOne({ _id: id, isactive: true });
        if (!user) {
            throw new Error("user not found");
        }
        return user;
    }
    async updateUser(id, updateUser) {
        const user = await this.userModel.findOne({ _id: id, isactive: true });
        if (!user) {
            throw new common_1.NotFoundException("User Does Not Exist");
        }
        Object.assign(user, updateUser);
        await user.save();
        return user;
    }
    async deleteUserById(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException("User Does Not Exist");
        }
        user.isactive = false;
        await user.save();
    }
    async checkadmin(email) {
        const user = await this.userModel.findOne({ email, isactive: true });
        if (!user) {
            throw new common_1.NotFoundException("Admin Not Found");
        }
        if (!user.admin) {
            return false;
        }
        return true;
    }
    async entermail(email) {
        const user = await this.userModel.findOne({ email, isactive: true });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
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
    async sendmail(email, link) {
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
            from: "hitpatelp79@gmail.com",
            to: email,
            subject: "Change PassWord",
            text: this.formatEmail(link),
        });
    }
    formatEmail(link) {
        return `This is Link To Change Password , If You Want To Change Please Enter Link        ${link}`;
    }
    async forgetpassword(userid, token, password) {
        const user = await this.userModel.findOne({ _id: userid, isactive: true });
        if (!user) {
            throw new common_1.HttpException("Link expired", common_1.HttpStatus.BAD_REQUEST);
        }
        const gettoken = await this.tokenModel.findOne({ token });
        if (!gettoken) {
            throw new common_1.HttpException("Link expired", common_1.HttpStatus.BAD_REQUEST);
        }
        user.password = password;
        await user.save();
        return 'Changed Successfully';
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name, "users")),
    __param(1, (0, mongoose_2.InjectModel)(token_schema_1.Token.name, "tokens")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map