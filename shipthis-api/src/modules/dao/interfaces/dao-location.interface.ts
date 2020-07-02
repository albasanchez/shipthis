import { Place } from './../../ordersheet/entities/place.entity';
import { Trajectory } from 'src/modules/ordersheet/entities/trajectory.entity';
export interface IDaoLocation {
  validateAddress(address: string): Promise<Place>;
  generateTrajectory(
    origin: { long: number; lat: number },
    destination: { long: number; lat: number },
  ): Promise<Trajectory>;
}
