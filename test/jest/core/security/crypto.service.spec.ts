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

  it('hash text null', () =>
    expect(service.hash(null)).rejects.toBeInstanceOf(BadRequestException));

  it('hash text empty', () =>
    expect(service.hash('')).rejects.toBeInstanceOf(BadRequestException));

  it('check text null', () =>
    expect(service.check(null, '123456789')).rejects.toBeInstanceOf(
      BadRequestException,
    ));

  it('check hashedText null', () =>
    expect(service.check('123456789', null)).rejects.toBeInstanceOf(
      BadRequestException,
    ));

  it('check text emtpy', () =>
    expect(service.check('', '123456789')).rejects.toBeInstanceOf(
      BadRequestException,
    ));

  it('check hashedText emtpy', () =>
    expect(service.check('123456789', '')).rejects.toBeInstanceOf(
      BadRequestException,
    ));
});
