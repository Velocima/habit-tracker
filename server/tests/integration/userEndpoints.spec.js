
describe('users endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async () => {
        api = app.listen(3000, () => console.log('Test server running on port 3000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should retrieve a user by email', async () => {
        const res = await request(api).get('/user/:email')
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual('User1')
    });

    it('should create a new user', async () => {        
        const res = await request(api)
            .post('/users')
            .send({
                name: "User 1",
                email: "user1@email.co.uk"
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id"); //?
    });
})