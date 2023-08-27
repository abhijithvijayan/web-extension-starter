import TradeFinderRow from "../page-elements/trade-finder-row";
import TraderRepository from "../trader-repository";

export default class TradeFinderTheirsEnhancer {
    static addHeader(page: Document) {
        let th = document.createElement("th");
        th.innerText = "# of my wants that they own";
        th.style.textAlign = "center";
        th.scope = "col";

        page.querySelector("table thead tr")?.appendChild(th);
    }

    static async enhance(page: Document) {
        let repository = await TraderRepository.load();

        this.addHeader(page);

        let tbody = page.querySelector("table tbody")!;
        let rows = tbody.querySelectorAll("tr");

        Array.from(rows)
            .map((row) =>
                TradeFinderRow.parse(row as HTMLTableRowElement, repository)
            )
            .filter((row) => row !== null)
            .filter((row) => row!.trader !== null)
            .forEach((row) => row!.addOwnsColumn());
    }
}
