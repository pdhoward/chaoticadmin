//Using Another REST Dialect
/*
Here is the elephant in the room of this tutorial. In real world projects, the REST dialect of your API won’t match the JSONPLaceholder dialect. Writing a REST client is probably the first thing you’ll have to do to make admin-on-rest work. Depending on your API, this can require a few hours of additional work.

Admin-on-rest delegates every REST call to a REST client function. This function must simply return a promise for the result. This gives extreme freedom to map any API dialect, add authentication headers, use endpoints from several domains, etc.

For instance, let’s imagine you have to use the my.api.url API, which expects the following parameters:

Action	Expected REST request
Get list	GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]&filter={title:'bar'}
Get one record	GET http://my.api.url/posts/123
Get several records	GET http://my.api.url/posts?filter={ids:[123,456,789]}
Update a record	PUT http://my.api.url/posts/123
Create a record	POST http://my.api.url/posts/123
Delete a record	DELETE http://my.api.url/posts/123
Admin-on-rest defines custom verbs for each of the actions of this list. Just like HTTP verbs (GET, POST, etc.), REST verbs qualify a request to a REST server. Admin-on-rest verbs are called GET_LIST, GET_ONE, GET_MANY, CREATE, UPDATE, and DELETE. The REST client will have to map each of these verbs to one (or many) HTTP request(s).

The code for an API client for my.api.url is as follows:
*/
// in src/restClient
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
import { stringify } from 'query-string';

const API_URL = 'my.api.url';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        url = `${API_URL}/${resource}?${stringify(query)}`;
        break;
    }
    case GET_ONE:
        url = `${API_URL}/${resource}/${params.id}`;
        break;
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        url = `${API_URL}/${resource}?${stringify(query)}`;
        break;
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        url = `${API_URL}/${resource}?${stringify(query)}`;
        break;
    }
    case UPDATE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
    case CREATE:
        url = `${API_URL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
    case DELETE:
        url = `${API_URL}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
    case GET_LIST:
        return {
            data: json.map(x => x),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        };
    case CREATE:
        return { data: { ...params.data, id: json.id } };
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};
///////////////////////
// Using this client instead of the previous jsonServerRestClient is just a matter of switching a function:

// in src/app.js
import myApiRestClient from './restClient';

const App = () => (
    <Admin restClient={myApiRestClient} dashboard={Dashboard}>
        // ...
    </Admin>
);
