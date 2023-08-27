import { browser } from "webextension-polyfill-ts";
import Trader from "./trader";

export default class TraderRepository {
    page: Document;
    traders: Trader[];

    constructor(traders: Trader[] = []) {
        this.traders = traders;
    }

    static async load(): Promise<TraderRepository> {
        if (!(await this.hasTradersInStorage())) {
            await this.refreshGlobalTradersStorage();
        }

        let traders = await this.loadTradersFromStorage();

        return new TraderRepository(traders!);
    }

    /**
     * Fetches the traders who want my items from the Encora website.
     */
    static async fetchTradersWhoWantMyItems(): Promise<Trader[]> {
        const response = await fetch(
            "https://encora.it/profile/trade_finder_theirs.php"
        );
        let text = await response.text();
        let page = new DOMParser().parseFromString(text, "text/html");

        let tbody = page.querySelector("table tbody")!;
        let rows = tbody.querySelectorAll("tr");

        return Array.from(rows)
            .map((row) => Trader.fromWantsRow(row as HTMLTableRowElement))
            .filter((trader) => trader !== null) as Trader[];
    }

    /**
     * Fetches the traders who own my wants from the Encora website.
     */
    static async fetchTradersWhoOwnMyWants(): Promise<Trader[]> {
        const response = await fetch(
            "https://encora.it/profile/trade_finder.php"
        );
        let text = await response.text();
        let page = new DOMParser().parseFromString(text, "text/html");

        let tbody = page.querySelector("table tbody")!;
        let rows = tbody.querySelectorAll("tr");

        return Array.from(rows)
            .map((row) => Trader.fromOwnsRow(row as HTMLTableRowElement))
            .filter((trader) => trader !== null) as Trader[];
    }

    /**
     * Fetches the traders who want my items and the traders who own my wants
     * from the Encora website and stores them in the global storage.
     */
    static async refreshGlobalTradersStorage() {
        let [wantsTraders, ownsTraders] = await Promise.all([
            this.fetchTradersWhoWantMyItems(),
            this.fetchTradersWhoOwnMyWants(),
        ]);

        let traders = Trader.mergeLists(wantsTraders, ownsTraders).map(
            (trader) => trader.toJSON()
        );

        browser.storage.local.set({ traders: traders });
    }

    /**
     * Checks if the global storage has traders.
     */
    static async hasTradersInStorage(): Promise<boolean> {
        let storage = await browser.storage.local.get("traders");

        return storage.traders != null;
    }

    /**
     * Loads the traders from the global storage.
     */
    static async loadTradersFromStorage(): Promise<Trader[]> {
        let storage = await browser.storage.local.get("traders");
        let traders = storage.traders;

        if (traders == null) {
            return [];
        }

        return traders.map((trader: any) => Trader.fromJSON(trader));
    }

    find(username: string): Trader | null {
        return (
            this.traders.find((trader) => trader.username === username) ?? null
        );
    }

    static loadFromWhoOwnsPage(page: Document): TraderRepository {
        let traders = Array.from(
            page.querySelectorAll('a[href*="/profile/view-profile.php?id="]')
        )
            .map((profileLink) =>
                Trader.fromProfileLink(profileLink as HTMLAnchorElement)
            )
            .filter((trader) => trader !== null);

        return new TraderRepository(traders);
    }

    add(trader: Trader) {
        this.traders.push(trader);
    }

    getAll(): Trader[] {
        return this.traders;
    }

    getOpen(): Trader[] {
        return this.traders.filter((trader) => trader.open);
    }
}
