import { Injectable } from '@nestjs/common';
import { CreateSupervisorInput } from './dto/create-supervisor.input';
import { UpdateSupervisorInput } from './dto/update-supervisor.input';
import { PrismaService } from '../prisma/prisma.service';

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

  findAll() {
    return this.prisma.supervisor.findMany({});
  }

  findOne(id: number) {
    return this.prisma.supervisor.findUnique({ where: { id } });
  }

  update(id: number, updateSupervisorInput: UpdateSupervisorInput) {
    return this.prisma.supervisor.update({
      where: { id },
      data: updateSupervisorInput,
    });
  }

  remove(id: number) {
    return this.prisma.supervisor.delete({ where: { id } });
  }
}
