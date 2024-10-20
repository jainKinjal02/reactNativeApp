import { Account ,Client, ID, Avatars, Databases, Query} from 'react-native-appwrite';

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
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email,password,username) =>  {
    // Register User

    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        console.log(newAccount);
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        return newUser;

    }catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const  signIn = async (email,password) => {
    try{
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    }catch(error){
        throw new Error(error);
    }
}


export const getCurrentUser = async () =>{
    try{

        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    }catch (error) {
        console.log(error);
    }
}