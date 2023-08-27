import Toggle from "../element-factories/toggle";
import ProfileLink from "../page-elements/profile-link";
import Settings from "../settings";
import TraderRepository from "../trader-repository";

export default class WhoOwnsEnhancer {
    static async addVisibilityToggle(page: Document, links: ProfileLink[]) {
        let bs = page.querySelectorAll("b");

        let b = Array.from(bs).find((b) => b.innerText.trim() === "OWNERS:")!;

        let toggle = Toggle.create();
        toggle.element.style.marginBottom = "1.5em";

        b.parentNode!.insertBefore(toggle.element, b);

        toggle.onToggle((on: boolean) => {
            on === true
                ? this.hideNonOpenLinks(links)
                : this.showNonOpenLinks(links);
        });

        if ((await Settings.get("hideNonOpenRows")) === true) {
            toggle.switchOn();
            this.hideNonOpenLinks(links);
        }
    }

    static async enhance(page: Document) {
        let repository = await TraderRepository.load();

        let links = ProfileLink.getAll(page, repository);

        links
            .filter((profileLink) => profileLink.trader !== null)
            .filter((profileLink) => profileLink.trader!.wantsCount !== null)
            .filter((profileLink) => profileLink.trader!.wantsCount! > 0)
            .map((profileLink) => {
                profileLink.addWantsBadge();

                return profileLink;
            })
            .filter((profileLink) => profileLink.trader!.open)
            .forEach((profileLink) => {
                profileLink.addStar();
            });

        this.addVisibilityToggle(page, links);
    }

    static hideNonOpenLinks(links: ProfileLink[] = []) {
        Settings.set("hideNonOpenRows", true);

        links
            .filter((link) => link!.trader!.open === false)
            .forEach((link) => link!.hide());
    }

    static showNonOpenLinks(links: ProfileLink[] = []) {
        Settings.set("hideNonOpenRows", false);

        links.forEach((link) => link!.show());
    }
}
