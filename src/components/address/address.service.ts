import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindOneOptions } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { AddressRepository } from './address.repository';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly configService: ConfigService,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    return this.addressRepository.save(createAddressDto);
  }

  findAll(user: User) {
    return this.addressRepository.find({ where: { userId: user.id } });
  }

  findOne(findOneOptions: FindOneOptions): Promise<Address> {
    return this.addressRepository.findOne(findOneOptions);
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const addressToUpdate = await this.addressRepository.findOne({
      where: { id: id, userId: updateAddressDto.userId },
    });
    if (!addressToUpdate?.id) return `There is no address with id #${id}`;
    await this.addressRepository.update(id, updateAddressDto);
    return this.addressRepository.findOne({
      where: { id: id, userId: updateAddressDto.userId },
    });
  }

  async remove(id: number, userId: number) {
    const addressToDelete = await this.addressRepository.findOne({
      where: { id: id, userId: userId },
    });

    if (addressToDelete?.id) {
      await this.addressRepository.delete(id);
      return `The address with the id #${id} was removed`;
    } else {
      return `There is no address with id #${id}`;
    }
  }
}
