import { Client, Account, Databases } from "appwrite";
import { IItemsService, TItem, TItemDocument } from "./types";
const client = new Client();
const account = new Account(client);
const db = new Databases(client);
const DB = import.meta.env.VITE_DB_ID;
const COLLECTION = import.meta.env.VITE_COLLECTION_ID;
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const createMagicLink = async (id: string, email: string) => {
  try {
    await account.createMagicURLSession(
      id,
      email,
      import.meta.env.VITE_MAGIC_LINK_URL
    );
  } catch (error) {
    console.log(error);
  }
};
export const itemsServices: IItemsService = {
  newItem: (itemId: string, item: TItem) => {
    return db.createDocument<TItemDocument>(DB, COLLECTION, itemId, item);
  },
  listItems: async () => {
    const res = await db.listDocuments<TItemDocument>(DB, COLLECTION);
    return res.documents;
  },
  updateItem: (itemId: string, item: TItem) => {
    return db.updateDocument<TItemDocument>(DB, COLLECTION, itemId, item);
  },
  deleteItem: (itemId: string) => {
    return db.deleteDocument(DB, COLLECTION, itemId);
  },
};
