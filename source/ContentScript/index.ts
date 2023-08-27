import WhoOwnsEnhancer from "./page-enhancers/who-owns-enhancer";
import WhoWantsEnhancer from "./page-enhancers/who-wants-enhancer";

if (window.location.href.includes("who-owns.php")) {
    WhoOwnsEnhancer.enhance(document);
}

if (window.location.href.includes("who-wants.php")) {
    WhoWantsEnhancer.enhance(document);
}
