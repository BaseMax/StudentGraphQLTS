import { Injectable } from '@nestjs/common';
import { CreateConversationInput } from './dto/create-conversation.input';
import { PrismaService } from '../prisma/prisma.service';
import { Sender } from '@prisma/client';

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
      include: { student: true, supervisor: true },
    });
  }

  findMyConversation(studentId: number) {
    return this.prisma.conversation.findMany({
      where: {
        studentId,
      },
      include: { student: true, supervisor: true },
    });
  }

  async sendMessage(
    conversationId: number,
    sender: Sender,
    text: string,
    file?: string,
  ) {
    const data: any = { conversationId, sender, text };

    if (file) {
      data.file = file;
    }

    return this.prisma.messages.create({
      data,
      include: { Conversation: true },
    });
  }

  receiveAllMessages(conversationId: number) {
    return this.prisma.messages.findMany({
      where: { conversationId },
      include: { Conversation: true },
    });
  }

  findOne(id: number) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: { messages: true, student: true, supervisor: true },
    });
  }

  remove(id: number) {
    return this.prisma.conversation.delete({ where: { id } });
  }
}
