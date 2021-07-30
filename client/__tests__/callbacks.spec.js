const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const handlers = require('../assets/js/lib/event_handlers/index.js')
const indexJS = require('../assets/js/index');
const { hasUncaughtExceptionCaptureCallback } = require('process');


describe('Test buttons', () => {

    beforeAll(() => {
        document.documentElement.innerHTML = `<body><form></form></body>`;
    });

	test('Test login form submit event', () => {
        const mockCallBack = jest.fn();
        const form = document.querySelectorAll('form');
        let mockCallBackFunction = jest.fn();
        handlers.onLoginButtonClick(mockCallBackFunction);
        expect(mockCallBackFunction.mock.calls.length).toBe (1);
    })
});