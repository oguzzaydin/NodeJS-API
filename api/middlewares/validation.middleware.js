const app = express();

//Middleware function validation catch error
app.use((err, req, res, next) => {
    if (err.isJoi) {
        res.status(400).json(err.details);
        return;
    }

    res.status(500).send('Internal Server Middleware Validation Error');
});