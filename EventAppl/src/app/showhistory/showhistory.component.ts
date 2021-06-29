import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



import { DataserviceService } from 'src/services/dataservice.service';



@Component({
  selector: 'app-showhistory',
  templateUrl: './showhistory.component.html',
  styleUrls: ['./showhistory.component.css']
})

export class ShowhistoryComponent implements OnInit {

  contents = ''
  results = []
  userid = localStorage.getItem("currentuser")
  upd = 0
  updresult=[]
  updateresult = {}
  contact = {}
  show=0

  eventForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    events: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    date: ['',[Validators.required, Validators.pattern('[0-9 -]*')]]
  })

  constructor(private data: DataserviceService, private elementRef: ElementRef, private sanitizer: DomSanitizer, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.results, event.previousIndex, event.currentIndex);
    console.log(this.results[event.previousIndex])
  }





  showhistory() {
    this.show=1;

    let userid = this.userid
    this.data.showhistory(userid)
      .subscribe((result: any) => {
        if (result) {
          console.log(result);
          this.updresult=result;
          this.results = result;
          
          this.results.sort(function(a, b) {
            var c:any = new Date(a["Date"]);
            console.log(c);
            
            var d:any = new Date(b["Date"]);
            console.log(d);
            
            return c-d;
        });
        for(let elements of this.results)
        {
          
            elements["Date"]= elements["Date"].slice(8,10)+'-'+elements["Date"].slice(5,7)+'-'+elements["Date"].slice(0,4);
         
          // console.log(elements["Date"])
          // elements["Date"]=new Date(elements["Date"])
          // console.log(elements["Date"])
          // elements["Date"] = elements["Date"].getDate() + 1 + "-"+(elements["Date"].getMonth() + 1) + "-" + elements["Date"].getFullYear();
         
        }
        
        
      console.log(this.results);
      }
      },
        (result) => {
          alert(result.error.message)

        }
      )
  }





  delete(userid: any, date: any , event:any) {
    console.log(date, userid);
    
      date= date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2);
    
    let datess=date
    // let datess= date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2);

    this.data.deleteevent(userid, datess,event)
      .subscribe((result: any) => {
        if (result) {
          
        }
      },
        (result) => {
  

        }



      )
    this.showhistory()

  }

  update(userid, date, eventss) {
    let updated = {}
    this.upd = 1
    date= date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2);
    // let dates= datess.slice(6,10)+'-'+datess.slice(3,5)+'-'+datess.slice(0,2);
    console.log(date);
    

    this.updateresult = {
      Date: date,
      userid: userid,
      Event: eventss
    }
    updated = JSON.stringify(this.updateresult)
    this.contact = {
      userid: this.updateresult["userid"],
      events: this.updateresult["Event"],
      date:""
    }
    this.eventForm.setValue(this.contact)

    console.log("result is" + updated, this.updateresult["Date"]);

  }

  update1() {
    if (this.eventForm.valid) {
     let userid = this.eventForm.value.userid;
    let eventss = this.eventForm.value.events;
    let datess = (this.eventForm.value.date)
    
    //  datess = datess.getFullYear() + "-" + (datess.getMonth() + 1) + "-" +datess.getDate() + 1 ;
    // console.log(datess);
    


    console.log(this.contents["userid"], this.contact["dates"], this.contact["event"], eventss, datess);


    this.data.update(this.contact["userid"], this.updateresult["Date"], this.contact["events"], datess, eventss)
      .subscribe((result: any) => {
        if (result) {
          // console.log("anything");
          alert(result.message);
        }
        this.showhistory()
      },
        (result) => {
          alert(result.error.message);

        },



        
      )
      this.upd = 0}
      else{
        alert("Invalid FORM")
      }
    
  }



  cancel() {
    this.upd = 0
  }
  back(){

    this.router.navigateByUrl("dashboard")
  }






}
