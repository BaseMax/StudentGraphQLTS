import { Injectable } from '@nestjs/common';
import { CreateDissertationInput } from './dto/create-dissertation.input';
import { UpdateDissertationInput } from './dto/update-dissertation.input';

@Injectable()
export class DissertationService {
  create(createDissertationInput: CreateDissertationInput) {
    return 'This action adds a new dissertation';
  }

  findAll() {
    return `This action returns all dissertation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dissertation`;
  }

  update(id: number, updateDissertationInput: UpdateDissertationInput) {
    return `This action updates a #${id} dissertation`;
  }

  remove(id: number) {
    return `This action removes a #${id} dissertation`;
  }
}
