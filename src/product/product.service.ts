import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { AdjustProductDto } from './dto/adjust-product.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class ProductService {


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {

    // const existingProduct = await this.productRepository.findOne({
    //   where: {
    //     name: ILike(createProductDto.name),
    //     status: ILike(createProductDto.status),
    //   },
    // });
    // if (existingProduct) {
    //   throw new ConflictException('Product with this name and status already exists');
    // }

    const newProduct = this.productRepository.create(createProductDto);

    return this.productRepository.save(newProduct);
  }

  async adjust(
    productId: string,
    adjustProductDto: AdjustProductDto,
  ): Promise<Product> {
    const { userId, quantity } = adjustProductDto;

    return this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOne(User, {
          where: { id: userId },
        });
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const product = await transactionalEntityManager.findOne(Product, {
          where: { id: productId },
          lock: { mode: 'pessimistic_write' },
        });
        if (!product) {
          throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        const newQuantity = product.quantity + quantity;
        if (newQuantity < 0) {
          throw new UnprocessableEntityException('Insufficient quantity');
        }

        product.quantity = newQuantity;
        await transactionalEntityManager.save(product);

        const transactionType = quantity < 0 ? 'sale' : 'restock';
        const transaction = transactionalEntityManager.create(Transaction, {
          product: product,
          user: user,
          quantity_adjusted: quantity,
          type: transactionType,
        });
        await transactionalEntityManager.save(transaction);

        return product;
      },
    );
  }

  async getStatus(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      select: ['id', 'status', 'quantity'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
