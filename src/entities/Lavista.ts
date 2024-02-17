import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { User } from './User';
import { Location } from './Location';
import { Village } from './Village';
import { ElectronicsItem } from './sectionsTables/ElectronicsItem';
import { MechanicsItem } from './sectionsTables/MechanicsItem';
import { TechnicalValidityItem } from './sectionsTables/TechnicalValidityItem';
import { LandScapeItem } from './sectionsTables/LandScapeItem';

@Entity({ name: 'lavista' })
export class Lavista extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: 'Lavista',
    })
    name: string;

    @Column({
        default: 0,
        nullable: true,
    })
    users_count: number;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*

    @OneToMany(() => Village, village => village.lavista, { cascade: true, onDelete: 'CASCADE' })
    villages: Village[];

    @OneToMany(() => Location, location => location.lavista, { cascade: true, onDelete: 'CASCADE' })
    locations: Location[];

    @OneToMany(() => User, user => user.lavista, { cascade: true, onDelete: 'CASCADE' })
    users: User[];

    @OneToMany(() => MechanicsItem, mechanics => mechanics.lavista)
    mechanics: MechanicsItem[];

    @OneToMany(() => ElectronicsItem, electronics => electronics.lavista)
    electronics: ElectronicsItem[];

    @OneToMany(() => TechnicalValidityItem, technicalValidity => technicalValidity.lavista)
    technicalValidity: TechnicalValidityItem[];

    @OneToMany(() => LandScapeItem, landScape => landScape.lavista)
    landScape: LandScapeItem[];
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
}