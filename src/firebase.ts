import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig'
import { getAnalytics } from 'firebase/analytics'

const firebaseApp = initializeApp(firebaseConfig)
// if (firebaseApp) 
//     console.log ("Firebase initialized successfully")
// else
//     console.log ("Firebase initialization failed")
// const analytics = getAnalytics(firebaseApp)

const db = getFirestore (firebaseApp)

export { db }