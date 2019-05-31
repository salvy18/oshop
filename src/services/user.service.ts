import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';

import { AppUser } from 'src/app/models/app-users';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: AngularFireObject<AppUser>;
   userObject: AppUser;

  constructor( private db: AngularFireDatabase, private db1: AngularFirestore) {
   }
  //  save(user: firebase.User) {
  //   this.db.object('/users/' + user.uid).update({
  //     name: user.displayName,
  //     email: user.email
  //   });
  //  }

  save(user: firebase.User) {
        // console.log(user.uid);
        // return this.db1.collection('/users/' + user.uid).add({
        this.db1.collection('users').doc(user.uid).set({
            name: user.displayName,
            email: user.email
    });
  }

  get(uid: string) {
  // return 'Hola';
  //return this.db1.doc<User>('users/' + uid).valueChanges();
  return this.db1.doc<AppUser>('users/' + uid).valueChanges();
  }
 }
