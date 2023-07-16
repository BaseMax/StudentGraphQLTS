import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DissertationService } from './dissertation.service';
import { Dissertation } from './entities/dissertation.entity';
import { CreateDissertationInput } from './dto/create-dissertation.input';
import { UpdateDissertationInput } from './dto/update-dissertation.input';

@Resolver(() => Dissertation)
export class DissertationResolver {
  constructor(private readonly dissertationService: DissertationService) {}

  @Mutation(() => Dissertation)
  createDissertation(@Args('createDissertationInput') createDissertationInput: CreateDissertationInput) {
    return this.dissertationService.create(createDissertationInput);
  }

  @Query(() => [Dissertation], { name: 'dissertation' })
  findAll() {
    return this.dissertationService.findAll();
  }

  @Query(() => Dissertation, { name: 'dissertation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dissertationService.findOne(id);
  }

  @Mutation(() => Dissertation)
  updateDissertation(@Args('updateDissertationInput') updateDissertationInput: UpdateDissertationInput) {
    return this.dissertationService.update(updateDissertationInput.id, updateDissertationInput);
  }

  @Mutation(() => Dissertation)
  removeDissertation(@Args('id', { type: () => Int }) id: number) {
    return this.dissertationService.remove(id);
  }
}
