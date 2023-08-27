import Trader from "../trader";

export default class OwnsBadge {
    static create(trader: Trader): HTMLSpanElement {
        let badge = document.createElement("a");
        badge.classList.add("et-badge");

        if (trader.ownsList !== null) {
            badge.href = trader.ownsList;
        }

        let recordings = trader.wantsCount === 1 ? "recording" : "recordings";

        let span1 = document.createElement("span");
        span1.innerText = "Owns ";

        let strong = document.createElement("strong");
        strong.style.fontWeight = "semibold";
        strong.style.color = "#0f172a";
        strong.innerText = `${trader.ownsCount} ${recordings}`;

        let span2 = document.createElement("span");
        span2.innerText = " that I want";

        badge.appendChild(span1);
        badge.appendChild(strong);
        badge.appendChild(span2);

        return badge;
    }
}
