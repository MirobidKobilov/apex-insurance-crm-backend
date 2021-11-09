import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: new Date(),
  })
  @ApiProperty()
  createdDate: Date;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  @ApiProperty()
  createdBy: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  @ApiProperty()
  createdIp: string;
  
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: null,
  })
  @ApiProperty()
  modifiedDate: Date;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  @ApiProperty()
  modifiedBy: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: null,
  })
  @ApiProperty()
  modifiedIp: string;

  @Column({ default: false })
  @ApiProperty()
  isDeleted: boolean;

  @Column({
    type: 'int',
    default: null,
  })
  @ApiProperty()
  parentId: number;

  @Column({
    type: 'int',
    default: null,
  })
  @ApiProperty()
  childId: number;

}