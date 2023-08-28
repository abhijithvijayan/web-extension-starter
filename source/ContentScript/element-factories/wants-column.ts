import Trader from "../trader";

export default class WantsColumn {
    static create(trader: Trader): HTMLTableCellElement {
        let count = trader.wantsCount ?? 0;

        let td = document.createElement("td");
        td.style.textAlign = "center";

        if (count === 0) {
            td.innerText = "0";
            td.style.color = "#cbd5e1";

            return td;
        }

        let a = document.createElement("a");
        a.target = "_blank";
        a.href = trader.wantsList ?? "#";

        let span = document.createElement("span");
        span.innerText = count.toString() + " ";

        let i = document.createElement("i");
        i.classList.add("fad", "fa-arrow-up-right-from-square");

        a.appendChild(span);
        a.appendChild(i);

        td.appendChild(a);

        return td;
    }
}
