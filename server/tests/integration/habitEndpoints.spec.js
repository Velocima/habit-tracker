
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

    it('should retrieve list of habits in user database', async () => {
        const res = await request(api).get('/:email/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    }); 

    it('should create a new habit', async () => {
        const res = await request(api)
            .post('/')
            .send({
                habitName: 'Test habit',
                description: 'test habit description',
                frequency: 'daily',
                frequencyTarget: '',
                streak: 'test 3 days'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("email"); //?
    });

    // it('should update a habit', async () => {
    //     const res= await request(api)
            
    // });

    // it('should delete a habit', async () => {
    //     const res = await request(api)
    //         .delete('/:email/habit/1')
    //     expect(res.statusCode).toEqual(204);

    //     const habitRes = await request(api).get('/:email/habit/1');
    //     expect(habitRes.statusCode).toEqual(404);
    //     expect(habitRes.body).toHaveProperty('err');
    // }); 
})