import { Injectable } from '@nestjs/common';
import { CreateSeminarInput } from './dto/create-seminar.input';
import { UpdateSeminarInput } from './dto/update-seminar.input';
import { PrismaService } from '../prisma/prisma.service';
import { AddFormInput } from './dto/add-form.input';

@Injectable()
export class SeminarService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createSeminarInput: CreateSeminarInput) {
    return this.prisma.seminar.create({
      data: {
        ...createSeminarInput,
        User: {
          connect: { id: userId },
        },
      },
    });
  }

  addForm(seminarId: number, addFormInput: AddFormInput) {
    return this.prisma.form.create({
      data: {
        ...addFormInput,
        Seminar: {
          connect: {
            id: seminarId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.seminar.findMany({});
  }

  findOne(id: number) {
    return this.prisma.seminar.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSeminarInput: UpdateSeminarInput) {
    return this.prisma.seminar.update({
      where: { id },
      data: updateSeminarInput,
    });
  }

  remove(id: number) {
    return this.prisma.seminar.delete({ where: { id } });
  }
}
