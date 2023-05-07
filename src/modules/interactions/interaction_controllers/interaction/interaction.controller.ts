import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InteractionService } from '../../interaction_services/interaction/interaction.service';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { CommentEntity } from '../../comments/data_models/entities/comment_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { ReactionEntity } from '../../reactions/data_models/entities/reaction_entity';
import { ReplyEntity } from '../../replies/data_models/entities/reply_entity';
import { CreateCommentDTO } from '../../comments/data_models/dtos/create_comment_dto';
import { UpdateCommentDTO } from '../../comments/data_models/dtos/update_comment_dto';
import { CreateReactionDTO } from '../../reactions/data_models/dtos/create_reaction_dto';
import { UpdateReactionDTO } from '../../reactions/data_models/dtos/update_reaction_dto';
import { CreateReplyDTO } from '../../replies/data_models/dtos/create_reply_dto';
import { UpdateReplyDTO } from '../../replies/data_models/dtos/update_reply_dto';

@Controller('interaction')
export class InteractionController {

    constructor(
        private readonly interactionService: InteractionService) { }


    @Post('comment/create')
    createComment(@Body() createCommentDTO: CreateCommentDTO,
        @Query('serviceProviderId') serviceProviderId: number,
        @Query('serviceId') serviceId: number,
        @Query('postId') postId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.createComment(createCommentDTO,
                serviceProviderId as number,
                serviceId as number,
                postId as number));
        });
    }

    @Put('comment/update/:commentId')
    updateComment(@Body() updateCommentDTO: UpdateCommentDTO, @Param('commentId') commentId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.updateComment(updateCommentDTO, commentId as number));
        });
    }

    @Delete('comment/delete/:commentId')
    deleteComment(@Param('commentId') commentId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.deleteComment(commentId as number));
        });
    }

    @Get('comment/get')
    getComments(
        @Query('serviceId') serviceId: number,
        @Query('postId') postId: number): Promise<BaseReadResponse<CommentEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.getComments(serviceId as number, postId as number));
        });
    }

    @Post('reaction/create')
    createReaction(@Body() createReactionDTO: CreateReactionDTO,
        @Query('serviceProviderId') serviceProviderId: number,
        @Query('serviceId') serviceId: number,
        @Query('postId') postId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.createReaction(
                createReactionDTO,
                serviceProviderId as number,
                serviceId as number,
                postId as number));
        });
    }

    @Put('reaction/update/:reactionId')
    updateReaction(@Body() updateReactionDTO: UpdateReactionDTO,
        @Param('reactionId') reactionId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.updateReaction(updateReactionDTO, reactionId as number));
        });
    }

    @Delete('reaction/delete/:reactionId')
    deleteReaction(@Param('reactionId') reactionId)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.deleteReaction(reactionId as number));
        });
    }

    @Get('reaction/get')
    getReactions(
        @Query('serviceId') serviceId: number,
        @Query('postId') postId: number
    ): Promise<BaseReadResponse<ReactionEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.getReactions(
                serviceId as number,
                postId as number));
        });
    }

    @Post('reply/create')
    createReply(@Body() createReplyDTO: CreateReplyDTO,
        @Query('commentId') commentId: number,
        @Query('serviceProviderId') serviceProviderId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.createReply(
                createReplyDTO,
                commentId as number,
                serviceProviderId as number));
        });
    }

    @Put('reply/update/:replyId')
    updateReply(@Body() updateReplyDTO: UpdateReplyDTO,
        @Param('replyId') replyId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.updateReply(updateReplyDTO, replyId as number));
        });
    }

    @Delete('reply/delete/:replyId')
    deleteReply(@Param('replyId') replyId)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.deleteReply(replyId as number));
        });
    }

    @Get('reply/get/:commentId')
    getReplies(@Param('commentId') commentId): Promise<BaseReadResponse<ReplyEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.interactionService.getReplies(commentId as number));
        });
    }
}
