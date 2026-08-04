import { AppDataSource } from '../config/dataSource';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export class UserService {
    async list() {
        return userRepository.find({
            relations: { posts: true },
            order: {
                id: 'ASC'
            }
        });
    }

    async show(id: number) {
        const user = await userRepository.findOne({
            where: { id },
            relations: { posts: true}
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async create(name: string, email: string) {
        if (!name || !email) {
            throw new Error('Name and email are required');
        }

        const exists = await userRepository.findOneBy({ email });

        if (exists) {
            throw new Error('Email already in use');
        }

        const user = userRepository.create({
            name,
            email
        });

        await userRepository.save(user);

        return user;
    }

    async update(id: number, name?: string, email?: string) {
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new Error('User not found');
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            const exists = await userRepository.findOneBy({ email });

            if (exists && exists.id !== user.id) {
                throw new Error('Email already in use');
            }

            user.email = email;
        }

        await userRepository.save(user);

        return user;
    }

    async delete(id: number) {
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new Error('User not found');
        }

        await userRepository.remove(user);
    }
}