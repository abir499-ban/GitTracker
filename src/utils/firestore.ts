import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../firebaseConfig'


export const addData = async(data : FetchRepo) =>{
    try{
        const docRef = await addDoc(collection(db, "repos"), data);
        console.log("Repo data inserted in firestore")
    }catch(error : any){
        console.log(error.message)
    }
}