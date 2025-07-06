import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type RewardTransactionDocument = RewardTransaction & Document;

@Schema({ timestamps: true })
export class RewardTransaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true, enum: ['voucher', 'cashback'] })
  category: string;
  @Prop({ required: true })
  pointsEarned: number;
}
export const RewardTransactionSchema =
  SchemaFactory.createForClass(RewardTransaction);
