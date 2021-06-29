import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  option = {
    withCredentials: true
  }

  userdetails: any = {
    divya123: { userid: "divya123", username: "Divya", password: "divya@123" },
    anu123: { userid: "anu123", username: "Anu", password: "anu@123" },
    smruthi123: { userid: "smruthi123", username: "Smruthi", password: "smruthi@123" }
  }

  events = {
    divya123: { userid: "divya123", plans: [{ Date: "9-6-2021", Event: "Meeting" }, { Date: "10-6-2021", Event: "Shopping" }] },
    anu123: { userid: "anu123", plans: [{ Date: "9-6-2021", Event: "Bill payments" }, { Date: "10-6-2021", Event: "Accounts verification" }] },
    smruthi123: {
      userid: "smruthi123", plans: [{ Date: "9-6-2021", Event: "Inaugration Day" }, { Date: "10-6-2021", Event: "Purchasing" }]
    }
  };

  // anu123: { "2021-06-09": { Date: "2021-06-09", Event: "Bill payments" }, "2021-06-10": { Date: "2021-06-10", Event: "Accounts verification" } },
  // smruthi123: { "2021-06-09": { Date: "2021-06-09", Event: "Inaugration Day" }, "2021-06-10": { Date: "2021-06-10", Event: "Purchasing" } }


  constructor(private http: HttpClient) { }

  registerIndata(userid: any, username: any, password: any) {

    const data = { userid, username, password }
    return this.http.post("http://localhost:3000/register", data)

  }

  loginData(userid: any, password: any) {
    const data = { userid, password }
    return this.http.post("http://localhost:3000/login", data, this.option)
  }

  showhistory(userid: any) {
    const data = { userid }

    return this.http.get("http://localhost:3000/showhistory/" + userid, this.option)
  }

  addevent(userid, eventss, datess) {


    const data = { userid, eventss, datess }
    console.log(data);
    return this.http.post("http://localhost:3000/addevent", data, this.option)

  }

  deleteevent(userid, datess,eventss) {
    const data = { datess, userid }
    console.log("http://localhost:3000/deletes/" + userid + '/' + datess);

    return this.http.delete("http://localhost:3000/deletes/" + userid + '/' + datess +'/'+eventss, this.option)


  }
  reminder(userid, todays) {
    const data = { userid, todays }
    return this.http.get("http://localhost:3000/reminder/" + userid + '/' + todays, this.option)
  }


  update(userid: any, datess: any, eventss: any, dates: any, events: any) {
    const data = { userid, datess, eventss, dates, events }
    console.log(data);
    console.log("http://localhost:3000/updates", data, this.option);

    return this.http.put("http://localhost:3000/updates", data, this.option)
  }

}
