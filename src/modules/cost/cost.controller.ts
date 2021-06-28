import { Body, Controller, Post } from '@nestjs/common';
import { CostDto } from './cost.dto';
import { CostService } from './cost.service';

@Controller('cost')
export class CostController {
  constructor(private readonly costService: CostService) {}

  @Post()
  public async calculateCost(@Body() costDto: CostDto) {
    return await this.costService.calculateCost(costDto);
  }
}
