import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeminarService } from './seminar.service';
import { Seminar } from './entities/seminar.entity';
import { CreateSeminarInput } from './dto/create-seminar.input';
import { UpdateSeminarInput } from './dto/update-seminar.input';

@Resolver(() => Seminar)
export class SeminarResolver {
  constructor(private readonly seminarService: SeminarService) {}

  @Mutation(() => Seminar)
  createSeminar(@Args('createSeminarInput') createSeminarInput: CreateSeminarInput) {
    return this.seminarService.create(createSeminarInput);
  }

  @Query(() => [Seminar], { name: 'seminar' })
  findAll() {
    return this.seminarService.findAll();
  }

  @Query(() => Seminar, { name: 'seminar' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seminarService.findOne(id);
  }

  @Mutation(() => Seminar)
  updateSeminar(@Args('updateSeminarInput') updateSeminarInput: UpdateSeminarInput) {
    return this.seminarService.update(updateSeminarInput.id, updateSeminarInput);
  }

  @Mutation(() => Seminar)
  removeSeminar(@Args('id', { type: () => Int }) id: number) {
    return this.seminarService.remove(id);
  }
}
