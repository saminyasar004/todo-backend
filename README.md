# **Todo App**

Simple Todo app where user can login his account and get access only his todo and their also an admin who have all access to edit, delete, get user's data.

[![Website](https://img.shields.io/website?label=saminyasar%20🚀&name=hello&style=flat&url=https://saminyasar.netlify.app/)](https://saminyasar.netlify.app/)
[![Facebook Follow](https://img.shields.io/badge/Facebook-Follow-brightgreen)](https://www.facebook.com/saminyasar004/)
[![Facebook Page](https://img.shields.io/badge/Facebook-Page-brightgreen)](https://www.facebook.com/saminyasar04/)
[![Instagram Follow](https://img.shields.io/badge/Instagram-Follow-brightgreen)](https://instagram.com/saminyasar004/)
[![Twitter Follow](https://img.shields.io/badge/Twitter-Follow-brightgreen)](https://twitter.com/saminyasar004/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-Questions-brightgreen)](https://stackoverflow.com/users/14735945/samin-yasar)
[![Github Follow](https://img.shields.io/github/followers/saminyasar004?label=saminyasar004&style=social)](https://github.com/saminyasar004/)


## **Schema**

-   ### User

    -   `_id`
    -   `name`
    -   `email` _unique_
    -   `password`
    -   `role` - [admin, user]
    -   `accountStatus` - [pending, active, rejected]

-   ### Todo

    -   `_id`
    -   `title` _unique_
    -   `description`
    -   `todoStatus` - [incomplete, inProgress, completed]
    -   `authorId`

-   ### Token
    -   `_id`
    -   `token`
    -   `authorId`

## **API Router Endpoints**

-   ### Admin

    -   _Authorization and JWT Token require_

    -   `/api/v1/admin/u/all` - **GET** - Return all users
    -   `/api/v1/admin/u/:userId` - **PATCH** - Only edit accountStatus and role

-   ### User

    -   `/api/v1/u/register` - **POST** - Register a new user
    -   `/api/v1/u/login` - **GET** - Login a user and return a JWT token
    -   `/api/v1/u/logout` - **GET** - Expire the JWT for a logged in user
    -   `/api/v1/u/update` - **PATCH** - Update only user's name JWT require
    -   `/api/v1/u/forgetPassword` - **POST** - Get a pincode in user's mail to change password
    -   `/api/v1/u/changePassword` - **PATCH** - [pinCode, oldPassword, newPassword] - update the user's password

-   ### Todo

    -   _All routes below only works for the logged in user && Authentication require_

    -   `/api/v1/t/new` - **POST** - Creates a new Todo and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **GET** - Get a single Todo and authenticate user by JWT token
    -   `/api/v1/t/all` - **GET** - Get all Todos and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **PATCH** - Update acceptable information of the requested Todo and authenticate user by JWT token
    -   `/api/v1/t/:todoId` - **DELETE** - Delete the requested Todo and authenticate user by JWT token

## **Features**

-   ### Admin

    1. The first user of this system will be an admin
    1. Admin can get all user's data (except password)
    1. Admin can edit an user's accountStatus and role

-   ### User

    1. If the user's accountStatus is pending then user couldn't create any todo untill the admin active this account. only can login.
    1. If the user's accountStatus is rejected then user couldn't login. He must have to contact with the admin through email to activate his account.

-   ### Token

    1. Whenever a user/admin login he gets a JWT token and then the token will be saved in the token database. An user/admin can have only one valid token at a time.
    

#### Happy Coding. 🚀
