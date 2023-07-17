import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { GetCurrentUserId } from '../common/decorators/get-currnet-user-id.decorator';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { CompleteProfileInput } from './dto/compelete-profile.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  completeProfile(
    @Args('completeProfileInput') completeProfileInput: CompleteProfileInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.studentService.completeProfile(userId, completeProfileInput);
  }

  @Mutation(() => Student)
  selectSupervisor(
    @Args('supervisorId', { type: () => Int }) supervisorId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.studentService.selectSupervisor(supervisorId, userId);
  }

  @Query(() => [Student])
  @Roles(Role.admin)
  getAllGraduateStudents() {
    return this.studentService.getAllGraduateStudents();
  }

  @Query(() => [Student])
  @Roles(Role.admin)
  getAllDismissedStudents() {
    return this.studentService.getAllDismissedStudents();
  }

  @Mutation(() => Student)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [Student], { name: 'student' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
