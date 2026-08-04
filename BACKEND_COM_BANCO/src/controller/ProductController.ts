import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Product } from "../models/Product";

export class ProductController {

    static async getProducts(req: Request, res: Response): Promise<Response> {

        const repository = AppDataSource.getRepository(Product);

        const products = await repository.find({
            relations: {
                category: true
            }
        });

        return res.status(200).json(products);
    }

}