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

  it('should be defined', () => expect(service).toBeDefined());

  it('hash and check', async () => {
    const hashed = await service.hash('123456789');
    const result = await service.check('123456789', hashed);
    expect(result).toBe(true);
  });

  it('hash text null', async () =>
    await expect(service.hash(null)).rejects.toThrow(
      'text cannot be null or empty',
    ));

  it('hash text empty', async () =>
    await expect(service.hash('')).rejects.toThrow(
      'text cannot be null or empty',
    ));

  it('check text null', async () =>
    await expect(service.check(null, '123456789')).rejects.toThrow(
      'text cannot be null or empty',
    ));

  it('check text emtpy', async () =>
    await expect(service.check('', '123456789')).rejects.toThrow(
      'text cannot be null or empty',
    ));

  it('check hashedText null', async () =>
    await expect(service.check('123456789', null)).rejects.toThrow(
      'hashedText cannot be null or empty',
    ));

  it('check hashedText emtpy', async () =>
    await expect(service.check('123456789', '')).rejects.toThrow(
      'hashedText cannot be null or empty',
    ));
});
