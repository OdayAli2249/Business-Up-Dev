import { Injectable } from '@nestjs/common';
import { CommentValidator } from '../comment_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateCommentDTO } from '../../../data_models/dtos/create_comment_dto';
import { UpdateCommentDTO } from '../../../data_models/dtos/update_comment_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { Comment } from 'src/data/database/models/comment';
import { CommentValidationErrors } from '../../../helpers/constant';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';

@Injectable()
export class CommentValidatorImpl extends CoreValidatorImpl implements CommentValidator {
    constructor(private readonly database: Db) {
        super()
    }
    noCommentCreationBlocked(param: BaseParam<CreateCommentDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary comment creation now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            resolve(ValidationResult.buildSuccess())
        });
    }
    canUpdateComment(param: BaseParam<UpdateCommentDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary comment update now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let comment = await Comment.findOne({ where: { id: param.getPathParam()['commentId'] } })

            resolve(comment && comment.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    CommentValidationErrors.CAN_NOT_UPDATE_COMMMENT,
                    ProcessReult.failure,
                    'comment', 'update', {}))
        });
    }
    canDeleteComment(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary comment delete now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let comment = await Comment.findOne({ where: { id: param.getPathParam()['commentId'] } })

            resolve(comment && comment.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    CommentValidationErrors.CAN_NOT_DELETE_COMMENT,
                    ProcessReult.failure,
                    'comment', 'delete', {}))
        });
    }
    noCommentsDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary comment display now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            resolve(ValidationResult.buildSuccess())
        });
    }
}
