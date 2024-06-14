import {get} from "../src/services/user.services.js"
// const testController = require("../src/controller/test.controller.js")
const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "password",
    isAdmin: false
}
const mockReq = {
    user:mockUser.id,
    params: mockUser.id,
    isAdmin: mockUser.isAdmin,


};
const mockRes = {
    send: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
};

// describe('test1123', () => {
//     it('should return hello world', () => {
//         testController.testCase(mockReq, mockRes);
//     });
// });
describe("getuser", () => {
    it("should return user", () =>{
        get(mockReq, mockRes)
    })
});