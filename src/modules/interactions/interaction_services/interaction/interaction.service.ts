import { Injectable } from '@nestjs/common';
import { CommentRepositoryImpl } from '../../comments/repository/comment_repository_impl/comment_repository_impl';
import { ReactionRepositoryImpl } from '../../reactions/repository/reaction_repository_impl/reaction_repository_impl';
import { ReplyRepositoryImpl } from '../../replies/repository/reply_repository_impl/reply_repository_impl';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { CommentEntity } from '../../comments/data_models/entities/comment_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { ReactionEntity } from '../../reactions/data_models/entities/reaction_entity';
import { ReplyEntity } from '../../replies/data_models/entities/reply_entity';
import { CreateCommentDTO } from '../../comments/data_models/dtos/create_comment_dto';
import { UpdateCommentDTO } from '../../comments/data_models/dtos/update_comment_dto';
import { UpdateReactionDTO } from '../../reactions/data_models/dtos/update_reaction_dto';

@Injectable()
export class InteractionService {

    constructor(
        private readonly commentRepository: CommentRepositoryImpl,
        private readonly reactionRepository: ReactionRepositoryImpl,
        private readonly replyRepository: ReplyRepositoryImpl) { }

    createComment(createCommentDTO: CreateCommentDTO,
        serviceProviderId: number,
        serviceId: number,
        postId: number): Promise<BaseCreateResponse | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['serviceProviderId'] = serviceProviderId;
        queryParam['serviceId'] = serviceId;
        queryParam['postId'] = postId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.commentRepository.createComment(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateComment(updateCommentDTO: UpdateCommentDTO, commentId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['commentId'] = commentId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateCommentDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.commentRepository.updateComment(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteComment(commentId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['commentId'] = commentId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.commentRepository.deleteComment(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getComments(serviceId: number, postId: number)
        : Promise<BaseReadResponse<CommentEntity> | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['postId'] = postId;
        queryParam['serviceId'] = serviceId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<CommentEntity>>;
            request = await this.commentRepository.getComments(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }


    createReaction(
        createReactionDTO,
        serviceProviderId: number,
        serviceId: number,
        postId: number): Promise<BaseCreateResponse | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['serviceProviderId'] = serviceProviderId;
        queryParam['serviceId'] = serviceId;
        queryParam['postId'] = postId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: createReactionDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.reactionRepository.createReaction(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateReaction(updateReactionDTO: UpdateReactionDTO, reactionId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['reactionId'] = reactionId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateReactionDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.reactionRepository.updateReaction(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteReaction(reactionId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['reactionId'] = reactionId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.reactionRepository.deleteReaction(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getReactions(
        serviceId: number,
        postId: number)
        : Promise<BaseReadResponse<ReactionEntity> | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['serviceId'] = serviceId;
        queryParam['postId'] = postId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ReactionEntity>>;
            request = await this.reactionRepository.getReactions(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }


    createReply(
        createReplyDTO,
        commentId: number,
        serviceProviderId: number): Promise<BaseCreateResponse | Failure> {
        let queryParam = new Map<string, any>();
        queryParam['commentId'] = commentId;
        queryParam['serviceProviderId'] = serviceProviderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: queryParam,
            data: createReplyDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.replyRepository.createReply(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateReply(replyId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['replyId'] = 'replyId';
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.replyRepository.updateReply(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteReply(replyId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['replyId'] = replyId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.replyRepository.deleteReply(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getReplies(commentId: number)
        : Promise<BaseReadResponse<ReplyEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['commentId'] = commentId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ReplyEntity>>;
            request = await this.replyRepository.getReplies(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }
}
