import { Request, Response } from 'express';
import { Item, readItemsFromFile, writeItemsToFile } from '../models/item';

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const items: Item[] = await readItemsFromFile();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error });
    }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
    const itemId = parseInt(req.params.id);
    const newName = req.body.name;

    if (isNaN(itemId) || typeof newName !== 'string') {
        res.status(400).json({ message: 'Invalid input data' });
        return;
    }

    try {
        const items: Item[] = await readItemsFromFile();
        const updatedItems = items.map(item => 
            item.id === itemId ? { ...item, name: newName } : item
        );

        await writeItemsToFile(updatedItems);
        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
    const newItemName = req.body.name;

    if (typeof newItemName !== 'string' || !newItemName.trim()) {
        res.status(400).json({ message: 'Invalid item name' });
        return;
    }

    try {
        const items: Item[] = await readItemsFromFile();
        const newItem: Item = {
            id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
            name: newItemName
        };

        items.push(newItem);
        await writeItemsToFile(items);
        res.status(201).json({ message: 'Item created successfully', newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
    }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    const itemId = parseInt(req.params.id);

    if (isNaN(itemId)) {
        res.status(400).json({ message: 'Invalid item ID' });
        return;
    }

    try {
        const items: Item[] = await readItemsFromFile();
        const filteredItems = items.filter(item => item.id !== itemId);

        if (items.length === filteredItems.length) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        await writeItemsToFile(filteredItems);
        res.status(204).send(); // 204 means "No Content"
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
