const habitController = require('../../../controllers/habits') //check the path is correct
// or is this const router = require('router')??

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
                 .mockResolvedValue(['habit1', 'habit2']);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('show', () => {
        test('it returns a habit with a 200 status code', async () => {
            let testHabit = {
                id: 1,
                habit_name: 'Test Habit',
                habit_description: 'Habit description test',
                habit_frequency: 'daily',
                frequency_target: 2
            }
            jest.spyOn(Habit, 'findById')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { params: { id: 1 } }
            await habitController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('create', () => {
        test('it returns a new habit with a 201 status code', async () => {
            let testHabit = {
                id: 2,
                habit_name: 'Test Habit',
                habit_description: 'Habit description test',
                habit_frequency: 'daily',
                frequency_target: 2
            }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: testHabit}
            await habitController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('update', () => {
        test('it returns an updated habit with a 201 status code', async () => {
            let testHabit = {
            
            }
            jest.spyOn(Habit, 'update')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { params: { id: 3 } }
            await habitController.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith((testHabit));
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