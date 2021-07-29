const Habit = require('../../../models/Habit');
const db = require('../../../dbConfig/init');
const pg = require('pg');
jest.mock('pg');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        test('resolves with habit upon successful db query', async () => {
            let habit = {email: "email@email.co.uk", name: "Sleeping", description: "Sleeping 8 hours a day", 
            frequency: "daily", frequencyTarget: "1", streak: 0}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [...habit]});
            const result = Habit.create(habit)
            expect(result).toHaveProperty('email')
        })
    });

    describe('filterByEmail', () => {
        test('resolves with habits of specific email upon successful db query'), async () => {
            let habit = {email: "email@email.co.uk", name: "Sleeping", description: "Sleeping 8 hours a day", 
            frequency: "daily", frequencyTarget: "1", streak: 0}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [...habit]});
            const result = await Habit.filterByEmail("email@email.co.uk")
            expect(result.email).toEqual(habit.email)
        }
    });

    describe('findById', () => {
        test('resolves habit upon successful db query', async () => {
            let habit = {email: "email@email.co.uk", name: "Sleeping", description: "Sleeping 8 hours a day", 
            frequency: "daily", frequencyTarget: "1", streak: 0}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{...habit, id:1}]});
            const result = await Habit.findById(1)
            expect(result).toBeInstanceOf(Habit)
        })
    })
})