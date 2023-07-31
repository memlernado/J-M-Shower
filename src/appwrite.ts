import { Client ,Account} from "appwrite";

const client = new Client();
const account = new Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);





export const createMagicLink = async(id:string,email:string) => {
  try {
    const a = await account.createMagicURLSession(id, email, "http://localhost:5173/App");
    console.log(a)
  } catch (error) {
    console.log(error)
  }
}

