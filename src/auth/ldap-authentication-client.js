import axios from 'axios'
const BASE_URL = 'http://localhost:8090/api/ldap';

export async function createLdapClientAndConnect(username, password) {
  const endpoint = `${BASE_URL}`;

  const requestBody = {
    host: '127.0.0.1',
    port: '389',
    adminDn: `cn=${username},cn=Users,dc=ManBearPig,dc=com`,
    adminPassword: `${password}`,
    baseDn: 'dc=ManBearPig,dc=com',
    connectTimeout: '5000',
    maxIdle: '30000',
    maxWait: '5000',
    maxActive: '10',
    socketKeepAlive: true
  };

  try {
    const response = await axios.post(endpoint, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error: " + error);
    if (error.response && error.response.status === 500) {
      throw new Error('Internal server error: Failed to create LDAP client and connect');
    } else {
      throw new Error('Failed to create LDAP client and connect');
    }
  }
}
