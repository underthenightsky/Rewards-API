import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  RewardTransaction,
  RewardTransactionDocument,
} from './schemas/reward-transaction.schema';
import {
  RewardOption,
  RewardOptionDocument,
} from './schemas/reward-option.schema';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import {
  RewardRedemption,
  RewardRedemptionDocument,
} from './schemas/redemptions_model';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RewardTransaction.name)
    private transactionModel: Model<RewardTransactionDocument>,
    @InjectModel(RewardOption.name)
    private rewardOptionModel: Model<RewardOptionDocument>,
    @InjectModel(RewardRedemption.name)
    private rewardRedemptionModel: Model<RewardRedemptionDocument>,
  ) {}

  async getRewardPoints(userId: string) {
    const user = await this.rewardOptionModel.findOne({ userId: userId });
    if (!user) throw new NotFoundException('User not found');
    return { rewardPoints: user.totalPoints };
  }

  async getTransactions(userId: string) {
    const user = await this.userModel.findOne({ userId: userId });
    if (!user) throw new NotFoundException('User not found');

    const transactions = await this.transactionModel
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(5);
    return transactions;
  }

  async getRewardOptions(userId: string) {
    return this.rewardOptionModel.find({ userId: userId });
  }

  async redeemReward(dto: RedeemRewardDto) {
    const user = await this.rewardOptionModel.findOne({ userId: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    // const rewardOption = await this.rewardOptionModel.findById(
    //   dto.rewardOptionId,
    // );
    // if (!rewardOption) throw new NotFoundException('Reward option not found');

    if (user.totalPoints < dto.pointsRedeemed) {
      throw new BadRequestException('Insufficient reward points');
    }

    user.totalPoints -= dto.pointsRedeemed;
    await user.save();

    await this.rewardRedemptionModel.create({
      userId: dto.userId,
      pointsRedeemed: dto.pointsRedeemed,
      rewardType: `${dto.rewardType}`,
    });

    return {
      message: 'Reward redeemed successfully',
      remainingPoints: user.totalPoints,
    };
  }
}
