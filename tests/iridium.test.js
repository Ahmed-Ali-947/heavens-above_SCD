const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const utils = require('../src/utils');
const { getTable } = require('../src/iridium');

// Mock all external dependencies
jest.mock('fs');
jest.mock('request');
jest.mock('../src/utils');

describe('getTable()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('TC1 - creates IridiumFlares directory when not existing', () => {
        fs.existsSync.mockReturnValue(false);
        fs.mkdir.mockImplementation((path, cb) => cb(null));
        utils.get_options.mockReturnValue({ url: 'fake-url' });
        request.mockImplementation((options, cb) => cb(null, { statusCode: 200 }, '<html></html>'));

        getTable({ root: './', counter: 0, pages: 0 });

        expect(fs.existsSync).toHaveBeenCalledWith('./IridiumFlares/');
        expect(fs.mkdir).toHaveBeenCalled();
    });

    test('TC2 - calls utils.get_options when counter = 0', () => {
        utils.get_options.mockReturnValue({ url: 'test-url' });
        request.mockImplementation((options, cb) => cb(null, { statusCode: 200 }, '<html></html>'));

        getTable({ root: './', counter: 0, pages: 0 });
        expect(utils.get_options).toHaveBeenCalledWith('IridiumFlares.aspx?');
    });

    test('TC3 - calls utils.post_options when counter > 0', () => {
        utils.post_options.mockReturnValue({ url: 'test-post-url' });
        request.mockImplementation((options, cb) => cb(null, { statusCode: 200 }, '<html></html>'));

        getTable({ root: './', counter: 1, pages: 0, opt: 'mock' });
        expect(utils.post_options).toHaveBeenCalledWith('IridiumFlares.aspx?', 'mock');
    });

    test('TC4 - handles valid table HTML and extracts data', async () => {
        fs.existsSync.mockReturnValue(true);
        fs.appendFile.mockImplementation((_, __, cb) => cb(null));
        utils.get_options.mockReturnValue({ url: 'fake-url' });

        const html = `
      <form>
        <table class="standardTable">
          <tbody>
            <tr>
              <td><a href="fake-link">link</a></td>
              <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>
            </tr>
          </tbody>
        </table>
        <input name="ctl00$cph1$visible" value="radioVisible"/>
      </form>
    `;

        request.mockImplementationOnce((options, cb) => cb(null, { statusCode: 200 }, html));

        // Mock the second request inside factory()
        request.mockImplementationOnce((options, cb) =>
            cb(null, { statusCode: 200 }, '<form><table class="standardTable"><tbody><tr><td>ok</td></tr></tbody></table></form>')
        );

        utils.iridium_options.mockReturnValue({ url: 'fake-inner' });
        utils.image_options.mockReturnValue({ url: 'fake-image' });
        utils.md5.mockReturnValue('fake-id');

        getTable({ root: './', counter: 0, pages: 0 });

        expect(fs.appendFile).toHaveBeenCalled();
        expect(utils.md5).toHaveBeenCalled();
    });

    test('TC5 - skips processing when statusCode != 200', () => {
        request.mockImplementation((options, cb) => cb(null, { statusCode: 500 }, ''));
        getTable({ root: './', counter: 0, pages: 0 });
        expect(fs.appendFile).not.toHaveBeenCalled();
    });
});
