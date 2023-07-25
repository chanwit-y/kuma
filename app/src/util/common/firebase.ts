import {
  DocumentData,
  collection,
  getFirestore,
  CollectionReference,
  getDocs,
  getDoc,
  doc,
  QueryConstraint,
  where,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../config";

export class Firebase {
  private _firestore = getFirestore(app);

  private getCollection<T = DocumentData>(name: string) {
    return collection(this._firestore, name) as CollectionReference<T>;
  }

  public async findAll(name: string) {
    const docs = await getDocs(this.getCollection(name));
    return docs.docs.map((d) => ({
      docId: d.id,
      ...d.data(),
    }));
  }

  public async findById(name: string, id: string) {
    const docs = doc(this._firestore, name, id);
    return (await getDoc(docs)).data();
  }

  public async findBy(name: string, filter: Map<string, any>) {
    let result: any[] = [];
    let filters: QueryConstraint[] = [];
    for (const [k, v] of Object(filter).entries())
      filters = [...filters, where(k, "==", v)];

    const q = query(this.getCollection(name), ...filters);
    const d = await getDocs(q);

    d.forEach((i) => (result = [...result, { doc_id: i.id, ...i.data() }]));

    return result;
  }

  public async add(name: string, data: any) {
    console.log("add")
    console.log(data)
    const ref = doc(this.getCollection(name));
    await setDoc(ref, data);
    console.log("add data ref", ref.id);
    console.log("add data", data);
  }

  public async update(
    name: string,
    id: string,
    field: string,
    value: unknown,
    ...moreFieldValues: unknown[]
  ) {
    const ref = doc(this._firestore, name, id);
    await updateDoc(ref, field, value, ...moreFieldValues);
  }
}

export default new Firebase();
