import ProfileLink from "../page-elements/profile-link";
import TraderRepository from "../trader-repository";

export default class WhoWantsEnhancer {
    static async enhance(page: Document) {
        let repository = await TraderRepository.load();

        ProfileLink.getAll(page, repository)
            .filter((profileLink) => profileLink.trader !== null)
            .filter((profileLink) => profileLink.trader!.ownsCount !== null)
            .filter((profileLink) => profileLink.trader!.ownsCount! > 0)
            .map((profileLink) => {
                profileLink.addOwnsBadge();

                return profileLink;
            })
            .filter((profileLink) => profileLink.trader!.open)
            .forEach((profileLink) => {
                profileLink.addStar();
            });
    }
}
