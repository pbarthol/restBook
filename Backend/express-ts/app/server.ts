/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as configDatabase from './config/database';

// Import Controllers from controllers entry point
import { UserController } from './controllers';
import { LoginController } from './controllers';
import { RestaurantController } from './controllers';
import { UserRestaurantController } from './controllers';
import { BookingController } from './controllers';
import { UploadRestaurantController } from './controllers';
import { UploadMealController } from './controllers';
import { RestaurantImageController } from './controllers';
import { RestaurantImageFileController } from './controllers';
import { MealController } from './controllers';
import { MealsController } from './controllers';
var path = require('path');

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

app.use(express.static(path.join(__dirname, '../public')));

// Turn off cors
var cors = require('cors')
app.use(cors())

// Mount the UserController at the /user route
app.use('/api/login', LoginController);
app.use('/api/user', UserController);
app.use('/api/user/restaurant', UserRestaurantController);
app.use('/api/restaurant', RestaurantController);
app.use('/api/booking', BookingController);
app.use('/api/upload/restaurant', UploadRestaurantController);
app.use('/api/upload/meal', UploadMealController);
app.use('/api/restaurant/images', RestaurantImageController);
app.use('/api/restaurant/image', RestaurantImageFileController);
app.use('/api/meals', MealsController);
app.use('/api/meal', MealController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});