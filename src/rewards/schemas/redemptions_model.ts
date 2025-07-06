import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type RewardRedemptionDocument = RewardRedemption & Document;
@Schema({ timestamps: true })
export class RewardRedemption {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  pointsRedeemed: number;
  @Prop({ required: true, enum: ['voucher', 'cashback'] })
  rewardType: string;
}

export const RewardRedemptionSchema =
  SchemaFactory.createForClass(RewardRedemption);
