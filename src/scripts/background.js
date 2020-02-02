import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line no-console
    console.log('onInstalled....');
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Do something with the message!
    // alert(request.url);

    // And respond back to the sender.
    return Promise.resolve('got your message, thanks!');
});
