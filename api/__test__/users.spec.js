import testController from "../src/controller/test.controller.js/index.js"

const mockReq = {

}
const mockRes={
    send: jest.fn()
}

describe('test1123', () => { 
    it('should return hello world', () => { 
        testController.testCase
    })
 })