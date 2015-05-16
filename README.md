# express-crud
Get CRUD functionality directly in your Express Application.

Get the following CRUD Routes functionality:

 * '/' - GET - query all the resources (pagination available)
 * '/' - POST - save the resource
 * '/:id' - GET - find a resource with id
 * '/:id' - PUT - update resource with id
 * '/:id' - DELETE - delete resource with id

### Usage

first require the express-crud module - require('express-crud);

now in your routes file

```javascript
var User = require('../models/user');
var UserController = require('express-crud');
UserController.model = User;

module.exports = UserController;
```

in your app.js file

```javascript
app.use('/users', require('./routes/users'));
```


Thats it, now you have full CRUD API for the users resource.

So for example if you wanted to query out all the users you can hit (GET) the endpoint '/users'

To save a user hit (POST) '/users'

To get pagination simply append '?page=1' at your resource example: '/users?page=2&perPage=10' (perPage defaults to 10 if not passed)

The response object will look like this

```javascript
{
	totalPages: 15,
    currentPage: 2,
    data: [
    	//your resource here
    ]
}
```

For any queries get in touch with me at anildukkipatty@gmail.com or raise an issue
