import { Models } from "appwrite";

export type TItem = {
  name: string;
  isSelected: boolean;
};

export type TAppWriteDocument<T> = Models.Document & T;

export type TItemDocument = TAppWriteDocument<TItem>;

export interface IItemsService {
  newItem: (itemId: string, item: TItem) => Promise<TAppWriteDocument<TItem>>;
  listItems: () => Promise<TAppWriteDocument<TItem>[]>;
  updateItem: (
    itemId: string,
    item: TItem
  ) => Promise<TAppWriteDocument<TItem>>;
  deleteItem: (itemId: string) => void;
}
