
import React                          from 'react';
import './App.css';
import { jsonServerRestClient,
        Admin, Resource }             from 'admin-on-rest';
import { Delete }                     from 'admin-on-rest';
import { AgentList, AgentCreate,
         AgentEdit }                  from './agents';
import { UserList }                   from './users';
import Dashboard                      from './DashBoard'
import authClient                     from './authClient';
import restClient                     from './restClient';
import AgentIcon                      from 'material-ui/svg-icons/social/person';
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

const API_URL = 'http://localhost:5002/admin';

const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: 'SRTRDFVESGNJYTUKTYTHRG'
    }
    return fetchUtils.fetchJson(url, options);
}

const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard} restClient={restClient(API_URL, httpClient)}>
        <Resource name="agents" list={AgentList} edit={AgentEdit} create={AgentCreate} remove={Delete} icon={AgentIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);



export default App;
