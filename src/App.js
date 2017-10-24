
import React                          from 'react';
import './App.css';
import { fetchUtils,
         Admin, Resource }            from 'admin-on-rest';
import { Delete }                     from 'admin-on-rest';
import { AgentList, AgentCreate,
         AgentEdit }                  from './db/agents';
import { ClientList }                   from './db/clients';
import Dashboard                      from './DashBoard'
import authClient                     from './authClient';
import restClient                     from './restClient';
import AgentIcon                      from 'material-ui/svg-icons/social/person';
import ClientIcon                       from 'material-ui/svg-icons/social/group';

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
        <Resource name="clients" list={ClientList} icon={ClientIcon} />
    </Admin>
);

export default App;
