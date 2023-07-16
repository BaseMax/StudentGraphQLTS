import { Injectable } from '@nestjs/common';
import { CreateSeminarInput } from './dto/create-seminar.input';
import { UpdateSeminarInput } from './dto/update-seminar.input';

@Injectable()
export class SeminarService {
  create(createSeminarInput: CreateSeminarInput) {
    return 'This action adds a new seminar';
  }

  findAll() {
    return `This action returns all seminar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seminar`;
  }

  update(id: number, updateSeminarInput: UpdateSeminarInput) {
    return `This action updates a #${id} seminar`;
  }

  remove(id: number) {
    return `This action removes a #${id} seminar`;
  }
}
