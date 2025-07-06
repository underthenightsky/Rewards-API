import { Test, TestingModule } from '@nestjs/testing';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';

describe('RewardsController', () => {
  let controller: RewardsController;
  let service: RewardsService;

  beforeEach(async () => {
    const mockService = {
      getRewardPoints: jest.fn(),
      getTransactions: jest.fn(),
      getRewardOptions: jest.fn(),
      redeemReward: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsController],
      providers: [{ provide: RewardsService, useValue: mockService }],
    }).compile();

    controller = module.get<RewardsController>(RewardsController);
    service = module.get<RewardsService>(RewardsService);
  });

  it('should call getRewardPoints with correct email', async () => {
    const mockResponse = { rewardPoints: 150 };
    jest.spyOn(service, 'getRewardPoints').mockResolvedValue(mockResponse);

    const result = await controller.getRewardPoints('john@example.com');
    expect(service.getRewardPoints).toHaveBeenCalledWith('john@example.com');
    expect(result).toBe(mockResponse);
  });

  it('should call getTransactions with correct email', async () => {
    const mockResponse = [];
    jest.spyOn(service, 'getTransactions').mockResolvedValue(mockResponse);

    const result = await controller.getTransactions('john@example.com');
    expect(service.getTransactions).toHaveBeenCalledWith('john@example.com');
    expect(result).toBe(mockResponse);
  });

  it('should call getRewardOptions', async () => {
    const mockResponse = [{ title: 'Gift Card', cost: 50 }];
    jest.spyOn(service, 'getRewardOptions').mockResolvedValue(mockResponse);

    const result = await controller.getRewardOptions();
    expect(service.getRewardOptions).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });

  it('should call redeemReward with correct DTO', async () => {
    const dto: RedeemRewardDto = {
       rewardType: 'voucher',

      pointsRedeemed: 120,

      userId: '12345678',
    };
    const mockResponse = {
      message: 'Reward redeemed successfully',
      remainingPoints: 50,
    };

    jest.spyOn(service, 'redeemReward').mockResolvedValue(mockResponse);

    const result = await controller.redeemReward(dto);
    expect(service.redeemReward).toHaveBeenCalledWith(dto);
    expect(result).toBe(mockResponse);
  });
});
