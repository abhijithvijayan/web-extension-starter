import Trader from "../trader";

export default class OwnsBadge {
    static create(trader: Trader): HTMLSpanElement {
        let badge = document.createElement("a");
        badge.classList.add("et-badge");

        if (trader.ownsList !== null) {
            badge.href = trader.ownsList;
        }

        let recordings = trader.wantsCount === 1 ? "recording" : "recordings";

        badge.innerHTML = `Owns <strong style="font-weight: semibold; color: #0f172a;">${trader.ownsCount} ${recordings}</strong> that I want`;

        return badge;
    }
}
