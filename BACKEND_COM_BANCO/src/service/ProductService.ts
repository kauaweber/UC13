import { AppDataSource } from "../config/dataSource";
import { Product } from "../models/Product";

export class ProductService {

    private repository = AppDataSource.getRepository(Product);

    async findAll(): Promise<Product[]> {
        return await this.repository.find({
            relations: {
                category: true
            }
        });
    }

    async create(data: Partial<Product>): Promise<Product> {
        const product = this.repository.create(data);
        return await this.repository.save(product);
    }

}