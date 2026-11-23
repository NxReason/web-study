import {
  Body,
  Controller,
  Get,
  HttpCode,
  Optional,
  Param,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './items.dtos.js';
import { ItemsService } from './items.service.js';

@Controller('items')
export class ItemsController {
  constructor(@Optional() private itemsService: ItemsService) {}

  @Post()
  create(@Body() dto: CreateItemDto): string {
    console.log(dto);
    this.itemsService.create(dto);
    return 'Item Created';
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    console.log(typeof id);
    return `Item with id: ${id}`;
  }

  @Get('foo')
  findFoo() {
    return 'Items foo';
  }

  @Get('foo/{*rest}')
  @HttpCode(404)
  notFound(@Param('rest') rest: string): string {
    return `Not found items endpoint: ${rest}`;
  }
}
