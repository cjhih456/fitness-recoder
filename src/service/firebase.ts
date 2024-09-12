import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA__s2QPo2g6tWxODULkpf7FK8q9LhlCUk',
  authDomain: 'fitness-recoder-9683a.firebaseapp.com',
  databaseURL: 'https://fitness-recoder-9683a-default-rtdb.firebaseio.com',
  projectId: 'fitness-recoder-9683a',
  storageBucket: 'fitness-recoder-9683a.appspot.com',
  messagingSenderId: '1025160142583',
  appId: '1:1025160142583:web:dadbde681234bafe9e7df2',
  measurementId: 'G-V4LDGRZRNW'
};

const app = initializeApp(firebaseConfig)
getAnalytics(app)

export const auth = getAuth(app);
export const db = getDatabase(app, 'https://fitness-recoder-9683a-default-rtdb.firebaseio.com');