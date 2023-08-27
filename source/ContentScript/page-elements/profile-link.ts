import OwnsBadge from "../element-factories/owns-badge";
import Star from "../element-factories/star";
import WantsBadge from "../element-factories/wants-badge";
import Trader from "../trader";
import TraderRepository from "../trader-repository";

export default class ProfileLink {
    constructor(
        public element: HTMLAnchorElement,
        public traderRepository: TraderRepository
    ) {}

    get username(): string {
        return this.element.innerText.trim();
    }

    get profile(): string {
        return this.element.href;
    }

    get trader(): Trader | null {
        return this.traderRepository.find(this.username);
    }

    get lastElement(): Element {
        return this.element.nextElementSibling?.tagName === "SPAN"
            ? this.element.nextElementSibling!
            : this.element;
    }

    addOwnsBadge() {
        let trader = this.trader;

        if (trader === null) {
            throw new Error(
                "Cannot add owns badge to a profile link that has no trader data"
            );
        }

        let badge = OwnsBadge.create(this.trader!);

        this.lastElement.insertAdjacentElement("afterend", badge);
    }

    addWantsBadge() {
        let trader = this.trader;

        if (trader === null) {
            throw new Error(
                "Cannot add wants badge to a profile link that has no trader data"
            );
        }

        let badge = WantsBadge.create(this.trader!);

        this.lastElement.insertAdjacentElement("afterend", badge);
    }

    addStar() {
        let star = Star.create();

        this.element.style.position = "relative";
        this.element.style.fontWeight = "bold";

        this.element.appendChild(star);
    }

    static getAll(page: Document, traderRepository: TraderRepository) {
        return Array.from(
            page.querySelectorAll('a[href*="/profile/view-profile.php?id="]')
        ).map(
            (profileLink) =>
                new ProfileLink(
                    profileLink as HTMLAnchorElement,
                    traderRepository
                )
        );
    }
}
