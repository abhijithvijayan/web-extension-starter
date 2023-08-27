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
        a.innerHTML = `${count} <i class="fad fa-arrow-up-right-from-square"></i>`;

        td.appendChild(a);

        return td;
    }
}
