import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { MyProfile } from './my-profile.model';

@Injectable({
    providedIn: 'root',
})
export class MyProfileService {
    constructor(private firestore: Firestore) {}

    async createMyProfile(myID: string, myProfile: MyProfile) {
        const userRef = doc(this.firestore, `users/${myID}`);
        return setDoc(userRef, myProfile);
    }

    async getMyProfile(myID: string): Promise<MyProfile | undefined> {
        const userRef = doc(this.firestore, `users/${myID}`);
        const userSnap = await getDoc(userRef);
        return userSnap.data() as MyProfile | undefined;
    }

    async updateMyProfile(myID: string, myProfile: Partial<MyProfile>) {
        const userRef = doc(this.firestore, `users/${myID}`);
        return updateDoc(userRef, myProfile);
    }

    async rateIntern(internID: string, practiceID: string, rating: number) {
        const ratingRef = doc(collection(this.firestore, 'ratings'));
        return setDoc(ratingRef, {
            internID,
            practiceID,
            rating,
            timestamp: new Date(),
        });
    }

    async getInternRatings(internID: string) {
        const ratingsRef = collection(this.firestore, 'ratings');
        const q = query(ratingsRef, where('internID', '==', internID));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data());
    }
}
