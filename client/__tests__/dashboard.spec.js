const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../dashboard.html'), 'utf8');
const utils = require('../assets/js/lib/utils');
const handlers = require('../assets/js/lib/event_handlers/dashboard');


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
        document.documentElement.innerHTML = `<body><nav><ul><li></li>li></li>li></li>li></li></ul></nav><main><section></section></main><section><div><i></i><h1></h1><form></form><p></p></div></section></body>`;
    });

    test('it has a header title', () => {
        let header = document.querySelector('h1');
        expect(header.textContent).toContain('Welcome');
    })

    test('it has at least one button', () => {
        expect(document.querySelector('button')).toHaveLength(1);
    })

    test('add-a-habit button has name "ADD A HABIT"', () => {
        expect(document.querySelectorAll('button')[0]).textContent.toContain('ADD A HABIT');
    })

    test('initially nav is hidden', () => {
        expect(document.querySelector('nav').className.toBe('hide-nav'))
    })

    test('all nav items to have content', () => {
        let nav = document.querySelector('nav');
        let navItems = nav.querySelectorAll(li);
        expect(navItems.forEach(item => item.innerHTML.toBeTruthy()));
    })

    test('first two nav items contain anchor tags', () => {
        let nav = document.querySelector('nav');
        let navItems = [nav.querySelectorAll(li)[0], nav.querySelectorAll(li)[1]];
        expect(navItems.forEach(item => item.toContain(<a></a>)));
    })

    test('nav anchor tags link to .html files', () => {
        let nav = document.querySelector('nav');
        let aTags = nav.querySelectorAll('a');
        expect(aTags.forEach(link => 
            {
                let result = /.html$/i.test(link)
                expect(result).toBeTruthy();
            })
        )
    })

    // Add-a-habit modal with form
    test('add-a-habit modal is displayed', () => {
        handlers.onAddHabitButtonClick(e);
        expect(document.querySelector('.habit-modal').classList.not.toContain('hidden'));
    })

    test('add-a-habit form is rendered', () => {
        handlers.onAddHabitButtonClick(e);
        expect(document.querySelector('form').toBeTruthy())
    })

    test('add-a-habit form has 7 child components', () => {
        handlers.onAddHabitButtonClick(e);
        expect(document.querySelector('form').childElementCount.toEqual(7))
    })

    test('add-a-habit form has 3 labels', () => {
        handlers.onAddHabitButtonClick(e);
        expect(document.querySelectorAll('label')).toHaveLength(3);
    })

})