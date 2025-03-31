import express, { Router } from 'express';
import { customClaims } from '../controllers/admin'; 
const router: Router = express.Router();

/**
 * @openapi
 * /admin/set-custom-claims:
 *   post:
 *     summary: Set custom user claims (Admin only)
 *     description: Assign custom permissions/roles to a user (e.g., make admin, assign branch)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # Requires admin privileges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - claims
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to modify
 *               claims:
 *                 type: object
 *                 description: Key-value pairs of custom claims (e.g., { admin: true, branch: 'NYC' })
 *     responses:
 *       200:
 *         description: Custom claims set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Custom claims updated successfully"
 *                 user:
 *                   $ref: "#/components/schemas/User"
 *       403:
 *         description: Unauthorized (not an admin)
 *       404:
 *         description: User not found
 */
router.post('/set-custom-claims', customClaims);

export default router;