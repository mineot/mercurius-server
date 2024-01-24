import { BadRequestException } from '@nestjs/common';
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

  it('hash text null', async () => {
    try {
      await service.hash(null);
      fail('text cannot be null');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('hash text empty', async () => {
    try {
      await service.hash('');
      fail('text cannot be empty');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('check text null', async () => {
    try {
      await service.check(null, '123456789');
      fail('text cannot be null');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('check hashedText null', async () => {
    try {
      await service.check('123456789', null);
      fail('hashedText cannot be null');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('check text emtpy', async () => {
    try {
      await service.check('', '123456789');
      fail('text cannot be empty');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });

  it('check hashedText emtpy', async () => {
    try {
      await service.check('123456789', '');
      fail('hashedText cannot be empty');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });
});
