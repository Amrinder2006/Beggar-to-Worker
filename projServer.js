const express = require("express");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static("public"));

// admin route
app.post("/admin-process", (req, res) => {
    let Email = req.body.Email;
    let Password = req.body.Password;

    if (Email === "admin@gmail.com" && Password === "123") {
        res.send("Valid");
    } else {
        res.send("Wrong");
    }
});

// server start
const PORT = process.env.PORT || 2006;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
