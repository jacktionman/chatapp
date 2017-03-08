import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  templateUrl: './slavea.component.html',
    styleUrls: ['./slavea-component.css']
})

export class SlaveAComponent {
  pageTitle: string = 'Slave A Page';

  aItem: FirebaseListObservable<any>;
  items: FirebaseListObservable<any>;


  constructor(af: AngularFire) {

  this.items = af.database.list('/chats');


    this.aItem = af.database.list('/chats', {
      query: {
        orderByChild: 'sender',
        limitToLast: 1,
        equalTo: 'A'
      }
    });

}

    private coordinates(event: MouseEvent, key: string, newText: string, msg : number):void {

          var screenWidth = 1920;
          var screenHeight = 1080;
          var cols = 50;
          var rows = 28;
          var widthCol = screenWidth/cols;
          var heightRow = screenHeight/rows;

           var x = event.clientX;
           x = Math.floor(x / widthCol);

           var y = event.clientY;
           y = Math.floor(y / heightRow);

           var coordinates = (y * cols) + x + 1;
           console.log("Clicked: " + coordinates);
	   
  	   if(coordinates > 1389){
		this.addItem(key, msg, 'A')
	   } else if(coordinates == 1389){
	   } else if(coordinates > 1382){
	           newText = newText.substr(0,newText.lastIndexOf(","));
	           this.aItem.update(key, { text: newText,show: 0});
		   console.log(newText);
	   } else if(coordinates > 1380){
	   } else {

           var coordString = "";
	   coordString = String(coordinates);

	   if (coordinates < 10 && coordinates > 0){

		coordString = "000" + coordinates;

		} else if (coordinates < 100 && coordinates > 9){

		coordString = "00" + coordinates;

		} else if (coordinates < 1000 && coordinates > 99){

		coordString = "0" + coordinates;

		}		

           newText = newText + "," + coordString;
		console.log(newText);
           this.aItem.update(key, { text: newText,show: 0});
	}
       }

       updateItem(key: string, newText: string) {
         this.aItem.update(key, { text: newText,
                                   show: 0
                                   });
       }

       addItem(key: string, msg: number, senderName : string) {
           let currentTime = Date.now();

           this.aItem.update(key, {timestamp : currentTime, show : 1});

           msg = msg + 1;
           this.items.push({ text: "",
                             msg : msg,
                             sender: senderName });


         }

}
