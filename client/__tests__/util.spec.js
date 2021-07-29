const fs = require('fs');
const path = require('path');
const utils = require('../assets/js/lib/utils')

let inputs;

describe('functions for inputting data into forms', () => {
    let body;

    beforeAll(() => {
        document.documentElement.innerHTML = '<body><main><section class="habits-container"></main>'
        body = document.querySelector('.habits-container')
        inputs = require('../assets/js/lib/utils');
    })

    describe('input data to form', () => {
        test('adds a new habit to the DOM', () => {

        })

        test('adds name to dashboard', () =>  {

        })

        test('adds name to profile input', () => {

        })

})
})


    describe('Toggling the nav bar', () => {
        test('opens nav bar when menu button is clicked', () => {
            document.documentElement.innerHTML = '<body><nav class="hide-nav"></nav>';
            const nav = document.querySelector('nav')
            utils.toggleNav();
            expect(nav.classList).toBe('hide-nav')
        })
        })