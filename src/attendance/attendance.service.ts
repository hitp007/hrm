import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name, "attendances")
    private attendanceModel: Model<AttendanceDocument>
  ) {}


  async intime(owner: string):Promise<Attendance> {
     const time = Date.now();
    const inTime = new Date(Date.now() + 19800000);
    console.log(inTime,time);
    const date = new Date(inTime.getFullYear(),inTime.getMonth(),inTime.getDate() + 1);
    const checkAlreadyInOrNot = await this.attendanceModel.findOne({ date, owner });
    if(checkAlreadyInOrNot){
      throw new HttpException("Already In", HttpStatus.BAD_REQUEST);
    }
    const attendance = new this.attendanceModel({date,inTime,owner});
    await attendance.save();
    return attendance;
  }

  async totalhoursforuser(owner: string) {
    const attendances = await this.attendanceModel.find({ owner });
    let time = 0;
    attendances.forEach((attendance) => {
      if (attendance.todaytime) {
        time += attendance.todaytime;
      }
    });
    return this.showinhourandminute(time);
  }

  eachUserTimeById(attendances){
    const arr = {};
    attendances.forEach((attendance) => {
      if (attendance.todaytime) {
        if (!arr[attendance._id]) arr[attendance._id] = attendance.todaytime;
      } else {
        arr[attendance._id] += attendance.todaytime;
      }
    });
    return arr;
  };

  async totalhoursforAll() {  
    const finalarr = [];
    const attendances = await this.attendanceModel.find();
    const eachUser = this.eachUserTimeById(attendances);
    for (const user in eachUser) {
      finalarr.push({
        user,
        totaltime: this.showinhourandminute(eachUser[user]),
      });
    }
    return finalarr;
  }

  async outtime(owner: string) {
    const outTime = new Date(Date.now() + 19800000);
    const date: Date = new Date(outTime.getFullYear(),outTime.getMonth(),outTime.getDate() + 1);
    const attendance = await this.attendanceModel.findOne({ date,owner });
    if(attendance.outTime!==undefined){
      throw new HttpException("Already Out", HttpStatus.BAD_REQUEST);
    }
    const inTime = attendance.inTime;
    const todaytime = outTime.getTime() - inTime.getTime();
    attendance.todaytime = todaytime;
    attendance.outTime = outTime;
    await attendance.save();
    return attendance;
  }

  showinhourandminute(num: number) {
    const hours = Math.floor((num / (60 * 60 * 1000)) % (60 * 60 * 1000));
    const minutes = Math.floor((num / (60 * 1000)) % (60 * 1000));
    return { hours, minutes };
  }
}
