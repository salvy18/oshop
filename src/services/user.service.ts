import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';

import { AppUser } from 'src/app/models/app-users';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map  } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService  implements OnDestroy {

  user: AngularFireObject<AppUser>;
  userObject: AppUser;
  subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


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


       // This method should work the update should create/update but its only updating
       //      this.db1.collection('users').doc(user.uid).set({
    //         name: user.displayName,
    //         email: user.email,
    // });

        // This method was created by me however i am using a subscription here i ask if exist then update if not use the set

        const userUID =  this.get(user.uid);
        this.subscription = userUID.subscribe(appUser => {
          if (appUser) {
            // Found record then update using the update command
              this.db1.collection('users').doc(user.uid).update({
              name: user.displayName,
              email: user.email,
            });
          } else {
            // No found record then create using set command
              this.db1.collection('users').doc(user.uid).set({
              name: user.displayName,
              email: user.email,
              });
          }
        }, error => {
          console.log('error getting document:', error);
        });

        // I like this method better as it has error catching
        // let docRef = this.db1.collection('users').doc(user.uid);
        // docRef.get().toPromise().then((doc) => {
        //   if (doc.exists) {
        //     console.log('document exist it will use the update command');
        //     this.db1.collection('users').doc(user.uid).update({
        //              name: user.displayName,
        //              email: user.email});
        //   } else {
        //     console.log('document do not exist it will use the set command');
        //     this.db1.collection('users').doc(user.uid).set({
        //             name: user.displayName,
        //             email: user.email});
        //   }
        // }).catch(function(error) {
        //   console.log('error getting document:', error);
        // });
  }

  get(uid: string) {
  // return this.db1.doc<User>('users/' + uid).valueChanges();
  return this.db1.doc<AppUser>('users/' + uid).valueChanges();
  }
 }
