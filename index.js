const { app, port } = require('./server');

app.listen(port, () => {
    console.log(`listening port ${port}`);
});

require('./routes/route'); 