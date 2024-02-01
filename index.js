import bodyParser from "body-parser";
import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;

let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === 'ILoveProgramming') userIsAuthorised = true;
    next();
}
app.use(passwordCheck);

// Get the current file' path
const __filename = fileURLToPath(import.meta.url);
// Get the current directory
const __dirname = dirname(__filename);

// route to handle index page request
app.get('/', (req, res) => {
    // use res.sendFile() to send the HTML file
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// route to handle form on /check
app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(path.join(__dirname, 'public/secret.html'));
    } else {
        res.redirect('/');
    }
    userIsAuthorised = false;
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});