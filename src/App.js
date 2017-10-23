
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
import restClient                     from './restClient';
import PostIcon                       from 'material-ui/svg-icons/action/book';
import UserIcon                       from 'material-ui/svg-icons/social/group';

/*
const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);
*/
const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard} restClient={restClient}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);

export default App;
