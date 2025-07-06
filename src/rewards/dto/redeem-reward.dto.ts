import { IsMongoId, IsString, IsInt } from 'class-validator';

export class RedeemRewardDto {
  @IsString()
  rewardType: string;
  @IsInt()
  pointsRedeemed: number;

  @IsMongoId()
  userId: string;
}
