
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

    it('should retrieve all of a users habits', async () => {
        const res = await request(api).get('/habits/:email');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    }); 

    it('should retrieve one habit', async () => {
        const res = await request(api).get('/habits/:id');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    }); 


    it('should create a new habit', async () => {
        const res = await request(api)
            .post('/habits')
            .send({
                habitName: 'Test habit',
                description: 'test habit description',
                frequency: 'daily',
                frequencyTarget: '',
                streak: 'test 3 days'
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty("id"); //is id correct here?
    });

    it('should update a streak on a particular habit', async () => {
        const updatedStreak = streak + 1
        const res= await request(api)
        .patch('/habits/:id') 
        .send({
            streak: updatedStreak
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("id");
           
    });

    it('should delete a habit', async () => {
        const res = await request(api)
        .delete('/habits/1')
        expect(res.statusCode).toEqual(204);

        const habitRes = await request(api).get('habits/1');
        expect(habitRes.statusCode).toEqual(404);
        expect(habitRes.body).toHaveProperty('err');
    }); 
})