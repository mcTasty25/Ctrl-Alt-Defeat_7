const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members : [
            {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME : lastName
            }
         }
        ]
    }
    });

    
app.listen(3000,function(){
    console.log("Server started on port 3000");
});