/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as configDatabase from './config/database';

// Import Controllers from controllers entry point
import { UserController } from './controllers';
import { RestaurantController } from './controllers';
import { BookingController } from './controllers';

// Connect to the database
var mongoose = require('mongoose').set('debug', true);
// mongoose.connect('mongodb://localhost:27017/restBook');
mongoose.connect(configDatabase.database);
console.log("Connected to the db.")

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser);

// Turn off cors
var cors = require('cors')
app.use(cors())


// Mount the UserController at the /user route
app.use('/api/user', UserController);
app.use('/api/restaurant', RestaurantController);
app.use('/api/booking', BookingController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});