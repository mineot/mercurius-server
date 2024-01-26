import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
      imports: [
        JwtModule.register({
          secret: '123456789123456789123456789123456789',
        }),
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sign and verify index', async () => {
    const token = await service.signIndex();
    const result = await service.verifyIndex(token);
    expect(result).toBe(true);
  });
});
