import { Request, Response } from "express";
import { CategoryService } from "../service/CategoryService";

export class CategoryController {

    static async getCategories(req: Request, res: Response): Promise<Response> {

        const service = new CategoryService();

        const categories = await service.findAll();

        return res.status(200).json(categories);
    }

}