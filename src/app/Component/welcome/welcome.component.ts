import { Component, OnInit } from '@angular/core';
//import { AppComponent } from '../appC/app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  isDisabled = true;

  public Jump2(){
    let screenOne = document.getElementById('screenOne')

    let screenTwo = document.getElementById('screenTwo')

    // screenOne.innerHTML = screenTwo.innerHTML;

    screenOne.style.visibility = 'hidden';
    screenOne.style.height = '0';
    screenTwo.style.visibility = 'visible';
  }

  public Jump3(){
    let screenTwo = document.getElementById('screenTwo')

    let screenThree = document.getElementById('screenThree')

    //screenTwo.innerHTML = screenThree.innerHTML;

    screenTwo.style.visibility = 'hidden';
    screenTwo.style.height = '0';
    screenThree.style.visibility = 'visible';

  }
}

