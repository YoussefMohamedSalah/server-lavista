import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Lavista } from "./Lavista";
import { Section } from "./Section";

@Entity({ name: "image" })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    url: string;

    // Relations
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @ManyToOne(() => Lavista, (lavista) => lavista.item_types, { onDelete: "CASCADE" })
    lavista: Lavista;

    @ManyToOne(() => Section, (section) => section.images, { onDelete: "CASCADE" })
    section: Section;
    // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}
