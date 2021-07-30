const userController = require('../../../controllers/user') //check the path is correct
// or is this const router = require('router')??

const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns users with a 200 status code', async () => {
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(['user1', 'user2']);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['user1', 'user2']);
        })
    });

    describe('show', () => {
        test('it returns a user with a 200 status code', async () => {
            let testUser = {
                email: 'email@email.com',
                name: 'user',
                passwordDigest: 'password'
            }
            jest.spyOn(User, 'findByEmail')
                .mockResolvedValue(new User(testUser));
                
            const mockReq = { params: { id: 1 } }
            await habitController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    
})