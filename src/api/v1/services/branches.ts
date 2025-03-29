
import { Branch } from "../models/branch";
import {
    getItems,
    createItems,
    updateItems,
    deleteItems
} from "../repositories/firestore";

const COLLECTION = "branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getItems(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as unknown as Branch;
    });
};



export const createBranch = async (item: Partial<Branch>): Promise<Branch> => {
    const id: string = await createItems(COLLECTION, item);
    return { id, ...item } as Branch;
};


export const updateBranch = async (
    id: string,
    item: Partial<Branch>
): Promise<Branch> => {
    await updateItems(COLLECTION, id, item);
    return { id, ...item } as Branch;
};


export const deleteBranch = async (id: string): Promise<void> => {
    await deleteItems(COLLECTION, id);
};
