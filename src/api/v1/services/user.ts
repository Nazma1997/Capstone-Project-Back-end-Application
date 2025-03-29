
import { User } from "../models/user";
import {
    getItems,
    createItems,
    updateItems,
    deleteItems
} from "../repositories/firestore";

const COLLECTION = "users";

export const getAllItems = async (): Promise<User[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getItems(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as unknown as User;
    });
};



export const createItem = async (item: Partial<User>): Promise<User> => {
    const id: string = await createItems(COLLECTION, item);
    return { id, ...item } as User;
};


export const updateItem = async (
    id: string,
    item: Partial<User>
): Promise<User> => {
    await updateItems(COLLECTION, id, item);
    return { id, ...item } as User;
};


export const deleteItem = async (id: string): Promise<void> => {
    await deleteItems(COLLECTION, id);
};
