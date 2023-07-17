import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SupervisorService } from './supervisor.service';
import { Supervisor } from './entities/supervisor.entity';
import { CreateSupervisorInput } from './dto/create-supervisor.input';
import { UpdateSupervisorInput } from './dto/update-supervisor.input';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Resolver(() => Supervisor)
export class SupervisorResolver {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Mutation(() => Supervisor)
  @Roles(Role.admin)
  createSupervisor(
    @Args('createSupervisorInput') createSupervisorInput: CreateSupervisorInput,
  ) {
    return this.supervisorService.create(createSupervisorInput);
  }

  @Query(() => [Supervisor], { name: 'supervisor' })
  findAll() {
    return this.supervisorService.findAll();
  }

  @Query(() => Supervisor, { name: 'supervisor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.supervisorService.findOne(id);
  }

  @Mutation(() => Supervisor)
  @Roles(Role.admin)
  updateSupervisor(
    @Args('updateSupervisorInput') updateSupervisorInput: UpdateSupervisorInput,
  ) {
    return this.supervisorService.update(
      updateSupervisorInput.id,
      updateSupervisorInput,
    );
  }

  @Mutation(() => Supervisor)
  @Roles(Role.admin)
  removeSupervisor(@Args('id', { type: () => Int }) id: number) {
    return this.supervisorService.remove(id);
  }
}
