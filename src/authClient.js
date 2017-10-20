import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username } = params;
        localStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};

// NOTE
/*
Most admin apps require authentication. Admin-on-rest can check user credentials before displaying a page,
and redirect to a login form when the REST API returns a 403 error code.

What those credentials are, and how to get them, are questions that you must answer. Admin-on-rest makes
no assumption about your authentication strategy (basic auth, OAuth, custom route, etc), but gives you the
hooks to plug your logic at the right place - by calling an authClient function.

For this tutorial, since there is no public authentication API we can use, let’s use a fake
authentication provider that accepts every login request, and stores the username in localStorage.
Each page change will require that localStorage contains a username item.

The authClient is a simple function, which must return a Promise:

Tip: As the restClient response is asynchronous, you can easily fetch an authentication server in there.

To enable this authentication strategy, pass the client as the authClient prop in the <Admin> compone
*/
