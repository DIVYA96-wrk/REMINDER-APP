import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/services/dataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  username = "";
  userid=""
  results = [];

  constructor(private router: Router, private data: DataserviceService) {
    this.username = localStorage.getItem("username")
    this.userid=localStorage.getItem("currentuser")

    this.reminder()
  }

  ngOnInit(): void {
  }

  addevent() {
    this.router.navigateByUrl("addevent")

  }

  showhistory() {
    this.router.navigateByUrl("showhistory")
   
  }

  reminder() {
    let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

let todays = yyyy + '-' + mm + '-' +dd;
 
    console.log(todays);
    let userid = localStorage.getItem("currentuser")
    this.data.reminder(userid, todays)
      .subscribe((result: any) => {
        if (result) {
          console.log(result);
         
          this.results = result
          for(let elements of this.results)
        {
          
            elements["Date"]= elements["Date"].slice(8,10)+'-'+elements["Date"].slice(5,7)+'-'+elements["Date"].slice(0,4);
         
          
         
        }
        

        }
      })


  }

  LOGOUT(){
    this.router.navigateByUrl("")
  }

}
