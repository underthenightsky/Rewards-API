import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { ApiTags, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('Rewards')
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('points')
  @ApiQuery({ name: 'userId', required: true, example: '12345678' })
  @ApiResponse({
    status: 200,
    description: 'Total reward points',
    schema: { example: { rewardPoints: 100 } },
  })
  getRewardPoints(@Query('userId') userId: string) {
    return this.rewardsService.getRewardPoints(userId);
  }

  @Get('transactions')
  @ApiQuery({ name: 'userId', required: true, example: '12345678' })
  @ApiResponse({ status: 200, description: 'List of last 5 transactions' })
  getTransactions(@Query('userId') userId: string) {
    return this.rewardsService.getTransactions(userId);
  }

  @Get('options')
  @ApiResponse({ status: 200, description: 'Available reward options' })
  getRewardOptions(@Query('userId') userId: string) {
    return this.rewardsService.getRewardOptions(userId);
  }

  @Post('redeem')
  @ApiBody({
    schema: {
      example: {
        rewardType: 'voucher',

        pointsRedeemed: 120,

        userId: '12345678',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Reward redeemed successfully' })
  redeemReward(@Body() redeemRewardDto: RedeemRewardDto) {
    return this.rewardsService.redeemReward(redeemRewardDto);
  }
}
