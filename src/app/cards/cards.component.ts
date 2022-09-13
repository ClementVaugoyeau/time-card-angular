
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { generate } from 'rxjs';




@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})





export class CardsComponent implements OnInit {

  

  cards =  [ 
  "Mort de Louis XIV", "chute de rome", 'invention imprimerie']

  cards2: any = [];

  cards3: any = [];

  isCardDrawed: boolean = false;

  cardsHand = [""]

 
  

    ngOnInit(): void {

      
      
    }

  

  drop(event: CdkDragDrop<any[]>) {
    
    if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      
    transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  checkCards(){
   
    var dates: number[] = []
     
    var cardToCheck = document.getElementById("board")?.getElementsByClassName("card");
    
     
    for( var i = 0; i < cardToCheck!.length; i++ ){
      
      dates.push(Number(cardToCheck?.item(i)?.lastChild?.lastChild?.nodeValue));

     }

     this.compareDate(dates);
     

     }

  compareDate(dates: number[]){

    let goodAnswers = 0;

    for(let i  = 0; i < 5; i++){

      if(dates[i] < dates[i + 1]){

        goodAnswers++;
      }



    }

    if(goodAnswers == 5)
    {
      console.log("bravo");
     this.showDatesOfCards();
      this.showResult();

    }

    // if(dates[0] < dates[1]){
    
    //   if(dates[1] < dates [2]){
  
    //     if(dates[2] < dates[3]){
    //       console.log("bravo");
    //       this.showDatesOfCards();
    //       this.showResult();
    //       console.log(dates)
          
          
       
    //     }
    //     else{
    //       console.log("perdu1");
    //     }
        
    //   }
    //   else{
    //     console.log("perdu2");
    //   }
  
    // }
    // else{
    //   console.log("perdu0");
    //   console.log(dates)
    // }

   this.checkCardOrder(dates);

  }

  checkCardOrder(dates: number[]){

    
    let datesSorted = [...dates].sort((a,b) => a - b);
    
    
    

    console.log(datesSorted);
    console.log(dates);
   
    
    
    for(let i = 0; i < dates.length; i++ ){

      console.log("led" + i)
      console.log(dates.length)

    if(dates[i] == datesSorted[i] && dates.length != 0){

      document.getElementById("led" +  i)!.style.background = "linear-gradient(326deg, rgba(45,150,53,1) 0%, rgba(114,251,123,1) 100%)";
    }
    else{
      document.getElementById("led" + i)!.style.background = "#C4C4C4";

    }
  }
    
    
   
   
  }

  showDatesOfCards(){
    
    var showDates: any = document.getElementsByClassName("date-card")
    
    for(var item in showDates){

      //conversion item to number for avoid error item.style undefined
      
      var itemNumber = Number(item)
     
      if(itemNumber <= 5){
      showDates[itemNumber].style.visibility = "visible";
      }
     
    }
    
  }
  showResult(){
    
    console.log("a");
    document.getElementById("text-result")!.textContent = "Bravo !"
    var resultButtons: any = document.getElementById("result-buttons");
    
    resultButtons.style.visibility = "visible";
    
   
    
    
  }
  

  
  generateCards() {
    
    var drawCards: any = [];
   
  fetch('../assets/cardLibrary.json').then(res => res.json())
  .then(jsonData => {
    
    
    var arr = [];
    var allCardArray = Object.values(jsonData)
    var allCards: any = allCardArray[0]
   
    

    while (arr.length < 6) {
        var r = Math.floor(Math.random() * 14) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

   arr.forEach(element => {
    
    drawCards.push(allCards[element])
    
      
    });

    
    
    
   
  
  });
    
  if(this.isCardDrawed == false){
   
    this.cards2 = drawCards;
   this.isCardDrawed = true;
  }
 }

 refreshPage()
 {
  location.reload();
 }
}
