import { Account ,Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kinjal.aora',
    projectId: '67121d9a002e801a3dbc',
    databaseId: '67122d5e00185ff0ef4e',
    userCollectionId: '67122d8e001084a6179a',
    videoCollectionId: '67122dc8001cb5df5f9f',
    storageId: '67123080001464bac139'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser = () =>  {
    // Register User
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}

