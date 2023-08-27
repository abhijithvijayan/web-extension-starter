import OwnsColumn from "../element-factories/owns-column";
import WantsColumn from "../element-factories/wants-column";
import Trader from "../trader";
import TraderRepository from "../trader-repository";

export default class TradeFinderRow {
    constructor(
        public row: HTMLTableRowElement,
        public cells: NodeListOf<HTMLTableCellElement>,
        public repository: TraderRepository | null
    ) {}

    static parse(
        row: HTMLTableRowElement,
        repository: TraderRepository | null = null
    ): TradeFinderRow | null {
        let cells = row.querySelectorAll("td");

        if (cells.length < 2) {
            return null;
        }

        return new TradeFinderRow(row, cells, repository);
    }

    get username(): string {
        return this.cells[0]
            .querySelector("a")!
            .querySelector("strong")!
            .innerText.trim();
    }

    get profile(): string {
        return this.cells[0].querySelector("a")!.href;
    }

    get open(): boolean {
        return this.cells[0]
            .querySelector("span")!
            .innerText.includes("Open to trades");
    }

    get count(): number {
        let link = this.cells[1].querySelector("a");

        return link ? parseInt(link.innerText.match(/\d+/)![0]) : 0;
    }

    get list(): string | null {
        let link = this.cells[1].querySelector("a");

        return link ? link.href : null;
    }

    get trader(): Trader | null {
        if (this.repository === null) {
            throw new Error(
                "Cannot get trader from TradeFinderRow without a repository"
            );
        }

        return this.repository.find(this.username);
    }

    addWantsColumn() {
        if (this.trader === null) {
            throw new Error(
                "Cannot add wants column to a TradeFinderRow that has no trader data"
            );
        }

        let td = WantsColumn.create(this.trader!);

        this.row.appendChild(td);
    }

    addOwnsColumn() {
        if (this.trader === null) {
            throw new Error(
                "Cannot add owns column to a TradeFinderRow that has no trader data"
            );
        }

        let td = OwnsColumn.create(this.trader!);

        this.row.appendChild(td);
    }

    hide() {
        this.row.style.display = "none";
    }

    show() {
        this.row.style.display = "";
    }
}
