const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


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
        document.documentElement.innerHTML = `<body><nav></nav><div></div><main><h1></h1><section><section></main><section><section></body>`;
    });

    test('it has a header title', () => {
        let header = document.querySelector('h1');
        expect(header.textContent).toContain('Habitude');
    })

})