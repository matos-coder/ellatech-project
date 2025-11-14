import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User created successfully' })
  message: string;

  @ApiProperty({ example: 201 })
  code: number;

  @ApiProperty({
    example: {
      id: '56c0d8f6-36d7-4918-a879-eb7a3162041a',
      email: 'matias@test.com',
      name: 'Matias',
      createdAt: '2025-11-12T15:04:09.706Z',
    },
    description: 'Returned data payload',
    required: false,
  })
  data?: T;
}
