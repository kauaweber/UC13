import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    /*
        - Indica para o ORM que existe uma relação de Muitos para 1 (N:1)
          com a Entidade Category.
        - Essa relação foi indicada na outra entidade também.
        - O ORM criará automaticamente a Chave Estrangeira (FK).
    */
    @ManyToOne(() => Category, category => category.products)
    category: Category;
}