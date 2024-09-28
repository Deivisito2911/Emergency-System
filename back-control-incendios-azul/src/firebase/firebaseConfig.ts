import { initializeApp, cert, App, ServiceAccount } from 'firebase-admin/app';

const serviceAccount: ServiceAccount = {
  projectId: 'emergenciasudoapp',
  privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
  clientEmail: 'firebase-adminsdk-9vpcd@emergenciasudoapp.iam.gserviceaccount.com'
};

const firebaseConfig = {
  credential: cert(serviceAccount),
};

export const firebaseApp: App = initializeApp(firebaseConfig);
