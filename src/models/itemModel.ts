export interface Item {
    id: number;
    name: string;
}


import fs from 'fs';

const JSON_FILE_PATH = './src/json/items.json';

export const readItemsFromFile = async (): Promise<Item[]> => {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

export const writeItemsToFile = async (items: Item[]): Promise<void> => {
    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(items, null, 2));
};