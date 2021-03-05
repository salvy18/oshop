import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
//import { from } from 'rxjs/observable/from';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
private listeners: any;
private eventsSubject: Subject<any>;
private events: Observable<any>;

 constructor() {
this.listeners = {};
this.eventsSubject = new Subject();

 this.events = from(this.eventsSubject);

 this.events.subscribe(
({ name, args }) => {
if (this.listeners[name]) {
for (let listener of this.listeners[name]) {
listener(...args);
}
}
});
}

 public on(name, listener) {
if (!this.listeners[name]) {
this.listeners[name] = [];
}

 this.listeners[name].push(listener);
}

 public broadcast(name, ...args) {
this.eventsSubject.next({
name,
args
});
}


}
