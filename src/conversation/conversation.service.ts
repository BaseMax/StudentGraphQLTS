import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}
  create(studentId: number, createConversationInput: CreateConversationInput) {
    return this.prisma.conversation.create({
      data: {
        title: createConversationInput.title,
        supervisor: {
          connect: { id: createConversationInput.supervisorId },
        },
        student: {
          connect: { id: studentId },
        },
      },
    });
  }

  findMyConversation(studentId: number) {
    return this.prisma.conversation.findMany({
      where: {
        studentId,
      },
    });
  }

  async sendMessage(
    conversationId: number,
    sender: string,
    text: string,
    file?: string,
  ) {
    const data: any = { conversationId, sender, text };

    if (file) {
      data.file = file;
    }

    return this.prisma.messages.create({ data });
  }

  receiveAllMessages(conversationId: number) {
    return this.prisma.messages.findMany({
      where: { conversationId },
    });
  }

  findOne(id: number) {
    return this.prisma.conversation.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.conversation.delete({ where: { id } });
  }
}
