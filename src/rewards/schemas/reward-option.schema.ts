import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type RewardOptionDocument = RewardOption & Document;
@Schema()
export class RewardOption {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  totalPoints: number;
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RewardOptionSchema = SchemaFactory.createForClass(RewardOption);
