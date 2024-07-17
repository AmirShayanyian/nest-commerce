import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeEntity } from '../entities/attribute.entity';
import { Repository } from 'typeorm';
import { CreateAttributeDto, DicDto } from '../dtos/attributes/create-attribute.dto';
import { ProductService } from './product.service';
import { PublicMessages } from 'src/common/enums/messages.enum';

export class AttributeService {
  constructor(
    @InjectRepository(ProductAttributeEntity) private attributeRepository: Repository<ProductAttributeEntity>,
    private productService: ProductService
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const { attributes, productId } = createAttributeDto;
    await this.productService.findById(+productId);
    let attribute: DicDto;
    attributes.map(async (obj) => {
      attribute = this.attributeRepository.create({ key: obj.key, value: obj.value, productId });
      await this.attributeRepository.save(attribute);
    });
    return { message: PublicMessages.Created };
  }
}
