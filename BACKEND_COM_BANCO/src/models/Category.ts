import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    /*
        - Uma Categoria pode possuir vários Produtos.
        - Relação de 1:N (OneToMany).
    */
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}