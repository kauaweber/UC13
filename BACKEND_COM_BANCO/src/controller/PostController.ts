import { Request, Response } from 'express';
import { PostService } from '../service/PostService';

const postService = new PostService();

export class PostController {
    async list(req: Request, res: Response) {
        try {
            return res.json(await postService.list());
        } catch {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async show(req: Request, res: Response) {
        try {
            return res.json(await postService.show(Number(req.params.id)));
        } catch (error: any) {
            if (error.message === 'Post not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, userId } = req.body;

            const post = await postService.create(title, Number(userId));

            return res.status(201).json(post);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { title, userId } = req.body;

            const post = await postService.update(
                Number(req.params.id),
                title,
                userId ? Number(userId) : undefined
            );

            return res.json(post);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await postService.delete(Number(req.params.id));

            return res.status(204).send();
        } catch (error: any) {
            if (error.message === 'Post not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}