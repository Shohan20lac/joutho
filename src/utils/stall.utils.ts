import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { Dispatch, SetStateAction } from "react";

export async function getStallActivity() {
  try {
    // Reference to the document with ID '1' in the 'stallActivity' collection
    const docRef = doc(db, "stallActivity", "1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists())
        return docSnap.data()
    else
      console.log("No such document found!");
  } 
  catch (error) {
    console.error("Error fetching document:", error);
  }
}

export function listenToStallActivity (setVisitorStatus: Dispatch<SetStateAction<string>>) {
    const docRef = doc(db, "stallActivity", "1");
  
    onSnapshot (docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // You can access specific fields:
        // console.log("Admin Active:", data.adminActive);
        // console.log("Monitor Active:", data.monitorActive);
        // console.log("Visitor Status:", data.visitorStatus);
        console.log("Updated Stall Activity Data:", docSnap.data());
        setVisitorStatus(data.visitorStatus);
      } else {
        console.log("Document does not exist!");
      }
    });
  }