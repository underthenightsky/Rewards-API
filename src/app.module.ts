import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/rewards'), // Update your MongoDB URI
    RewardsModule,
  ],
})
export class AppModule {}
