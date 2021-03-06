import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField,
         EditButton, Filter, DisabledInput, LongTextInput,
         ReferenceInput, Responsive, SelectInput, SimpleForm,
         SimpleList, TextInput } from 'admin-on-rest';

const AgentFilter = (props) => (
          <Filter {...props}>
              <TextInput label="Search" source="q" alwaysOn />
              <ReferenceInput label="Client" source="clientId" reference="clients" allowEmpty>
                    <SelectInput optionText="name" />
              </ReferenceInput>
          </Filter>
);

export const AgentList = (props) => (
    <List {...props} filters={<AgentFilter />}>
     <Responsive
          small={
              <SimpleList
                  primaryText={record => record.title}
                  secondaryText={record => `${record.views} views`}
                  tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
              />
          }
          medium={
              <Datagrid>
                  <TextField source="id" />
                  <ReferenceField label="Client" source="clientId" reference="clients">
                      <TextField source="name" />
                  </ReferenceField>
                  <TextField source="handle" />
                  <TextField source="greeting" />
                  <EditButton />
              </Datagrid>
          }
      />
    </List>
);

const AgentTitle = ({ record }) => {
    return <span>Agent {record ? `"${record.title}"` : ''}</span>;
};

export const AgentEdit = (props) => (
    <Edit title={<AgentTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="Client" source="clientId" reference="clients">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="handle" />
            <LongTextInput source="greeting" />
        </SimpleForm>
    </Edit>
);

export const AgentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="Client" source="clientId" reference="clients" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="handle" />
            <LongTextInput source="greeting" />
        </SimpleForm>
    </Create>
);

//Tip: The <Edit> and the <Create> components use the same <ReferenceInput> configuration,
// except for the allowEmpty attribute, which is required in <Create>.

// The form rendered in the create and edit pages is already functional.
// It issues POST and PUT requests to the REST API upon submission

// use <SimpleList /> component instead of <Datagrid for a mobile responsive experience
/* The <SimpleList> component uses material-ui’s <List> and <ListItem> components,
   and expects functions as primaryText, secondaryText, and tertiaryText props.
   However it leads to a poor desktop experience. So the <Responsive> component is used
   to detect and respond to screen size
*/
