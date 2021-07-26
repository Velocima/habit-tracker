

describe('habit endpoints', () => {
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

    it('should create a new habit', async () => {
        const res = await request(api)
        .post('/')
        .send({
            habit: 'Test habit',
            frequency: 'daily',
            streak: '3 days'
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("id");
    });

    it('should retrieve a list of habits', async () => {

    }); 

    it('should retrieve a habit', async () => {
    });


    it('should update a habit', async () => {

    });

    it('should delete a habit', async () => {

    }); 
})