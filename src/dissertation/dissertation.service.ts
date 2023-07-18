import { Injectable } from '@nestjs/common';
import { CreateDissertationInput } from './dto/create-dissertation.input';
import { UpdateDissertationInput } from './dto/update-dissertation.input';
import { PrismaService } from '../prisma/prisma.service';
import { AddFormInput } from '../seminar/dto/add-form.input';

@Injectable()
export class DissertationService {
  constructor(private readonly prisma: PrismaService) {}

  addForm(dissertationId: number, addFormInput: AddFormInput) {
    return this.prisma.form.create({
      data: {
        ...addFormInput,
        Dissertation: {
          connect: {
            id: dissertationId,
          },
        },
      },
    });
  }

  create(userId: number, createDissertationInput: CreateDissertationInput) {
    return this.prisma.dissertation.create({
      data: {
        ...createDissertationInput,
        student: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.dissertation.findMany({});
  }

  findOne(id: number) {
    return this.prisma.dissertation.findUnique({ where: { id } });
  }

  update(id: number, updateDissertationInput: UpdateDissertationInput) {
    return this.prisma.dissertation.update({
      where: { id },
      data: updateDissertationInput,
    });
  }

  remove(id: number) {
    return this.prisma.dissertation.delete({ where: { id } });
  }
}
