import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { User } from "./User";
import { Location } from "./Location";
import { Village } from "./Village";
import { Section } from "./Section";
import { Item } from "./Item";
import { ItemType } from "./ItemType";

@Entity({ name: "lavista" })
export class Lavista extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "Lavista" })
  name: string;

  @Column({ default: 0, nullable: true })
  users_count: number;

  // Relations
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
  @OneToMany(() => Location, (location) => location.lavista, { cascade: true, onDelete: "CASCADE" })
  locations: Location[];

  @OneToMany(() => Village, (village) => village.lavista, { cascade: true, onDelete: "CASCADE" })
  villages: Village[];

  @OneToMany(() => Section, (section) => section.lavista, { cascade: true, onDelete: "CASCADE" })
  sections: Section[];

  @OneToMany(() => Item, (item) => item.lavista, { cascade: true, onDelete: "CASCADE" })
  items: Item[];

  @OneToMany(() => ItemType, (item_type) => item_type.lavista, { cascade: true, onDelete: "CASCADE" })
  item_types: ItemType[];

  @OneToMany(() => User, (user) => user.lavista, { cascade: true, onDelete: "CASCADE" })
  users: User[];
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

// @OneToMany(() => MechanicsItem, mechanics => mechanics.lavista)
// mechanics: MechanicsItem[];

// @OneToMany(() => ElectronicsItem, electronics => electronics.lavista)
// electronics: ElectronicsItem[];

// @OneToMany(() => TechnicalValidityItem, technicalValidity => technicalValidity.lavista)
// technicalValidity: TechnicalValidityItem[];

// @OneToMany(() => LandScapeItem, landScape => landScape.lavista)
// landScape: LandScapeItem[];
