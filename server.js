var express = require('express'),
app = express();
app.use('/static', express.static('static'));
app.use('/stage', express.static('stage'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
