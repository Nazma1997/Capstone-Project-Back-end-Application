import { Request, Response } from "express";
import * as userController from "../src/api/v1/controllers/user";
import * as userService from "../src/api/v1/services/user";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/services/user.ts");

describe("Loan Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      body: {},
      params: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe("create", () => {
    it("should create a new user and return 201 status", async () => {
    
      const mock = {
        id: "1",
        name: 'user 1',
        email: 'test@gmail.com',
        password: '123456',
        
      };

      (userService.createUser as jest.Mock).mockResolvedValue(mock);

    await userController.create(mockReq as Request, mockRes as Response, mockNext);
  
      expect(userService.createUser);
      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
       item: mock,
       message: "User created successfully",

      });
    });

   

    it("should handle service errors", async () => {
      const error = new Error("Database error");
      (userService.createUser as jest.Mock).mockRejectedValue(error);
      mockReq.body = { price: 1000,};

      await userController.create(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe("update", () => {
     it("should update user successfully", async () => {
       const userId = "3ycqSUJmqIDsGHOdYwrB";
       const updateData = {  name: 'change name'};
       const updated = { id: userId, ...updateData };
 
       mockReq.params = { id: userId };
       mockReq.body = updateData;
       (userService.updateUser as jest.Mock).mockResolvedValue(updated);
 
    await userController.update(mockReq as Request, mockRes as Response, mockNext);

 
       expect(userService.updateUser).toHaveBeenCalledWith(userId, updateData);
       expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
       expect(mockRes.json).toHaveBeenCalledWith({
         message: 'Updated successfully',
         item: updated
       });
     });
 
     it("should reject invalid status updates", async () => {
       mockReq.params = { id: "asdas" };
       mockReq.body = { name: 'djsaid' };
 
       await userController.update(mockReq as Request, mockRes as Response, mockNext);
 
       expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
     });
   });
   
 

 

});