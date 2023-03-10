const express = require("express");
const session = require("express-session");
const app = express();
const mongoDBSession = require("connect-mongodb-session")(session)
const path = require('path')


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Files import
const mongoURL = require("./db"); // DataBase(DB) Connections

// MiddleWares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

// Creating the DataBase
const store = new mongoDBSession({
    uri: mongoURL,
    collection: "session"
})
app.use(
    session({
        secret: "This is Secret",
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

// Home Page
app.get("/", (req, res)=>{
    return res.send("Welcome to my Profile web Page App.")
})

// Register Page
app.get("/registration",(req, res)=>{
    return res.render("registration")
})
app.post("/registration", async(req, res)=>{
    // return res.render("Registration")
    try {
        await cleanUpAndValidate()
    } catch (error) {
        return res.send({
            status:400,
            message:error
        })
    }
})

// Login Page
app.get("/login",(req, res)=>{
    // return res.render("../app/Views/Login.ejs")
    return res.render("login")
})



const PORT = process.env.PORT || 8000;
app.listen( PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:8000/`)
})