const express = require("express")
const request = require("request")
const bp = require("body-parser")
const https = require("https")

const app = express()
app.use(bp.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html", __dirname + "/signup.css")
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.post("/", function(req, res){
    const firstName = req.body.Fname
    const lastName = req.body.Lname
    const email = req.body.email
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const JsonData = JSON.stringify(data)
    const url = ""
    const options = {
        method: "POST",
        auth: ""
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data) + "\n")
        })
        console.log(response.statusCode)
        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }
        else {
            res.sendFile(__dirname + '/failure.html')
        }
    })

    request.write(JsonData)
    request.end()
})

app.listen(process.env.PORT || 3000, function(){
    console.log("if the opps looking dexterous, their brains we cooking delicious")
})
