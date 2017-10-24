import React from 'react';
import { List, Datagrid, EmailField, TextField } from 'admin-on-rest';

export const ClientList = (props) => (
    <List title="All clients" {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);
