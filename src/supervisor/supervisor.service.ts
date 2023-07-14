import { Injectable } from '@nestjs/common';
import { CreateSupervisorInput } from './dto/create-supervisor.input';
import { UpdateSupervisorInput } from './dto/update-supervisor.input';

@Injectable()
export class SupervisorService {
  create(createSupervisorInput: CreateSupervisorInput) {
    return 'This action adds a new supervisor';
  }

  findAll() {
    return `This action returns all supervisor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supervisor`;
  }

  update(id: number, updateSupervisorInput: UpdateSupervisorInput) {
    return `This action updates a #${id} supervisor`;
  }

  remove(id: number) {
    return `This action removes a #${id} supervisor`;
  }
}
