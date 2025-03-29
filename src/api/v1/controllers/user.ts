import { Request, Response, NextFunction } from 'express'
import { UserRecord } from 'firebase-admin/auth';
import { auth } from "../../../../config/firebaseConfig";
import { clientAuth } from '../../../../config/firebaseClient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HTTP_STATUS } from 'src/constants/httpConstants';



export const userDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'User id is required' });
      return;
    }
  
    try {
      const user: UserRecord = await auth.getUser(id);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
    
        const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
        if (userCredential.user) {
         
            const idToken = await userCredential.user.getIdToken();
            res.status(HTTP_STATUS.OK).json({ idToken });
        } else {
            throw new Error("User is null");
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to sign in" });
    }
};