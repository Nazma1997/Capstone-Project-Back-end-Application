
import { Request, Response, NextFunction } from "express";
import * as itemService from "../services/loan";
import type { Loan } from "../models/loan";
import { HTTP_STATUS } from "src/constants/httpConstants";


export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Loan[] = await itemService.getAllLoans();

        res.status(HTTP_STATUS.OK).json(
            items
        );
    } catch (error) {
        next(error);
    }
};



export const create = async (
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

        const item: Loan = await itemService.createLoan(data);

      res.status(201).json(
            {
                message: 'Loan created susscssfully',
                item: item
            }
        );
    } catch (error) {
        next(error);
    }
};


export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await itemService.updateLoan(
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

export const review = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await itemService.updateLoan(
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
export const approve = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await itemService.updateLoan(
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


export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await itemService.deleteLoan(req.params.id);
        res.status(200).json({
            message: 'Loan deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
