import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, BeforeInsert, OneToMany, OneToOne } from 'typeorm';
import { Village } from '../Village';
import { Lavista } from '../Lavista';
import { MechanicsItem } from './MechanicsItem';


@Entity({ name: 'mechanics' })
export class Mechanics extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: true })
    code: string;

    @Column({ nullable: true })
    site_name: string;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @OneToOne(() => Village, village => village.mechanics_section, { onDelete: 'CASCADE' })
    village: Village;

    @OneToMany(() => MechanicsItem, mechanicsItem => mechanicsItem.category, { cascade: true, onDelete: 'CASCADE' })
    items: MechanicsItem[];
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
    // BeforeInsert decorator to generate and increment CODE
    @BeforeInsert()
    incrementTenderId() {
        this.code = `PC-${Math.floor(Math.random() * 10000) + 1}`;
    }
}