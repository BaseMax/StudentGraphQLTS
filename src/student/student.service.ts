import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PrismaService } from '../prisma/prisma.service';
import { CompleteProfileInput } from './dto/compelete-profile.input';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  completeProfile(userId: number, completeProfileInput: CompleteProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...completeProfileInput,
        User: {
          connect: { id: userId },
        },
      },
    });
  }

  getAllDismissedStudents() {
    return this.prisma.user.findMany({
      where: {
        status: 'dismissal',
      },
    });
  }

  getAllGraduateStudents() {
    return this.prisma.user.findMany({
      where: {
        status: 'graduated',
      },
    });
  }

  selectSupervisor(supervisorId: number, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        supervisor: {
          connect: { id: supervisorId },
        },
      },
    });
  }

  create(createStudentInput: CreateStudentInput) {
    return this.prisma.user.create({
      data: createStudentInput,
    });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateStudentInput,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
