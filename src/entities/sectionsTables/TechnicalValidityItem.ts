import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, BeforeInsert } from 'typeorm';
import { Lavista } from '../Lavista';
import { Electronics } from './Electronics';


@Entity({ name: 'technical_validity_item' })
export class TechnicalValidityItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, default: 'technical_validity' })
    type: string;

    @Column({ unique: true, nullable: true })
    code: string;

    @Column({ nullable: false })
    site_name: string;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Lavista, lavista => lavista.electronics, { onDelete: 'CASCADE' })
    lavista: Lavista;

    @ManyToOne(() => Electronics, electronics => electronics.items, { onDelete: 'CASCADE' })
    category: Electronics;
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