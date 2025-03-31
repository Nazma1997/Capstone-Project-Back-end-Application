import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from 'src/constants/httpConstants';
import * as branchService from "../services/branches";
import { Branch } from '../models/branch';





export const get = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Branch[] = await branchService.getAllBranches();

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
           
        }

        const item: Branch = await branchService.createBranch(data);

      res.status(HTTP_STATUS.CREATED).json(
            {
                message: 'Branch created susscssfully',
                item: item
            }
        );
    } catch (error) {
        next(error);
    }
};

export const branchDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Branch id is required' });
      return;
    }
  
    try {
      const branch = await branchService.getBranchById(Number(id));
      if (!branch) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Branch not found' });
        return;
      }
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: branch,
      });
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

        const updated: Branch = await branchService.updateBranch(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            {
                message: 'Branch Updated successfully',
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
        await branchService.deleteBranch(req.params.id);
        res.status(HTTP_STATUS.OK).json({
            message: 'Branch deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
