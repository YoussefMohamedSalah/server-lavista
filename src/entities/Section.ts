import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Village } from "./Village";
import { Lavista } from "./Lavista";
import { Location } from "./Location";
import { Item } from "./Item";
import { Image } from "./Image";


@Entity({ name: "section" })
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    default: "",
  })
  name: string;

  @Column({ default: 0 })
  items_count: number;

  // Relations
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
  @ManyToOne(() => Lavista, (lavista) => lavista.sections, { onDelete: "CASCADE" })
  lavista: Lavista;

  @ManyToOne(() => Location, (location) => location.sections, { onDelete: "CASCADE" })
  location: Location;

  @ManyToOne(() => Village, (village) => village.sections, { onDelete: "CASCADE" })
  village: Village;

  @OneToMany(() => Item, (item) => item.section, { cascade: true, onDelete: "CASCADE" })
  items: Item[];

  @OneToMany(() => Image, (image) => image.section, { cascade: true, onDelete: "CASCADE" })
  images: Image[];
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
