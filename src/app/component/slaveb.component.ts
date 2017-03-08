import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  templateUrl: './slaveb.component.html',
    styleUrls: ['./slaveb-component.css']
})

export class SlaveBComponent {
  pageTitle: string = 'Slave B Page';

  bItem: FirebaseListObservable<any>;
  items: FirebaseListObservable<any>;


  constructor(af: AngularFire) {


      this.items = af.database.list('/chats');


        this.bItem = af.database.list('/chats', {
          query: {
            orderByChild: 'sender',
            limitToLast: 1,
            equalTo: 'B'
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

		//Offset for glitchy input
	   if (event.clientY < 540 && event.clientX < 960 && event.clientX > 10){
		x = Math.floor((event.clientX - 10) / widthCol);
console.log('exception: ' + x);
	   }

           var coordinates = (y * cols) + x + 1;
           console.log(coordinates);
	   
	   if(coordinates > 1389){
		this.addItem(key, msg, 'B')
	   } else if(coordinates == 1389){
	   } else if(coordinates > 1382){
	           newText = newText.substr(0,newText.lastIndexOf(","));
	           this.bItem.update(key, { text: newText,show: 0});
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

           this.bItem.update(key, { text: newText,show: 0});
	}
       }

       updateItem(key: string, newText: string) {
         this.bItem.update(key, { text: newText,
                                   show: 0
                                   });
       }

       addItem(key: string, msg: number, senderName : string) {
           let currentTime = Date.now();

           this.bItem.update(key, {timestamp : currentTime, show : 1});

           msg = msg + 1;
           this.items.push({ text: "",
                             msg : msg,
                             sender: senderName });


         }

}
