import { AppDataSource } from "../config/dataSource";
import { Category } from "../models/Category";

export class CategoryService {

    private repository = AppDataSource.getRepository(Category);

    async findAll(): Promise<Category[]> {
        return await this.repository.find({
            relations: {
                products: true
            }
        });
    }

    async create(data: Partial<Category>): Promise<Category> {
        const category = this.repository.create(data);
        return await this.repository.save(category);
    }

}