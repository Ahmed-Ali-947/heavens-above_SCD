// This polyfills File and Blob so cheerio (via undici) stops crashing in Jest.
if (typeof global.File === "undefined") {
    global.File = class File { };
}
if (typeof global.Blob === "undefined") {
    global.Blob = class Blob { };
}
