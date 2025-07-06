import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { User, UserSchema } from './schemas/user.schema';
import {
  RewardTransaction,
  RewardTransactionSchema,
} from './schemas/reward-transaction.schema';
import {
  RewardOption,
  RewardOptionSchema,
} from './schemas/reward-option.schema';
import {
  RewardRedemption,
  RewardRedemptionSchema,
} from './schemas/redemptions_model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RewardTransaction.name, schema: RewardTransactionSchema },
      { name: RewardOption.name, schema: RewardOptionSchema },
      { name: RewardRedemption.name, schema: RewardRedemptionSchema },
    ]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
