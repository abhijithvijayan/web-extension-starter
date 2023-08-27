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

    get open(): boolean {
        if (this.element.nextElementSibling?.tagName !== "SPAN") {
            return false;
        }

        return (<HTMLSpanElement>(
            this.element.nextElementSibling
        )).innerText.includes("Open to trades");
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

    hide() {
        this.element.style.display = "none";

        // If the next element is text, hide it too.
        if (this.element.nextElementSibling?.nodeType === Node.TEXT_NODE) {
            (<HTMLSpanElement>this.element.nextElementSibling).style.display =
                "none";
        }

        let nextElement = this.element.nextElementSibling;

        if (nextElement?.tagName === "SPAN") {
            (<HTMLSpanElement>nextElement).style.display = "none";
            nextElement = nextElement.nextElementSibling;
        }

        if (nextElement?.tagName === "A") {
            (<HTMLAnchorElement>nextElement).style.display = "none";
            nextElement = nextElement.nextElementSibling;
        }

        if (nextElement?.tagName === "BR") {
            (<HTMLSpanElement>nextElement).style.display = "none";
        }
    }

    show() {
        this.element.style.display = "";
        let nextElement = this.element.nextElementSibling;

        if (nextElement?.tagName === "SPAN") {
            (<HTMLSpanElement>nextElement).style.display = "";
            nextElement = nextElement.nextElementSibling;
        }

        if (nextElement?.tagName === "A") {
            (<HTMLAnchorElement>nextElement).style.display = "";
            nextElement = nextElement.nextElementSibling;
        }

        if (nextElement?.tagName === "BR") {
            (<HTMLSpanElement>nextElement).style.display = "";
        }
    }
}
