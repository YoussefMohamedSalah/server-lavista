import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Village } from './Village';
import { Lavista } from './Lavista';
import { Section } from './Section';
import { Item } from './Item';

@Entity({ name: 'location' })
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        default: ''
    })
    name: string;

    @Column({ default: 0 })
    villages_count: number;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Lavista, lavista => lavista.locations, { onDelete: 'CASCADE' })
    lavista: Lavista;

    @OneToMany(() => Village, village => village.location, { cascade: true, onDelete: 'CASCADE' })
    villages: Village[];

    @OneToMany(() => Section, section => section.location, { cascade: true, onDelete: 'CASCADE' })
    sections: Section[];

    @OneToMany(() => Item, item => item.location, { cascade: true, onDelete: 'CASCADE' })
    items: Item[];
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}