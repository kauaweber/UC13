import { AppDataSource } from '../config/dataSource';
import { Post } from '../models/Post';
import { User } from '../models/User';

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export class PostService {
    async list() {
        return postRepository.find({
            relations: { user: true },
            order: { id: 'ASC' }
        });
    }

    async show(id: number) {
        const post = await postRepository.findOne({
            where: { id },
            relations: { user: true }
        });

        if (!post) {
            throw new Error('Post not found');
        }

        return post;
    }

    async create(title: string, userId: number) {
        if (!title || !userId) {
            throw new Error('Title and userId are required');
        }

        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        const post = postRepository.create({
            title,
            user
        });

        await postRepository.save(post);

        return post;
    }

    async update(id: number, title?: string, userId?: number) {
        const post = await postRepository.findOneBy({ id });

        if (!post) {
            throw new Error('Post not found');
        }

        if (title) {
            post.title = title;
        }

        if (userId) {
            const user = await userRepository.findOneBy({ id: userId });

            if (!user) {
                throw new Error('User not found');
            }

            post.user = user;
        }

        await postRepository.save(post);

        return post;
    }

    async delete(id: number) {
        const post = await postRepository.findOneBy({ id });

        if (!post) {
            throw new Error('Post not found');
        }

        await postRepository.remove(post);
    }
}