import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Location } from './Location';
import { Lavista } from './Lavista';
import { Mechanics } from './sectionsTables/Mechanics';
import { Electronics } from './sectionsTables/Electronics';
import { LandScape } from './sectionsTables/LandScape';
import { TechnicalValidity } from './sectionsTables/TechnicalValidity';

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
    @OneToOne(() => Mechanics, mechanics => mechanics.village, { onDelete: 'CASCADE' })
    @JoinColumn()
    mechanics_section: Mechanics;

    @OneToOne(() => Electronics, electronics => electronics.village, { onDelete: 'CASCADE' })
    @JoinColumn()
    electronics_section: Electronics;

    @OneToOne(() => LandScape, landScape => landScape.village, { onDelete: 'CASCADE' })
    @JoinColumn()
    landScape_section: LandScape;

    @OneToOne(() => TechnicalValidity, technicalValidity => technicalValidity.village, { onDelete: 'CASCADE' })
    @JoinColumn()
    technicalValidity_section: TechnicalValidity;

    @ManyToOne(() => Location, location => location.villages)
    location: Location;

    @ManyToOne(() => Lavista, lavista => lavista.villages, { onDelete: 'CASCADE' })
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