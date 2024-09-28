import { Module } from '@nestjs/common';
import { FireIncidentsService } from './fire-incidents.service';
import { FireIncidentsRepository } from './fire-incidents.repository';
import { FireIncidentsController } from './fire-incidents.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
  ],
  providers: [FireIncidentsService, FireIncidentsRepository],
  controllers: [FireIncidentsController],
  exports: [FireIncidentsService],
})
export class FireIncidentsModule {}
