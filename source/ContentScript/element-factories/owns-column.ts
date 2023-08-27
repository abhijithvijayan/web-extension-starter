import Trader from "../trader";

export default class OwnsColumn {
    static create(trader: Trader): HTMLTableCellElement {
        let count = trader.ownsCount ?? 0;

        let td = document.createElement("td");
        td.style.textAlign = "center";

        if (count === 0) {
            td.innerText = "0";
            td.style.color = "#cbd5e1";

            return td;
        }

        let a = document.createElement("a");
        a.target = "_blank";
        a.href = trader.ownsList ?? "#";

        let span = document.createElement("span");
        span.innerText = count.toString() + " ";

        let i = document.createElement("i");
        i.classList.add("fad", "fa-arrow-down-left-from-square");

        a.appendChild(span);
        a.appendChild(i);

        td.appendChild(a);

        return td;
    }
}
