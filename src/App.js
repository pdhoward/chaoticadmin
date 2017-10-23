
import React                          from 'react';
import './App.css';
import { jsonServerRestClient,
        Admin, Resource }             from 'admin-on-rest';
import { Delete }                     from 'admin-on-rest';
import { PostList, PostCreate,
         PostEdit }                   from './posts';
import { UserList }                   from './users';
import Dashboard                      from './DashBoard'
import authClient                     from './authClient';
//import restClient                     from './restClient';
import PostIcon                       from 'material-ui/svg-icons/action/book';
import UserIcon                       from 'material-ui/svg-icons/social/group';

///////////////////////////////
////////////////////////////
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';

/**
 * Execute the REST request and return a promise for a REST response
 *
 * @example
 * restClient(GET_ONE, 'posts', { id: 123 })
 *  => Promise.resolve({ data: { id: 123, title: "hello, world" } })
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the action type
 * @returns {Promise} the Promise for a REST response
 */
// const restClient = (type, resource, params) => new Promise();
const restClient = (type, resource, params) => {
  return new Promise( (resolve, reject) => {
          resolve({ data: { id: 123, title: "hello, world" } } )
        } ) }

/*
const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);
*/
const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard}
            restClient={restClient(GET_ONE, 'posts', { id: 123 })  }>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon} />

    </Admin>
);

export default App;
