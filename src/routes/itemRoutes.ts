import express from 'express';
import { getAllItems, updateItem, createItem, deleteItem } from '../controllers/itemsController';

const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieves all items.
 *     description: Returns a list of all available items.
 *     responses:
 *       200:
 *         description: Success. Returns the list of items.
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Creates a new item.
 *     description: Creates a new item with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: string
 *                 description: Item ID.
 *               name:
 *                 type: string
 *                 description: Item name.
 *     responses:
 *       201:
 *         description: Item successfully created.
 *       400:
 *         description: Bad request or incomplete data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createItem);

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Updates an existing item.
 *     description: Updates an existing item with the provided information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the item.
 *     responses:
 *       200:
 *         description: Item successfully updated.
 *       400:
 *         description: Bad request or incomplete data.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deletes an existing item.
 *     description: Deletes an item by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item successfully deleted.
 *       404:
 *         description: Item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', deleteItem);

export default router;