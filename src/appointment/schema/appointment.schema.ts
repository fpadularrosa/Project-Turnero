import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class AppointmentSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  companyId: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ default: 'Free' })
  state: 'Suspended' | 'Confirmed' | 'Free';
}