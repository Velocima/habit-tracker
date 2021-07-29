const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('it has a header title', () => {
        let header = document.querySelector('h1');
        expect(header.textContent).toContain('Habitude');
    })
})