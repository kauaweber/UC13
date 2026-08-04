import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity('users') // Informa para o ORM que essa classe será uma Entidade do Banco de Dados
export class User {

    // Define que o campo será uma Chave Primária (PK) e Auto Incrementável (AI)
    @PrimaryGeneratedColumn() 
    id: number;

    // Define que o tamanho do campo é de 100 caracteres, e não pode ser nulo.
    @Column({ length: 100, nullable: false })
    name: string;

    // Define que o campo é Único (UK)
    @Column({ length: 100, unique: true })
    email: string;

    
    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}