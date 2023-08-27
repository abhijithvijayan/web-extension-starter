export default class Toggle {
    on: boolean = false;

    constructor(public element: HTMLDivElement) {
        this.setupListeners();
    }

    setupListeners() {
        this.element
            .querySelector("button")!
            .addEventListener("click", () => this.toggle());
    }

    toggle() {
        this.on = !this.on;

        if (this.on) {
            this.switchOn();
        } else {
            this.switchOff();
        }
    }

    onToggle(callback: (on: boolean) => void) {
        this.element
            .querySelector("button")!
            .addEventListener("click", () =>
                setTimeout(() => callback(this.on), 0)
            );
    }

    switchOn() {
        this.element
            .querySelector("button")!
            .setAttribute("aria-checked", "true");
        this.element
            .querySelector("button span")!
            .classList.remove("translate-x-0");
        this.element
            .querySelector("button span")!
            .classList.add("translate-x-5");

        this.element.querySelector("button")!.classList.remove("bg-slate-200");
        this.element.querySelector("button")!.classList.add("bg-green-600");

        this.on = true;
    }

    switchOff() {
        this.element
            .querySelector("button")!
            .setAttribute("aria-checked", "false");
        this.element
            .querySelector("button span")!
            .classList.remove("translate-x-5");
        this.element
            .querySelector("button span")!
            .classList.add("translate-x-0");

        this.element.querySelector("button")!.classList.remove("bg-green-600");
        this.element.querySelector("button")!.classList.add("bg-slate-200");

        this.on = false;
    }

    static create(): Toggle {
        let div = document.createElement("div");
        div.classList.add("flex", "items-center");

        let button = document.createElement("button");
        button.type = "button";
        button.classList.add(
            "relative",
            "inline-flex",
            "h-6",
            "w-11",
            "flex-shrink-0",
            "cursor-pointer",
            "rounded-full",
            "border-2",
            "border-transparent",
            "bg-slate-200",
            "transition-colors",
            "duration-200",
            "ease-in-out",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-indigo-600",
            "focus:ring-offset-2"
        );
        button.setAttribute("role", "switch");
        button.setAttribute("aria-checked", "false");
        button.setAttribute("aria-labelledby", "toggle-label");

        let handle = document.createElement("span");
        handle.setAttribute("aria-hidden", "true");
        handle.classList.add(
            "pointer-events-none",
            "inline-block",
            "h-5",
            "w-5",
            "translate-x-0",
            "transform",
            "rounded-full",
            "bg-white",
            "shadow",
            "ring-0",
            "transition",
            "duration-200",
            "ease-in-out"
        );
        button.appendChild(handle);

        let span = document.createElement("span");
        span.classList.add("ml-[0.75rem]", "text-sm");
        span.id = "toggle-label";

        let spanChild1 = document.createElement("span");
        spanChild1.classList.add("font-medium", "text-slate-900");
        spanChild1.innerText = "Only show";

        let spanChild2 = document.createElement("span");
        spanChild2.classList.add(
            "relative",
            "ml-[14px]",
            "mr-1.5",
            "inline-block"
        );

        let spanGrandchild1 = document.createElement("span");
        spanGrandchild1.classList.add(
            "absolute",
            "-bottom-[3px]",
            "-left-1.5",
            "-right-1.5",
            "-top-0.5",
            "rounded-md",
            "bg-green-100"
        );

        let spanGrandchild2 = document.createElement("span");
        spanGrandchild2.classList.add("relative", "text-green-950");
        spanGrandchild2.innerText = "open to trades";

        spanChild2.appendChild(spanGrandchild1);
        spanChild2.appendChild(spanGrandchild2);

        span.appendChild(spanChild1);
        span.appendChild(spanChild2);

        div.appendChild(button);
        div.appendChild(span);

        return new Toggle(div);
    }
}
