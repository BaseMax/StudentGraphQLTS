import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { PubSub } from 'graphql-subscriptions';
import { CreateConversationInput } from './dto/create-conversation.input';
import { GetCurrentUserId } from '../common/decorators/get-currnet-user-id.decorator';
import { Message } from './entities/message.entity';

@Resolver(() => Conversation)
export class ConversationResolver {
  private pubSub: PubSub;
  constructor(private readonly conversationService: ConversationService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => Conversation)
  createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
    @GetCurrentUserId() userId: number,
  ) {
    return this.conversationService.create(+userId, createConversationInput);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId') conversationId: number,
    @Args('sender') sender: string,
    @Args('text') text: string,
    @Args('file', { nullable: true }) file?: string,
  ) {
    return this.conversationService.sendMessage(
      conversationId,
      sender,
      text,
      file,
    );
  }

  @Query(() => [Message])
  getConversationMessages(@Args('conversationId') conversationId: number) {
    return this.conversationService.receiveAllMessages(conversationId);
  }

  @Query(() => [Conversation], { name: 'getMyConversations' })
  getMyConversation(@GetCurrentUserId() userId: number) {
    return this.conversationService.findMyConversation(+userId);
  }

  @Query(() => Conversation, { name: 'conversation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.conversationService.findOne(id);
  }

  @Mutation(() => Conversation)
  removeConversation(@Args('id', { type: () => Int }) id: number) {
    return this.conversationService.remove(id);
  }
}
