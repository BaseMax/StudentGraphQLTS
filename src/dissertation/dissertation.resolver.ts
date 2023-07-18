import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DissertationService } from './dissertation.service';
import { Dissertation } from './entities/dissertation.entity';
import { CreateDissertationInput } from './dto/create-dissertation.input';
import { UpdateDissertationInput } from './dto/update-dissertation.input';
import { GetCurrentUserId } from '../common/decorators/get-currnet-user-id.decorator';
import { AddFormInput } from '../seminar/dto/add-form.input';
import { Form } from '../seminar/entities/form.entity';

@Resolver(() => Dissertation)
export class DissertationResolver {
  constructor(private readonly dissertationService: DissertationService) {}

  @Mutation(() => Dissertation)
  createDissertation(
    @Args('createDissertationInput')
    createDissertationInput: CreateDissertationInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.dissertationService.create(userId, createDissertationInput);
  }

  @Mutation(() => Form)
  addForm(
    @Args('dissertationId') dissertationId: number,
    @Args('addFormInput') addFormInput: AddFormInput,
  ) {
    return this.dissertationService.addForm(dissertationId, addFormInput);
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
  updateDissertation(
    @Args('updateDissertationInput')
    updateDissertationInput: UpdateDissertationInput,
  ) {
    return this.dissertationService.update(
      updateDissertationInput.id,
      updateDissertationInput,
    );
  }

  @Mutation(() => Dissertation)
  removeDissertation(@Args('id', { type: () => Int }) id: number) {
    return this.dissertationService.remove(id);
  }
}
