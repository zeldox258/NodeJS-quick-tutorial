// server.js
const express = require("express");
const { io } = require("socket.io-client");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // You can change the port if needed

app.use(bodyParser.json());

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to main server:", socket.id);
});

socket.on("message", (data) => {
    console.log("Main server says:", data);
});

socket.on("disconnect", () => {
    console.log("Disconnected from main server.");
});

socket.on("subscription", () => {
    console.log("You have subscribed to the main server.");
});

app.post("/send-message", (req, res) => {
    const message = req.body.message;
    if (message) {
        socket.emit("message", message);
        res.status(200).send("Message sent to main server.");
    } else {
        res.status(400).send("Message is required.");
    }
});

app.post("/subscribe", (req, res) => {
    socket.emit("subscribe");
    res.status(200).send("Subscribed to main server.");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
