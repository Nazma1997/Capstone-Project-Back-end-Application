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

 

 

});