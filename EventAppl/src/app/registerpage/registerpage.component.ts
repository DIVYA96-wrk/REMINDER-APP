import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/services/dataservice.service';


@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  registerForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]],
  })



  constructor(private fb: FormBuilder, private router: Router, private data: DataserviceService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      let users = this.data.userdetails;
      let userid = this.registerForm.value.userid;
      let username = this.registerForm.value.username;
      let password = this.registerForm.value.password;

      this.data.registerIndata(userid, username, password)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message);
            // if (userid in users) {
            //   alert("user already exist , please log in!!")
            // }
            // else {

            //   users[userid] = {
            //     userid: userid,
            //     username: username,
            //     password: password
            //   }
            //   console.log(users[userid]);

            this.router.navigateByUrl('')
          }
        },
          (result) => {
            alert(result.error.message);
          }
        )

    }

    else {
      alert("invalid form")
    }

  }

  login(){
    this.router.navigateByUrl('')
  }


}
