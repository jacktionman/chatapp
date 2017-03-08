import { Component, Input, ChangeDetectorRef, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

type Orientation = ("left" | "right" | "none");

@Component({
  templateUrl: './master.component.html',
      styleUrls: ['./master-component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => left', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]), 
    transition('left => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(-100%)',  offset: 1.0})
      ]))
    ]),
  transition('void => right', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]), 
    transition('right => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
]
})

export class MasterComponent {
  pageTitle: string = 'Master Page';
  currentItem: FirebaseListObservable<any>;
  aItem: FirebaseListObservable<any>;
  bItem: FirebaseListObservable<any>;
  public orientation: Orientation;
  private changeDetectorRef: ChangeDetectorRef;

    constructor(af: AngularFire, changeDetectorRef: ChangeDetectorRef) {

	this.changeDetectorRef = changeDetectorRef;
	this.orientation = "left";	

    this.currentItem = af.database.list('/chats', {
        query: {
          orderByChild: 'timestamp',
          limitToLast: 1
        }
      });

	this.currentItem.subscribe(
		(x) => {
	if(x.length > 0){this.detCha(x[0].sender)}
		},
		err => console.log(err));
	


      this.aItem = af.database.list('/chats', {
        query: {
          orderByChild: 'sender',
          limitToLast: 1,
          equalTo: 'A'
        }
      });

      this.bItem = af.database.list('/chats', {
        query: {
          orderByChild: 'sender',
          limitToLast: 1,
          equalTo: 'B'
        }
      });


    }


imageChangeSM(text : string, targetID : string){
  var array = text.split(',');

  for (var i = 1; i < array.length; i++) {
      array[i] = "<img class='sm' src='img/" + array[i] + ".png' />";
  }

  var toReturn = array.toString();
  document.getElementById(targetID).innerHTML = toReturn;

}

detCha(sender: string){
if(sender == "A" && this.orientation == "right"){
this.orientation = "left";
this.changeDetectorRef.detectChanges();
console.log("Now Left");
 }else if(sender == "B" && this.orientation == "left"){ 
this.orientation = "right";
this.changeDetectorRef.detectChanges();
console.log("Now Right");
}


}


imageChange(text : string, targetID : string, sender : string){

  var array = text.split(',');

  for (var i = 1; i < array.length; i++) {
      array[i] = "<img src='img/" + array[i] + ".png' />";
  }

  var toReturn = array.toString();
  document.getElementById(targetID).innerHTML = toReturn;

}


}
