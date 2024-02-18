import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Village } from './Village';
import { Lavista } from './Lavista';
import { Item } from './Item';

@Entity({ name: 'section' })
export class Section extends BaseEntity {
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
    @ManyToOne(() => Lavista, lavista => lavista.sections, { onDelete: 'CASCADE' })
    lavista: Lavista;

    @ManyToOne(() => Section, section => section.location, { onDelete: 'CASCADE' })
    location: Section;

    @OneToMany(() => Village, village => village.sections)
    village: Village[];

    @OneToMany(() => Item, item => item.section, { cascade: true, onDelete: 'CASCADE' })
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