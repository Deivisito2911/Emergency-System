import { Module } from '@nestjs/common';
import { FirebaseClient } from '../clients/firebase.client';
import { DocumentClientProviderName } from '../interfaces/DocumentClient.interface';

@Module({
  providers: [
    {
      provide: DocumentClientProviderName,
      useClass: FirebaseClient,
    },
  ],
  exports: [DocumentClientProviderName],
})
export class FirebaseModule {}
