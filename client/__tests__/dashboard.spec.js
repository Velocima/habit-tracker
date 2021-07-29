const dashboardHandlers = require('../assets/js/lib/event_handlers/dashboard.js');


describe('Adding Habits', () => {

    beforeAll(() => {
        document.documentElement.innerHTML = '<body><main><section class="habits-container"></main>'
        let body = document.querySelector('.habits-container')
        dashboardHandlers = require('../assets/js/lib/event_handlers/dashboard.js');
    })

    test('clicking view habit retrieves all info', () => {
    
    })

    test('closeModal has ability to close modal', () => {
        expect(dashboardHandlers.closeModal().classList).toContain('hidden');
    })

    describe('"add Habit" button actions', () => {

        test('clicking the habit button from a different page takes you to the dashboard page', () => {
            
        })

        test('clicking the add habit button in the nav hides the nav', () =>  {

        })

        test('clicking add habit button in the welcome dashboard reveals the modal', () => {

        })

        test('on sumbitting a new habit modal closes', () => {
            
        })

        test('submitting a new habit adds it to the users list of habits', () => {

        })

    })
    
    describe('Frequency change', () => {
        test('setting habit frequency', () => {

        })
    })

    describe('Habit description', () => {
        test('Users form input changes habit description', () => {

        })
    })


})

