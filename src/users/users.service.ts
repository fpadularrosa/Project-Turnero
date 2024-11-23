import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let userUpdated = await this.userRepository.findOne({ where: { id } });
    const { password, ...user } = userUpdated;
    return user;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
