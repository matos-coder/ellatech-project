import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';
import { AdjustProductDto } from './dto/adjust-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ResponseDto,
  })
  @ApiBody({
    type: CreateProductDto,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return {
      success: true,
      message: 'Product created successfully',
      code: HttpStatus.CREATED,
      data: product,
    };
  }

  @Put('/products/adjust/:id') // Responds to PUT /products/adjust/some-id
  @HttpCode(HttpStatus.OK)
  adjust(
    @Param('id') id: string,
    @Body() adjustProductDto: AdjustProductDto,
  ) {
    return this.productService.adjust(id, adjustProductDto);
  }

  @Get('status/:id') // Responds to GET /products/status/some-id
  getStatus(@Param('id') id: string) {
    return this.productService.getStatus(id);
  }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
