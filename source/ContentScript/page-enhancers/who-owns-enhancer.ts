import ProfileLink from "../page-elements/profile-link";
import TraderRepository from "../trader-repository";

export default class WhoOwnsEnhancer {
    static async enhance(page: Document) {
        let repository = await TraderRepository.load();

        ProfileLink.getAll(page, repository)
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
    }
}
