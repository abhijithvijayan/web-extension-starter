import TradeFinderEnhancer from "./page-enhancers/trade-finder-enhancer";
import TradeFinderTheirsEnhancer from "./page-enhancers/trade-finder-theirs-enhancer";
import WhoOwnsEnhancer from "./page-enhancers/who-owns-enhancer";
import WhoWantsEnhancer from "./page-enhancers/who-wants-enhancer";

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
