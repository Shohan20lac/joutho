import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig'

const firebaseApp = initializeApp(firebaseConfig)
if (firebaseApp) 
    console.log ("Firebase initialized successfully")
else
    console.log ("Firebase initialization failed")

const db = getFirestore (firebaseApp)

export { db }