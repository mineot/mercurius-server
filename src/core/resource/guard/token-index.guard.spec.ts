import { TokenService } from '@/core/security/token.service';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  ContextType,
  HttpArgumentsHost,
  RpcArgumentsHost,
  Type,
  WsArgumentsHost,
} from '@nestjs/common/interfaces';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenIndexGuard } from './token-index.guard';

@Injectable()
class MockHttpArgumentsHost implements HttpArgumentsHost {
  getClass() {}

  getRequest<T = any>(): T {
    return {} as T;
  }

  getResponse<T = any>(): T {
    return {} as T;
  }

  getNext<T = any>(): T {
    return {} as T;
  }
}

@Injectable()
class MockExecutionContext implements ExecutionContext {
  constructor(private readonly request: any) {}
  getClass<T = any>(): Type<T> {
    throw new Error('Method not implemented.');
  }

  getHandler(): any {
    throw new Error('Method not implemented.');
  }

  getArgs<T extends any[] = any[]>(): T {
    throw new Error('Method not implemented.');
  }

  getArgByIndex<T = any>(index: number): T {
    console.log(index);
    throw new Error('Method not implemented.');
  }

  switchToRpc(): RpcArgumentsHost {
    throw new Error('Method not implemented.');
  }

  switchToWs(): WsArgumentsHost {
    throw new Error('Method not implemented.');
  }

  getType<TContext extends string = ContextType>(): TContext {
    throw new Error('Method not implemented.');
  }

  switchToHttp() {
    return new MockHttpArgumentsHost();
  }

  getRequest() {
    return this.request;
  }
}

describe('TokenService', () => {
  let service: TokenService;
  let guard: TokenIndexGuard;

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
    guard = new TokenIndexGuard(service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(guard).toBeDefined();
  });

  it('should allow access when the token is valid', async () => {
    const request = { headers: { authorization: 'Bearer 123.456.789' } };
    const context = new MockExecutionContext(request);

    jest.spyOn(guard, 'canActivate').mockResolvedValue(true);
    service.verifyIndex = jest.fn().mockReturnValue(Promise.resolve(true));

    const canActivate = await guard.canActivate(context);
    expect(canActivate).toBeTruthy();
  });

  it('should deny access when the token is invalid', async () => {
    const request = { headers: { authorization: 'Bearer 123.456.789' } };
    const context = new MockExecutionContext(request);

    service.verifyIndex = jest.fn().mockReturnValue(Promise.resolve(false));

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should throw an error when the token is missing', async () => {
    const request = { headers: {} };
    const context = new MockExecutionContext(request);

    service.verifyIndex = jest.fn().mockReturnValue(Promise.resolve(false));

    await expect(guard.canActivate(context)).rejects.toThrow('unauthorized');

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('should throw an error when the bearer is missing', async () => {
    const request = { headers: { authorization: 'Aearer 123.456.789' } };
    const context = new MockExecutionContext(request);

    service.verifyIndex = jest.fn().mockReturnValue(Promise.resolve(false));

    await expect(guard.canActivate(context)).rejects.toThrow('unauthorized');

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });
});
