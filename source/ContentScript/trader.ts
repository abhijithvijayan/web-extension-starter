import TradeFinderRow from "./page-elements/trade-finder-row";

export default class Trader {
    constructor(
        public username: string,
        public profile: string,
        public open: boolean | null,
        public ownsCount: number | null = null,
        public ownsList: string | null = null,
        public wantsCount: number | null = null,
        public wantsList: string | null = null
    ) {}

    /**
     * Create a Trader from a row in a "Trade finder wants" table.
     */
    static fromWantsRow(row: HTMLTableRowElement): Trader | null {
        let data = TradeFinderRow.parse(row);

        if (data === null) {
            return null;
        }

        return new Trader(
            data.username,
            data.profile,
            data.open,
            null,
            null,
            data.count,
            data.list
        );
    }

    /**
     * Create a Trader from a row in a "Trade finder owns" table.
     */
    static fromOwnsRow(row: HTMLTableRowElement): Trader | null {
        let data = TradeFinderRow.parse(row);

        if (data === null) {
            return null;
        }

        return new Trader(
            data.username,
            data.profile,
            data.open,
            data.count,
            data.list,
            null,
            null
        );
    }

    /**
     * Create a Trader from a profile link.
     */
    static fromProfileLink(profileLink: HTMLAnchorElement) {
        let username = profileLink.innerText.trim();
        let profile = profileLink.href;

        let open = null;

        if (profileLink.nextElementSibling?.nodeName === "SPAN") {
            open = (<HTMLSpanElement>(
                profileLink.nextElementSibling
            )).innerText.includes("Open to trades");
        }

        return new Trader(username, profile, open, null, null);
    }

    /**
     * Merge two traders together.
     */
    merge(trader: Trader): Trader {
        return new Trader(
            this.username,
            this.profile,
            this.open ?? trader.open,
            this.ownsCount ?? trader.ownsCount,
            this.ownsList ?? trader.ownsList,
            this.wantsCount ?? trader.wantsCount,
            this.wantsList ?? trader.wantsList
        );
    }

    /**
     * Merge two lists of traders together.
     */
    static mergeLists(list1: Trader[], list2: Trader[]): Trader[] {
        let merged = list1.map((trader) => {
            let trader2 = list2.find((t) => t.username === trader.username);

            if (trader2 === undefined) {
                return trader;
            }

            return trader.merge(trader2);
        });

        merged.push(
            ...list2.filter(
                (trader) => !merged.some((t) => t.username === trader.username)
            )
        );

        return merged;
    }

    /**
     * Convert a Trader to a JSON object.
     */
    toJSON() {
        return {
            username: this.username,
            profile: this.profile,
            open: this.open,
            ownsCount: this.ownsCount,
            ownsList: this.ownsList,
            wantsCount: this.wantsCount,
            wantsList: this.wantsList,
        };
    }

    /**
     * Convert a JSON object to a Trader.
     */
    static fromJSON(json: any) {
        return new Trader(
            json.username,
            json.profile,
            json.open,
            json.ownsCount,
            json.ownsList,
            json.wantsCount,
            json.wantsList
        );
    }
}
