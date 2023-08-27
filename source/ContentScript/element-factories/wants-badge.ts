import Trader from "../trader";

export default class WantsBadge {
    static create(trader: Trader): HTMLSpanElement {
        let badge = document.createElement("a");
        badge.classList.add("et-badge");

        if (trader.wantsList !== null) {
            badge.href = trader.wantsList;
        }

        let recordings = trader.wantsCount === 1 ? "recording" : "recordings";

        let span1 = document.createElement("span");
        span1.innerText = "Wants ";

        let strong = document.createElement("strong");
        strong.style.fontWeight = "semibold";
        strong.style.color = "#0f172a";
        strong.innerText = `${trader.wantsCount} ${recordings}`;

        let span2 = document.createElement("span");
        span2.innerText = " that I own";

        badge.appendChild(span1);
        badge.appendChild(strong);
        badge.appendChild(span2);

        return badge;
    }
}
