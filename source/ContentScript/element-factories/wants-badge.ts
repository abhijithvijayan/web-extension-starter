import Trader from "../trader";

export default class WantsBadge {
    static create(trader: Trader): HTMLSpanElement {
        let badge = document.createElement("a");
        badge.classList.add("et-badge");

        if (trader.wantsList !== null) {
            badge.href = trader.wantsList;
        }

        let recordings = trader.wantsCount === 1 ? "recording" : "recordings";

        badge.innerHTML = `Wants <strong style="font-weight: semibold; color: #0f172a;">${trader.wantsCount} ${recordings}</strong> that I own`;

        return badge;
    }
}
