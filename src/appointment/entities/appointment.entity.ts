import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  companyId: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ default: 'Pending' })
  state: string;
}
