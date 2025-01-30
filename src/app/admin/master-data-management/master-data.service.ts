import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    doc,
    docData,
    setDoc,
    updateDoc,
    deleteDoc,
    CollectionReference,
    DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MasterDataService {
    constructor(private firestore: Firestore) {}

    getAll(collectionName: string): Observable<any[]> {
        const colRef = collection(this.firestore, collectionName) as CollectionReference<any>;
        return collectionData(colRef, { idField: 'id' });
    }

    get(collectionName: string, id: string): Observable<any> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<any>;
        return docData(docRef, { idField: 'id' });
    }

    add(collectionName: string, data: any): Promise<void> {
        const colRef = collection(this.firestore, collectionName) as CollectionReference<any>;
        const id = doc(colRef).id;
        const docRef = doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<any>;
        return setDoc(docRef, { ...data, id });
    }

    update(collectionName: string, id: string, data: any): Promise<void> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<any>;
        return updateDoc(docRef, data);
    }

    delete(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<any>;
        return deleteDoc(docRef);
    }
}
