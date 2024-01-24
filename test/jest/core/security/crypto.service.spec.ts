import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from '../../../../src/core/security/crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hash and check', async () => {
    const hashed = await service.hash('123456789');
    const result = await service.check('123456789', hashed);
    expect(result).toBe(true);
  });
});
