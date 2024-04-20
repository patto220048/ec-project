import testController from '../src/controller/test.controller.js';
// const testController = require("../src/controller/test.controller.js")

const mockReq = {};
const mockRes = {
    send: jest.fn(),
};

describe('test1123', () => {
    it('should return hello world', () => {
        testController.testCase(mockReq, mockRes);
    });
});
