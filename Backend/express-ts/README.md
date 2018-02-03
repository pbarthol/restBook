# Restbook

## MongoDB

Start the mongoDB Server
- Open a command shell.
- Execute 'cd C:\Program Files\MongoDB\Server\3.4\bin'
- Execute 'mongod --dbpath D:\RestBook\Backend\db'


## Backend server

Start Backend:
- Open a command shell.
- Execute 'cd D:RestBook/Backend/express-ts'
- Execute 'TSC' for compiling project
- Execute 'node build/server.js' for starting the server
- 'Listening at http://localhost:3000/' is displayed in the console

Testing the backend
- Open Application Postman
- 'http://localhost:3000/user/' in the GET input
- Execute 'Send'
- 'Hello, World!' must be displayed

Stop Backend Server:
-


Problems during development:
Can't bind to 'ngModel' since it isn't a known property of 'p-dropdown'.:
    import { FormsModule } from '@angular/forms'; was not in app.module.ts
