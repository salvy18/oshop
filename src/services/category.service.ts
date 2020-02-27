import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Categories } from 'src/app/models/categories';
import { FirebaseDatabase, FirebaseFirestore } from '@angular/fire';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 collectionRef: AngularFirestoreCollection<unknown>;

  constructor( private db: AngularFirestore) {
    // This is just for testing purpuses to compare the different methods
    this.collectionRef = db.collection('categories');
  }


  getCategories() {
    return this.db.collection('categories').get();
    }

  getCategoriesValueChanges() {
    // This will re-construct the observable if DB changes in realtime
    return this.db.collection('categories').valueChanges();
  }
}
