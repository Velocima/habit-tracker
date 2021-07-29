const User = require('../../../models/User');
const db = require('../../../dbConfig/init');
const pg = require('pg');
jest.mock('pg');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        test('resolves with user upon successful db query', async () => {
            let user = {email: "email@email.co.uk", name: "User1", passwordDigest: "password"}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [...user]});
            const result = User.create(user)
            expect(result).toHaveProperty('email')
        })
    });

    describe('findByEmail', () => {
        test('resolves with users of specific email upon successful db query'), async () => {
            let user = {email: "email@email.co.uk", name: "User1", passwordDigest: "password"}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [...user]});
            const result = await User.findByEmail("email@email.co.uk")
            expect(result.email).toEqual(user.email)
        }
    });
});