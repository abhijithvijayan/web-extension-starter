import Toggle from "../element-factories/toggle";
import TradeFinderRow from "../page-elements/trade-finder-row";
import Settings from "../settings";
import TraderRepository from "../trader-repository";

export default class TradeFinderTheirsEnhancer {
    static addHeader(page: Document) {
        let th = document.createElement("th");
        th.innerText = "# of my wants that they own";
        th.style.textAlign = "center";
        th.scope = "col";

        page.querySelector("table thead tr")?.appendChild(th);
    }

    static async addVisibilityToggle(page: Document, rows: TradeFinderRow[]) {
        let h2 = page.querySelector("h2")!;

        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";

        let toggle = Toggle.create();

        h2.parentNode!.insertBefore(div, h2);
        div.appendChild(h2);
        div.appendChild(toggle.element);

        toggle.onToggle((on: boolean) => {
            on === true
                ? this.hideNonOpenRows(rows)
                : this.showNonOpenRows(rows);
        });

        if ((await Settings.get("hideNonOpenRows")) === true) {
            toggle.switchOn();
            this.hideNonOpenRows(rows);
        }
    }

    static async enhance(page: Document) {
        let repository = await TraderRepository.load();

        this.addHeader(page);

        let tbody = page.querySelector("table tbody")!;

        let rows = Array.from(tbody.querySelectorAll("tr"))
            .map((row) =>
                TradeFinderRow.parse(row as HTMLTableRowElement, repository)
            )
            .filter((row) => row !== null)
            .filter((row) => row!.trader !== null) as TradeFinderRow[];

        rows.forEach((row) => row!.addWantsColumn());

        this.addVisibilityToggle(page, rows);
    }

    static hideNonOpenRows(rows: TradeFinderRow[] = []) {
        Settings.set("hideNonOpenRows", true);

        rows.filter((row) => row!.trader!.open === false).forEach((row) =>
            row!.hide()
        );
    }

    static showNonOpenRows(rows: TradeFinderRow[] = []) {
        Settings.set("hideNonOpenRows", false);

        rows.forEach((row) => row!.show());
    }
}
