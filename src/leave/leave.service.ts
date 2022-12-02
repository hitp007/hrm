import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { getDefaultSettings } from 'http2';
import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateLeaveDto } from './dtos/create-leave.dto';
import { LeaveRequestDto } from './dtos/leave-request.dto';
import { UpdateLeaveDto } from './dtos/update-leave.dto';
import { Leave, LeaveDocument } from './schema/leave.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name, 'leaves') private leaveModel: Model<LeaveDocument>,
    private userService: UserService,
  ) {}

  async allleave(): Promise<Leave[]> {
    const leaves = await this.leaveModel.find();
    return leaves;
  }

  async findleave(id: mongoose.Schema.Types.ObjectId): Promise<Leave[]> {
    const leaves = await this.leaveModel.find({ owner: id });
    return leaves;
  }

  async applyleave(adminx:string,owner: mongoose.Schema.Types.ObjectId,createleave: CreateLeaveDto): Promise<Leave> {
    const admin = createleave.admin;
   if(adminx==='admin'){
    throw new HttpException(
      "User Dont Have Access To Edit for this Leave",
      HttpStatus.BAD_REQUEST
    );}
    if (!this.userService.checkadmin(admin)) {
      throw new HttpException('Please enter Valid Admin',HttpStatus.BAD_REQUEST);
    }
    
    if (createleave.start > createleave.end) {
      throw new HttpException('End Date Can not be Before Start',HttpStatus.BAD_REQUEST);
    }
    const newleave = new this.leaveModel(createleave);
    newleave.owner = owner;
    // console.log('her')
    await newleave.save();
    // console.log(newleave)
    return newleave;
  }
    
  checkleap(year:number){
      if((year%400==0) || (year%4==0 && year%100!=0)){
      return true;
      }
      return false;
    }

   getleavedays(start:Date ,end:Date ):number{
    let leap = this.checkleap(start.getFullYear())?29:28;
    let months = [31,leap,31,30,31,30,31,31,30,31,30,31];
    let daysCount = 0;
     
    while(start <= end){
        let day = start.getDay();
        if(!(day==0 || day==6)){daysCount++;}
        let date= start.getDate();
        let month= start.getMonth();
        if (months[month] == date) {
          date = 1;
          start.setDate(date);
          start.setMonth(start.getMonth() + 1);
          if (month == 11) {
            start.setFullYear(start.getFullYear() + 1);
            leap = this.checkleap(start.getFullYear()) ? 29 : 28;
          }
        } else {
          date++;
          start.setDate(date);
        }
    }
       return daysCount;
  }

  async approveleave(leaverequest: LeaveRequestDto) {
    const leave = await this.leaveModel.findById(leaverequest.id);
    if (!leaverequest.approve) {
      leave.approve = false;
    } else {
      if (!leave.approve) {
        leave.approve = true;
        const user = await this.userService.getUserById(leave.owner);
        let daysleave = this.getleavedays(leave.start,leave.end);
        if(leave.subject == "half"){daysleave = daysleave /2;}
        user.availeave = user.availeave - daysleave;
        user.usedleave = user.usedleave + daysleave;
        await leave.save();
      }
    }
  }

  async updateleave(owner:boolean,userid: mongoose.Schema.Types.ObjectId,leaveid: mongoose.Schema.Types.ObjectId,editdata: UpdateLeaveDto): Promise<Leave> {
    const leave = await this.leaveModel.findById(leaveid);
    if (!owner && userid.toString() !== leave.owner.toString()) {
      throw new HttpException('User Dont Have Access To Edit for this Leave',HttpStatus.BAD_REQUEST);
    }
    Object.assign(leave, editdata);
    await leave.save();
    return leave;
  }

  async deleteleave(userid: mongoose.Schema.Types.ObjectId,leaveid: mongoose.Schema.Types.ObjectId) {
    const leave = await this.leaveModel.findById(leaveid);
    if (userid.toString() !== leave.owner.toString()) {
      throw new HttpException('User Dont Have Access To Edit for this Leave',HttpStatus.BAD_REQUEST);
    }
    await leave.remove();
  }
}
