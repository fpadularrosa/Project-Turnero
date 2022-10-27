import { Test, TestingModule } from '@nestjs/testing';
import { TurnsService } from './turns.service';

describe('TurnsService', () => {
  let service: TurnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnsService],
    }).compile();

    service = module.get<TurnsService>(TurnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
