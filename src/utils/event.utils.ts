import { EventType } from "@/const/event.const"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"


interface ListenerConfig {
    eventType: EventType,
    eventName: string,
    onTrigger: (...args: any[]) => void
}

export const createSnapshotListener = ({eventType, eventName, onTrigger}: ListenerConfig) => {

    console.log ("about to create snapshotListener with eventType:", eventType, "eventName:", eventName, "onTrigger:", onTrigger)
    const docRef = getDocRef (eventType)
    console.log ('docRef:', docRef)
    return (
        onSnapshot (
            getDocRef (eventType),
            (docSnapshot) => {
                if (!docSnapshot.exists()) {
                    console.warn ("No such document exists for eventType:", eventType, "eventName:", eventName)
                    return
                }
        
                const docData = docSnapshot.data()
                console.log ('got new docData:', docData)
                if (docData.action === eventName)
                    onTrigger(docData.payload)
            },
            (error) => {
              console.error("Error listening to top_setting document:", error)
            }
        )
    )
}

export const getDocRef = (eventType: EventType) => {
  if (eventType === EventType.STALL_EVENT) {
    // Adjusting Firestore path to match your structure
    return doc(db, "datamodels", "joutho", "stall-activities", "1");
  }
  throw new Error("Unsupported event type");
};

