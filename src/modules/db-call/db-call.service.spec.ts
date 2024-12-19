import { Test, TestingModule } from '@nestjs/testing';
import { DbCallService } from './db-call.service';

describe('DbCallService', () => {
  let service: DbCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbCallService],
    }).compile();

    service = module.get<DbCallService>(DbCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
