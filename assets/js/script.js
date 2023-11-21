const toggleModal = () => {
    const modal = document.querySelector(".modal");

    modal.classList.toggle("active");
};

const insertModalContent = (clickedTeam) => {
    const data = US_MAP_TEAMS_MAP[clickedTeam] || null;

    const conferenceContent = document.querySelector(".modal .modal-content .conference");
    const teamNameContent = document.querySelector(".modal .modal-content strong");
    const teamLogo = document.querySelector(".modal .modal-content img");
    const embedIframe = document.querySelector(".modal .modal-content iframe.iframe-video");

    conferenceContent.innerHTML = data?.conference?.name || "-";
    conferenceContent.style.color = data?.conference?.color;

    teamNameContent.innerHTML = data?.name;
    teamLogo.src = data?.icon;
    embedIframe.src = data?.link;
};

const initializeSVGMapListeners = () => {
    const svgObject = document.querySelector(".section_franchises_container-content-map-area object");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument;

        const rects = svgDoc.querySelectorAll("rect");
        rects.forEach(function (rect) {
            rect.style.cursor = "pointer";
        });

        svgDoc.addEventListener("click", ({ target }) => {
            const team = target.getAttribute("data-team") || target.parentElement.getAttribute("data-team");

            if (!!team) {
                insertModalContent(team);
                toggleModal();
            }
        });
    });
};

initializeSVGMapListeners();

document.querySelector(".close-modal-button").addEventListener("click", toggleModal);

document.querySelector(".section_questions-ul").addEventListener("click", ({ target }) => {
    const isQuestion = target.parentElement.classList.contains("section_questions-question");
    const liElement = target.closest(".section_questions-li");

    if (!!isQuestion) {
        liElement.classList.toggle("active");
    }
});
