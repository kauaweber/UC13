import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";

export class ProductController {

    static async getProducts(req: Request, res: Response): Promise<Response> {

        const service = new ProductService();

        const products = await service.findAll();

        return res.status(200).json(products);
    }

}