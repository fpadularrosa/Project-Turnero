import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>){}
  
  async create(createUserDto: CreateUserDto) {
    return await this.userModule.create(createUserDto);
  }

  async findAll() {
    return await this.userModule.find({});
  }

  async findOne(id: number) {
    const user = await this.userModule.findById(id)
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let userUpdated = await this.userModule.findByIdAndUpdate(id, updateUserDto, { new:true });
    const user = userUpdated.toJSON();
    delete user.password;
    return user;
  }

  async remove(id: number) {
    return await this.userModule.findByIdAndDelete(id);
  }
}
