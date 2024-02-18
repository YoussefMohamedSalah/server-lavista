import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Location } from './Location';
import { Lavista } from './Lavista';
import { Section } from './Section';
import { Item } from './Item';

@Entity({ name: 'village' })
export class Village extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        default: ''
    })
    name: string;

    @Column({
        default: 0
    })
    items_count: number;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Lavista, lavista => lavista.villages, { onDelete: 'CASCADE' })
    lavista: Lavista;

    @ManyToOne(() => Location, location => location.villages)
    location: Location;

    @OneToMany(() => Section, section => section.village, { cascade: true, onDelete: 'CASCADE' })
    sections: Section[];

    @OneToMany(() => Item, item => item.village, { cascade: true, onDelete: 'CASCADE' })
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