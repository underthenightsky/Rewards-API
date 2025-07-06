import { Test, TestingModule } from '@nestjs/testing';
import { RewardsService } from './rewards.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { Model } from 'mongoose';

describe('RewardsService', () => {
  let service: RewardsService;
  let userModel: any;
  let rewardOptionModel: any;
  let transactionModel: any;
  let rewardRedemptionModel: any;

  beforeEach(async () => {
    userModel = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    rewardOptionModel = {
      findById: jest.fn(),
    };
    transactionModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardsService,
        { provide: getModelToken('User'), useValue: userModel },
        {
          provide: getModelToken('RewardTransaction'),
          useValue: transactionModel,
        },
        { provide: getModelToken('RewardOption'), useValue: rewardOptionModel },
        {
          provide: getModelToken('RedeemOption'),
          useValue: rewardRedeemptionModel,
        },
      ],
    }).compile();

    service = module.get<RewardsService>(RewardsService);
  });

  it('should redeem reward successfully', async () => {
    const dto: RedeemRewardDto = {
      rewardType: 'voucher',

      pointsRedeemed: 120,

      userId: '12345678',
    };

    const mockUser = {
      rewardPoints: 100,
      save: jest.fn().mockResolvedValue({ rewardPoints: 50 }),
    };
    const mockRewardOption = { cost: 50, title: 'Gift Card' };

    userModel.findOne.mockResolvedValue(mockUser);
    rewardOptionModel.findById.mockResolvedValue(mockRewardOption);

    const result = await service.redeemReward(dto);

    expect(rewardOptionModel.findOne).toHaveBeenCalledWith({ userId: dto.userId });
    expect(mockUser.save).toHaveBeenCalled();
    expect(rewardRedemptionModel.create).toHaveBeenCalled();
    expect(result).toEqual({
      message: 'Reward redeemed successfully',
      remainingPoints: 50,
    });
  });

  it('should throw error if user not found', async () => {
    const dto: RedeemRewardDto = {
      rewardType: 'voucher',

      pointsRedeemed: 120,

      userId: '12345678',
    };
    userModel.findOne.mockResolvedValue(null);

    await expect(service.redeemReward(dto)).rejects.toThrow(NotFoundException);
  });

  it('should throw error if reward option not found', async () => {
    const dto: RedeemRewardDto = {
      rewardType: 'voucher',

      pointsRedeemed: 120,

      userId: '12345678',
    };
    userModel.findOne.mockResolvedValue({ rewardPoints: 100 });
    rewardOptionModel.findById.mockResolvedValue(null);

    await expect(service.redeemReward(dto)).rejects.toThrow(NotFoundException);
  });

  it('should throw error if user has insufficient points', async () => {
    const dto: RedeemRewardDto = {
      rewardType: 'voucher',

      pointsRedeemed: 120,

      userId: '12345678',
    };
    rewardOptionModel.findOne.mockResolvedValue({ rewardPoints: 30 });
   

    await expect(service.redeemReward(dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
