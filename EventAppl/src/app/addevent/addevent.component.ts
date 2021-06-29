import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/services/dataservice.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  title: any = `Add Your
   Upcoming Events`;

  eventForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    events: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    date: []
  })

  constructor(private data: DataserviceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  save() {
    if (this.eventForm.valid) {
    let userid = this.eventForm.value.userid;
    
    let eventss = this.eventForm.value.events;
    let datess=this.eventForm.value.date;
     console.log(datess);
    
    // let datess:any = new Date(this.eventForm.value.date);
   
    //  datess =datess.getFullYear()  + "-" +(datess.getMonth() + 1) + "-" +datess.getDate() + 1 
  
    console.log(userid, eventss, datess);


    this.data.addevent(userid, eventss, datess)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)

        }
      },
        (result) => {
          alert(result.error.message);

        }

      )}
      else{
      alert("Invalid form")
      }


  }


  back() {
    this.router.navigateByUrl("dashboard")
  }

}
