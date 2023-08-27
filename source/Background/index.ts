import { browser } from "webextension-polyfill-ts";
import TraderRepository from "../ContentScript/trader-repository";

browser.runtime.onInstalled.addListener((): void => {
    TraderRepository.refreshGlobalTradersStorage();
});
