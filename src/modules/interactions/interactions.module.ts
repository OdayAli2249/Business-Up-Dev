import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { RepliesModule } from './replies/replies.module';
import { CoreModule } from '../core/core.module';
import { InteractionController } from './interaction_controllers/interaction/interaction.controller';
import { InteractionService } from './interaction_services/interaction/interaction.service';

@Module({
    imports: [CommentsModule, ReactionsModule, RepliesModule, CoreModule],
    controllers: [InteractionController],
    providers: [InteractionService]
})
export class InteractionsModule {}
