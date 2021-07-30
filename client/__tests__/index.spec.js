const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const handlers = require('../assets/js/lib/event_handlers/index.js');
const indexJS = require('../assets/js/index');


describe('head testing', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('the title has been changed from the default', () => {
        
        let title = document.querySelector('title')
        expect(title.textContent).not.toEqual('Document');
    });

    test('css link is not # (default)', () => {
        let css = document.querySelector('link[rel="stylesheet"]');
        expect(css.getAttribute("href")).not.toEqual('#') 
    });

    test('css links to a file with .css as its extension', () => {
        let css = document.querySelectorAll('link[rel="stylesheet"]');
        css.forEach(
            file => {
            let link = file.getAttribute("href");
            let result = /.css$/i.test(link)
            expect(result).toBeTruthy()
            }
        )
    });

    test('the page has a favicon element', () => {
        let iconLink = document.querySelector('link[rel="icon"]');
        expect(iconLink).toBeTruthy()
    });

    test('the favicon is in the correct .ico format', () => {
        let linkElm = document.querySelector('link[rel="icon"]');
        let link = linkElm.getAttribute("href");
        let result = /.ico$/i.test(link)
        expect(result).toBeTruthy()
    });

    test('script tag is present', () => {
        let javascriptLink = document.querySelector('script');
        expect(javascriptLink).toBeTruthy()
    });

    test('script has a src attribute', () => {
        let jsLink = document.querySelector('script');
        let src = jsLink.getAttribute("src");
        expect(src).toBeTruthy();
    });

    test('script link is a bundle.js', () => {
        let jsLink = document.querySelector('script');
        let src = jsLink.getAttribute("src");
        expect(src).toBe("assets/js/bundle.js");
    });

})

describe("body testing", () => {
    beforeAll(() => {
        document.documentElement.innerHTML = `<body><form></form></body>`;
    });

    test('it has a header title', () => {
        let header = document.querySelector('h1');
        expect(header.textContent).toContain('Habitude');
    })

    test('front page has a description paragraph', () => {
        let description = document.querySelector('p');
        expect(description.textContent).toContain('The simple way to build habits that last.');
    })

    test('login button is present as 3rd input type"', () => {
        expect(document.querySelectorAll('input')[2]).toBeTruthy;
    })

    test('two buttons are present', () => {
        expect(document.querySelectorAll('button')).toBeTruthy();
    })


    // Login form
    test('login form is rendered', () => {
        handlers.onLoginButtonClick();
        expect(document.querySelector('form').toBeTruthy())
    })

    test('login form has 6 child components', () => {
        handlers.onLoginButtonClick();
        expect(document.querySelector('form').childElementCount.toEqual(6))
    })

    test('login input fields have labels', () => {
        handlers.onLoginButtonClick();
        expect(document.querySelectorAll('label')).toHaveLength(2);
    })

    test('old login button is hidden when the form is rendered', () => {
        handlers.onLoginButtonClick();
        expect (document.querySelectorAll('button')[0].classList.toContain('hidden'));
    })

    test('slogan paragraph is removed when form is rendered', () => {
        handlers.onLoginButtonClick();
        expect(document.querySelectorAll('p').toHaveLength(1));
    })

    test(`form has a paragraph "Don't have an account?"`, () => {
        handlers.onLoginButtonClick();
        expect(document.querySelectorAll('p').textContent.toContain("Don't have an account?"));
    })


    // Registration form
    test('registration form is rendered', () => {
        handlers.onRegistrationButtonClick();
        expect(document.querySelector('form').toBeTruthy())
    })

    test('registration form has 8 child components', () => {
        handlers.onRegistrationButtonClick();
        expect(document.querySelector('form').childElementCount.toEqual(8))
    })

    test('all registration input fields have labels', () => {
        handlers.onRegistrationButtonClick();
        expect(document.querySelectorAll('label')).toHaveLength(3);
    })

    test('old register button is hidden when the registration form is rendered', () => {
        handlers.onRegistrationButtonClick();
        expect (document.querySelectorAll('button')[1].className.toBe('register hidden'));
    })

    test('login button is visible when the registration form is rendered', () => {
        handlers.onRegistrationButtonClick();
        expect (document.querySelectorAll('button')[0].className.toBe('login'));
    })

    test('slogan paragraph is removed when form is rendered', () => {
        handlers.onRegistrationButtonClick();
        expect(document.querySelectorAll('p').toHaveLength(1));
    })

    test('login form is removed when registration form is rendered', () => {
        handlers.onRegistrationButtonClick();
        expect(document.querySelectorAll('form').toHaveLength(0));
    })

    test(`form has a paragraph "Already have an account?"`, () => {
        handlers.onLoginButtonClick();
        expect(document.querySelectorAll('p').textContent.toContain("Already have an account?"));
    })

})