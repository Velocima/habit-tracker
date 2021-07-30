const { request } = require("../../server");

describe('auth endpoints', () => {
    let api;
    let token;
    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(async () => {
        api = app.listen(3000, () => console.log('Test server running on port 3000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    });

    it('registers a new user', async () => {
        const res = await register(api).post('/auth/register')
            .send({email: "user4@email.co.uk", name: "User4", password: "wbnbnF0OEX2X"})
        expect(res.statusCode).toEqual(201);
    });


    it('logs in a new user', async () => {
        const res = await request(api).post('/auth/login')
            .send({email: "user1@email.co.uk", name: "User1", password: "1U03lKdhJzMd"})
        let token = res.body.token
        const resa = await request(api).get("/users/user1@email.co.uk")
            .set('authorization', `Bearer ${token}`);
        expect(resa.statusCode).toEqual(200)
    });

    it('fails to log in if email is incorrect', async () => {
        const res = await request(api).post('/auth/login')
            .send({email: "user1@wrongemail.co.uk", name: "User1", password: "1U03lKdhJzMd"})
        expect(res.statusCode).toEqual(401);
    });

    it('fails to log in if password is incorrect', async () => {
        const res = await request(api).post('/auth/login')
            .send({email: "user1@email.co.uk", name: "User1", password: "wrongpassword"})
        expect(res.statusCode).toEqual(401);
    });

})