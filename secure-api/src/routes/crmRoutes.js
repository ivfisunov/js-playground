import {addNewContact, deleteContact, getContacts, getContactWithID, updateContact} from '../controllers/crmController';

import {login, loginRequired, register} from "../controllers/userController";

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, loginRequired, getContacts)

        // POST endpoint
        .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
        // get specific contact
        .get(loginRequired, getContactWithID)

        // put request
        .put(loginRequired, updateContact)

        // delete request
        .delete(loginRequired, deleteContact);


    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.post('/auth/login', login);
}

export default routes;
