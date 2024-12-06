"use server"
import { collection, addDoc, where, query, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'


export const addData = async (data: FetchRepo) => {
    try {
        const Data_to_be_inserted = {
            ...data,
            createdAt : Date.now()
        }
        const docRef = await addDoc(collection(db, "repos"), Data_to_be_inserted);
        console.log("Repo data inserted in firestore")
    } catch (error: any) {
        console.log(error.message)
    }
}

export const getData = async (repoid: string) => {

    try {
        const repoCollectionRef = collection(db, "repos");
        const querySnapshot = await getDocs(repoCollectionRef);
        const repoData = querySnapshot.docs
            .map((doc: any) => ({
                id: doc.id,  // Extract the document ID
                ...doc.data() // Extract the document data
            }))
            .filter((doc: any) => doc.id === Number(repoid))
            .sort((a:any,b:any) =>{
                return b.createdAt - a.createdAt
            })
        return repoData;
    } catch (error) {
        console.error("Error fetching data from collection:", error);
        return [];
    }
};

