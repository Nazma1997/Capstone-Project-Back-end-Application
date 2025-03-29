/**
 * @openapi
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       properties:
 *         id:
 *          type: number
 *         name: 
 *          type: string
 *         price:
 *          type: number
 *        description:
 *         type: string
 *         is_reviewed:
 *           type: boolean
 *         is_approved:
 *           type: boolean
 */
export type Loan = {
    id: number,
    name: string;
    description: string;
    price?: number;
    created_at: Date;
    update_at: Date;
    is_reviewed: Boolean;
    is_approved: Boolean
};
