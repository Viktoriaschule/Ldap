import app from './app';
import config from './utils/config';

app.listen(config.port, () => {
    console.log('Listening on port ' + (config.port));
});