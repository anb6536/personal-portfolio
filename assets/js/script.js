const textName = "Aahish Balimane";

const target = document.getElementById("hover-text");

textName.split("").map((char, idx) => {
    const el = document.createElement("span");
    el.innerText = char;
    el.setAttribute("data-index", idx.toString());
    el.classList.add("hover-char");

    target.appendChild(el);
});

const hoverChars = [...document.getElementsByClassName("hover-char")];

const removeClasses = () => {
    hoverChars.map((char) => {
        char.classList.remove("hovered");
        char.classList.remove("hovered-adjacent");
    });
}

hoverChars.map((char) => {
    char.addEventListener("mouseover", (e) => {

        removeClasses();

        const currentEl = e.target;
        const index = parseInt(currentEl.getAttribute("data-index"), 10);

        const prev = index === 0 ? null : index - 1;
        const next = index == textName.length - 1 ? null : index + 1;

        const prevEl = prev !== null && document.querySelector(`[data-index="${prev}"]`);
        const nextEl = next !== null && document.querySelector(`[data-index="${next}"]`);

        e.target.classList.add("hovered");
        prevEl && prevEl.classList.add("hovered-adjacent");
        nextEl && nextEl.classList.add("hovered-adjacent");
    });
})

document.getElementById("hover-text").addEventListener("mouseleave", () => {
    removeClasses();
})