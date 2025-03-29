
import { Request, Response, NextFunction } from "express";
import * as itemService from "../services/loan";
import type { Loan } from "../models/loan";
import { HTTP_STATUS } from "src/constants/httpConstants";


export const getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Loan[] = await itemService.getAllItems();

        res.status(HTTP_STATUS.OK).json(
            items
        );
    } catch (error) {
        next(error);
    }
};



export const createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = {
            ...req.body,
            is_reviewed: 0,
            is_approved: 0
        }

        const item: Item = await itemService.createItem(data);

      res.status(201).json(
            {
                message: 'Item created susscssfully',
                item: item
            }
        );
    } catch (error) {
        next(error);
    }
};


export const updateItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Item = await itemService.updateItem(
            req.params.id,
            req.body
        );

        res.status(200).json(
            {
                message: 'Updated successfully',
                item: updated
            }
        );
    } catch (error) {
        next(error);
    }
};

export const reviewItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Item = await itemService.updateItem(
            req.params.id,
           {
            is_reviewed: true
           }
        );

        res.status(200).json(
            {
                message: 'Reviewd successfully',
                item: updated
            }
        );
    } catch (error) {
        next(error);
    }
};
export const approveItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Item = await itemService.updateItem(
            req.params.id,
           {
            is_approved: true
           }
        );

        res.status(200).json(
            {
                message: 'Approved successfully',
                item: updated
            }
        );
    } catch (error) {
        next(error);
    }
};


export const deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await itemService.deleteItem(req.params.id);
        res.status(200).json({
            message: 'Item deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
