## Tours Booking System

###### authentication and authorization is all about users accessing routes and resources using permissions that we grant them.

### tour Routes
{{tURL}}/tours/monthly-plan/
##### this route uses aggregation pipelines to specially query the data base, and the best monthly plans
##### how it works
for the route, enter a year that is within the range of the available tour dates stored on the database. 
For example, use the year 2021
###### how the aggregation pipeline works
the aggregation pipeline works by runnng the aggregate function on the "Tour" schema. 
<code goes here> await Tour.aggregate()<code>

### because the dates have been stored as an array on the database, we first run the special "$unwind" function on the start dates object.
- the $unwind function seperates the array of dates into separate entities and prepares it further cleaning.
- after the array is unwound, the dates are set to $match with the date given as a parameter *eg 2021* 
- we can then group the data based on **_id**, **tours**, or any other arbitrary name. 
- you can also choose to sort and limit the fields.
 #### Mongoose aggregation is a special and yet simple way of getting more information from our existing data. Suppossing a company wants to   


## authentication routes
user sign Up
{{tURL}}/users/signup

user login
{{tURL}}/users/login 

when you query for all the users, in the userschema, under the password fields, you can choose to not send the users' password back. Simply set <select: false>, under the password field.


#### setting user roles and permissions (User Authorization)
we add a "roles" field to the user schema. A middleware is then created that will filter out all other roles except for the desired one (eg, only an admin should be allowed to delete some resources).
Normally, middlewares cannot accept variables, so we use a wrapper function to wrap the middleware and pass arguments to it.
These arguments are filtered, and only the specified role is allowed access to that resource.

### Password reset functionality. (In a scenario where the user is not logged in.)
{{tURL}}/users/forgotPassword
In cases where the user forgets his password, he must provide a registered email address.
Afterwards, a token is generated (via mongoose middleware), and sent to the user's email.

{{tURL}}/users/resetPassword/:token
an email is sent via to the user. this email has a token which is then used to direct the user to a page where he can update his password.

#### updating users' password when user is already logged in...
{{tURL}}/users/updateMyPassword

#### updating users' credentials when user is already logged in
{{tURL}}/users/updateMe
this route allows an already logged in user to update his credentials except passwords

#### deleting current user
{{tURL}}/users/deleteMe
this sets the users' "active" feild to false. when you query for all users, that user will not be displayed even if it is still stored in the database.
this is acheived using a mongoose middleware that runs for all "find" hooks.

##child referencing vs embedding
