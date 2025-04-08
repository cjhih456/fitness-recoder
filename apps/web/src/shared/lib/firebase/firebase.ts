import type { Analytics } from 'firebase/analytics';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: 'AIzaSyA__s2QPo2g6tWxODULkpf7FK8q9LhlCUk',
  authDomain: 'fitness-recoder-9683a.firebaseapp.com',
  databaseURL: 'https://fitness-recoder-9683a-default-rtdb.firebaseio.com',
  projectId: 'fitness-recoder-9683a',
  storageBucket: 'fitness-recoder-9683a.appspot.com',
  messagingSenderId: '1025160142583',
  appId: '1:1025160142583:web:dadbde681234bafe9e7df2',
  measurementId: 'G-V4LDGRZRNW'
};

let analytics: Analytics | undefined

export default () => {
  const app = initializeApp(firebaseConfig)
  analytics = getAnalytics(app)
}

export function LogEvent(eventName: string, params?: { [key: string]: any }) {
  if (!analytics) return
  logEvent(analytics, eventName, params)
}