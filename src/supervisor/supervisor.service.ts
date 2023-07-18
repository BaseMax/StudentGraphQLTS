import { Injectable } from '@nestjs/common';
import { CreateSupervisorInput } from './dto/create-supervisor.input';
import { UpdateSupervisorInput } from './dto/update-supervisor.input';
import { PrismaService } from '../prisma/prisma.service';
import { AddEducationalInput } from './dto/add-experience.Input';

@Injectable()
export class SupervisorService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSupervisorInput: CreateSupervisorInput) {
    return this.prisma.supervisor.create({
      data: {
        name: createSupervisorInput.name,
        phone: createSupervisorInput.phone,
        email: createSupervisorInput.email,
        googleScholar: createSupervisorInput.googleScholar,
      },
    });
  }

  addEducational(
    supervisorId: number,
    addEducationalInput: AddEducationalInput,
  ) {
    return this.prisma.educational.create({
      data: {
        ...addEducationalInput,
        Supervisor: {
          connect: { id: supervisorId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.supervisor.findMany({ include: { educational: true } });
  }

  findOne(id: number) {
    return this.prisma.supervisor.findUnique({
      where: { id },
      include: { educational: true },
    });
  }

  update(id: number, updateSupervisorInput: UpdateSupervisorInput) {
    return this.prisma.supervisor.update({
      where: { id },
      data: updateSupervisorInput,
      include: { educational: true },
    });
  }

  remove(id: number) {
    return this.prisma.supervisor.delete({ where: { id } });
  }
}
