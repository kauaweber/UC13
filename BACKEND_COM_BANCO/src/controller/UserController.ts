import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

const userService = new UserService();

export class UserController {
    async list(req: Request, res: Response) {
        try {
            const users = await userService.list();
            return res.json(users);
        } catch {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const user = await userService.show(Number(req.params.id));
            return res.json(user);
        } catch (error: any) {
            if (error.message === 'User not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email } = req.body;

            const user = await userService.create(name, email);

            return res.status(201).json(user);
        } catch (error: any) {
            if (
                error.message === 'Name and email are required' ||
                error.message === 'Email already in use'
            ) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { name, email } = req.body;

            const user = await userService.update(
                Number(req.params.id),
                name,
                email
            );

            return res.json(user);
        } catch (error: any) {
            if (
                error.message === 'User not found' ||
                error.message === 'Email already in use'
            ) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await userService.delete(Number(req.params.id));

            return res.status(204).send();
        } catch (error: any) {
            if (error.message === 'User not found') {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}