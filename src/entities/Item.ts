import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, BeforeInsert, getRepository } from "typeorm";
import { Lavista } from "./Lavista";
import { Location } from "./Location";
import { Section } from "./Section";
import { Village } from "./Village";
import { ItemType } from "./ItemType";

@Entity({ name: "item" })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column({ nullable: true })
  serial_num: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: false, default: 0 })
  count: number;

  @Column({ nullable: true })
  hp: string;

  @Column({ nullable: true })
  amp: string;

  @Column({ nullable: true })
  phase: string;

  @Column({ nullable: true })
  capacitor: string;

  @Column({ nullable: true })
  front_bearing: string;

  @Column({ nullable: true })
  back_bearing: string;

  @Column({ nullable: true })
  q: string;

  @Column({ nullable: true })
  h: string;

  @Column({ nullable: true })
  mechanical_seal: string;

  @Column({ nullable: true })
  area: string;

  @Column({ nullable: true })
  sand: string;

  @Column({ nullable: true })
  sand_size: string;

  @Column({ nullable: true })
  max_pressure: string;

  @Column({ nullable: true })
  o_ring: string;

  @Column({ nullable: true })
  pump_type: string;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  filter_type: string;

  @Column({ nullable: true })
  filter_diameter: string;

  @Column({ nullable: true })
  filter_flow: string;

  @Column({ nullable: false, default: "" })
  notes: string;

  // Relations
  // -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*
  @ManyToOne(() => Lavista, (lavista) => lavista.items, { onDelete: "CASCADE" })
  lavista: Lavista;

  @ManyToOne(() => Location, (location) => location.items, { onDelete: "CASCADE" })
  location: Location;

  @ManyToOne(() => Village, (village) => village.items, { onDelete: "CASCADE" })
  village: Village;

  @ManyToOne(() => Section, (section) => section.items, { onDelete: "CASCADE" })
  section: Section;

  @ManyToOne(() => ItemType, (item_type) => item_type.items, { onDelete: "CASCADE" })
  item_type: ItemType;
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

  // BeforeInsert decorator to generate and increment CODE
  @BeforeInsert()
  async generateUserCode() {
    const userRepository = getRepository(Item);
    const [latestItem] = await userRepository
      .createQueryBuilder("item")
      .orderBy("item.createdAt", "DESC")
      .select("item.code", "code")
      .limit(1)
      .getRawMany();

    if (latestItem) {
      const lastCode = latestItem.code;
      const lastNumber = parseInt(lastCode?.split("-")[1], 10) || 0;

      // Increment the last number and format it
      this.code = `I-${(lastNumber + 1).toString().padStart(4, "0")}`;
    } else {
      // If there are no existing user, start with 1
      this.code = "I-0001";
    }
  }
}
