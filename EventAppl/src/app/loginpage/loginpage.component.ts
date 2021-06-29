import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/services/dataservice.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginForm = this.fb.group({
    userid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
  })




  constructor(private fb: FormBuilder, private router: Router, private data: DataserviceService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      let users = this.data.userdetails
      let userid = this.loginForm.value.userid;
      let password = this.loginForm.value.password;
      console.log(userid, password);

      this.data.loginData(userid, password)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            localStorage.setItem("currentuser", userid);
            localStorage.setItem("username", result.username)
            this.router.navigateByUrl("dashboard")
          }
        },
          (result) => {
            alert(result.error.message)
          })
    }




    //   if (userid in users) {
    //     if (userid == users[userid]["userid"] && password == users[userid]["password"]) {
    //       localStorage.setItem("currentuser", userid);
    //       alert("login succesfull")
    //       this.router.navigateByUrl("dashboard")

    //     }
    //     else {
    //       alert("invalid username or password")
    //     }
    //   }
    //   else {
    //     alert("invalid user")
    //   }

    // }
    else {
      alert("invalid form")
    }

  }



  register() {
    this.router.navigateByUrl("register")
  }


}
