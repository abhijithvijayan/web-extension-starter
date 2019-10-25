import browser from 'webextension-polyfill';

document.addEventListener('DOMContentLoaded', async () => {
    const tabs = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });

    const url = tabs.length && tabs[0].url;

    const response = await browser.runtime.sendMessage({
        msg: 'hello',
        url,
    });

    // eslint-disable-next-line no-console
    console.log(response);
});
