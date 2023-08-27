import TradeFinderEnhancer from "./page-enhancers/trade-finder-enhancer";
import TradeFinderTheirsEnhancer from "./page-enhancers/trade-finder-theirs-enhancer";
import WhoOwnsEnhancer from "./page-enhancers/who-owns-enhancer";
import WhoWantsEnhancer from "./page-enhancers/who-wants-enhancer";
import Settings from "./settings";
import TraderRepository from "./trader-repository";

if (window.location.href.includes("who-owns.php")) {
    WhoOwnsEnhancer.enhance(document);
}

if (window.location.href.includes("who-wants.php")) {
    WhoWantsEnhancer.enhance(document);
}

if (window.location.href.includes("profile/trade_finder.php")) {
    TradeFinderEnhancer.enhance(document);
}

if (window.location.href.includes("profile/trade_finder_theirs.php")) {
    TradeFinderTheirsEnhancer.enhance(document);
}

let refreshLinks = [
    "a[href*='/add-to-collection.php']",
    "a[href*='/remove-from-collection.php']",
    "a[href*='/add-to-wants.php']",
    "a[href*='/remove-from-wants.php']",
];

refreshLinks.forEach((link) => {
    document.querySelectorAll(link).forEach((link) => {
        link.addEventListener("click", async () => {
            setTimeout(() => {
                TraderRepository.refreshGlobalTradersStorage();
                console.log("refreshing");
            }, 1000);
        });
    });
});

TraderRepository.refreshIfNecessary();
