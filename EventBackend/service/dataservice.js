const db = require("./db")

userdetails = {
    divya123: { userid: "divya123", username: "Divya", password: "divya@123" },
    anu123: { userid: "anu123", username: "Anu", password: "anu@123" },
    smruthi123: { userid: "smruthi123", username: "Smruthi", password: "smruthi@123" }
};

events = {
    divya123: { userid: "divya123", plans: [{ Date: "9-6-2021", Event: "Meeting" }, { Date: "10-6-2021", Event: "Shopping" }] },
    anu123: { userid: "anu123", plans: [{ Date: "9-6-2021", Event: "Bill payments" }, { Date: "10-6-2021", Event: "Accounts verification" }] },
    smruthi123: {
        userid: "smruthi123", plans: [{ Date: "9-6-2021", Event: "Inaugration Day" }, { Date: "10-6-2021", Event: "Purchasing" }]
    }
};


const register = (userid, username, password) => {
    let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

let todays = yyyy + '-' + mm + '-' +dd;
    // var users = userdetails;
    return db.User.findOne({ userid })
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "user already exists"
                }
            }
            else {
                const newUser = new db.User({
                    userid: userid,
                    username: username,
                    password: password

                })
                newUser.save();

                const newEvent = new db.Event(
                    {
                    userid: userid,
                    plans: [{
                        Date: todays,
                        Event: "You Joined on this Day!!"

                    }
                   ]

                })
                newEvent.save();

                return {
                    statusCode: 200,
                    status: true,
                    message: "succesfully registerd"
                }
            }
        })
};





// }

const login = (req, userid, password) => {
    // var users = userdetails;
    // if (userid in users) {
    return db.User.findOne({ userid, password })
        .then(users => {
            if (users) {
                req.session.currentuser = userid;
                return {
                    statusCode: 200,
                    status: true,
                    message: "login succesful",
                    username: users["username"]

                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Invalid credential"

                }
            }
        })
};


const addevent = (req, userid, eventss, datess) => {
    console.log(userid);
    // let userid = req.session.currentuser;
    // let event = events
    // users = event[userid]
    // console.log(userid);
    return db.Event.findOne({ userid })
        .then(users => {
            if (!users) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Invalid Userid"
                }
            }
            if (userid != req.session.currentuser) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Please Enter your Userid.."
                }
            }
            // console.log(users);
            users["plans"].push({
                Date: datess,
                Event: eventss
            })


            users.save();
            return {
                statusCode: 200,
                status: true,
                message: "Event added succesfully",

            }

        })
};



const showhistory = (userid) => {


    let html_data = []

    return db.Event.findOne({ userid })
        .then(user => {
            console.log(user["plans"].length);
            let len = user["plans"].length;
            for (let i = 0; i < len; i++) {
                html_data.push({
                    Date: user["plans"][i]["Date"],
                    Event: user["plans"][i]["Event"]

                })

            }

            return html_data

        }
        )
};

const deletes = (userid, datess,eventss) => {
    return db.Event.updateOne({ "userid": userid }, { $pull: { plans: { Date: datess ,Event:eventss } } })
        .then(result => {
            if (result) {
                console.log(result);
                return {
                    statusCode: 200,
                    status: true,
                    message: "Deleted succesfully",


                }

            }



        })


}

const reminder = (userid, todays) => {
    let reminderToday = []
    return db.Event.findOne({ userid })
        .then(user => {
            // console.log(user["plans"].length);
            let len = user["plans"].length;
            for (let i = 0; i < len; i++) {
                if (user["plans"][i]["Date"] == todays) {
                    reminderToday.push({
                        Date: user["plans"][i]["Date"],
                        Event: user["plans"][i]["Event"]
                    })
                }


            }
            return reminderToday
        })
}

const update = (userid, datess, eventss, dates, events) => {
    console.log(userid, datess, eventss, dates, events);

    return db.Event.findOne({ userid })

        .then(user => {
            let len = user["plans"].length;
            for (let i = 0; i < len; i++) {
                if (user["plans"][i]["Date"] == datess && user["plans"][i]["Event"] == eventss) {
                    user["plans"][i]["Date"] = dates;
                    user["plans"][i]["Event"] = events
                }


            }
            user.save();

            return {
                statusCode: 200,
                status: true,
                message: "Updated succesfully",


            }

        })

}





module.exports = { register, login, addevent, showhistory, deletes, reminder, update }