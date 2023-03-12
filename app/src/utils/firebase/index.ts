import { DocumentData, collection, getFirestore, CollectionReference, getDocs } from "firebase/firestore"
import { app } from "@/utils/config"

class Firebase {

  private firestore = getFirestore(app)

  private getCollection<T = DocumentData>(name: string) {
    return collection(this.firestore, name) as CollectionReference<T>
  }

  public async findAll(name: string) {
    const docs = await getDocs(this.getCollection((name)))
    return docs.docs.map((d) => d.data())
  }


}

export default new Firebase()
