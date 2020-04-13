import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Categories } from 'src/app/models/categories';
import { FirebaseDatabase, FirebaseFirestore } from '@angular/fire';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 collectionRef: AngularFirestoreCollection<unknown>;

  constructor( private db: AngularFirestore) {
    // This is just for testing purpuses to compare the different methods
    this.collectionRef = db.collection('categories');
  }


  getAll() {
    return this.db.collection('categories').get();
    }

  getall2() {
    return this.db.collection('categories').get().pipe(map(querySnapshot => {
      const categoryList: Categories[] = querySnapshot.docs.map(doc => {
        var data = doc.data();
        return {
          id: doc.id,
          name: data.name
        };
      });
      return categoryList;
    }));
  }

  getCategoriesValueChanges() {
    // This will re-construct the observable if DB changes in realtime
    return this.db.collection('categories').valueChanges();
  }
}
