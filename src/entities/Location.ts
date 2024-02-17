import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { Village } from './Village';
import { Lavista } from './Lavista';

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
    @OneToMany(() => Village, village => village.location, { cascade: true, onDelete: 'CASCADE' })
    villages: Village[];

    @ManyToOne(() => Lavista, lavista => lavista.locations, { onDelete: 'CASCADE' })
    lavista: Lavista;
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