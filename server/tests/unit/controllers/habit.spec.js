const habitController = require('../../../controllers/habit') //check the path is correct
const Habit = require('../../../models/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns habits with a 200 status code', async () => {
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(['', '']);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['Habit 1']);
        })
    });

    // describe('show', () => {
    //     test('it returns a habit with a 200 status code', async () => {
    //         let testHabit = {
                
    //         }
    //         jest.spyOn(Habit, 'findById')
    //             .mockResolvedValue(new Habit(testHabit));
                
    //         const mockReq = { params: { id: 1 } }
    //         await habitController.show(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith(new habit(testHabit));
    //     })
    // });

    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let testHabit = {
            
            }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: testHabit}
            await habitController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('destroy', () => {
        test('it returns a 204 status code on successful deletion', async () => {
            jest.spyOn(Habit.prototype, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { id: 1 } }
            await habitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });
    
})