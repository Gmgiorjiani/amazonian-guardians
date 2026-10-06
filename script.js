/* ==========================================
   THE TWELVE AMAZONIAN GUARDIANS
   OF THE FORTIETH YEAR
========================================== */


const doors = document.querySelectorAll(".door");

const modal = document.getElementById("birdModal");

const birdImage = document.getElementById("birdImage");

const closeModalButton =
    document.getElementById("closeModal");

const backdrop =
    document.querySelector(".modal-backdrop");


/* ==========================================
   IMAGE FILES

   Each image is the COMPLETE bird panel:
   bird photo(s) + text + offering.
========================================== */

const birdImages = {

    1: "images/bird01.jpg",
    2: "images/bird02.jpg",
    3: "images/bird03.jpg",
    4: "images/bird04.jpg",
    5: "images/bird05.jpg",
    6: "images/bird06.jpg",
    7: "images/bird07.jpg",
    8: "images/bird08.jpg",
    9: "images/bird09.jpg",
    10: "images/bird10.jpg",
    11: "images/bird11.jpg",
    12: "images/bird12.jpg"

};


/* ==========================================
   LOAD PREVIOUSLY OPENED DOORS
========================================== */

let openedDoors = [];

try {

    openedDoors =
        JSON.parse(
            localStorage.getItem(
                "amazonianGuardiansOpened"
            )
        ) || [];

} catch {

    openedDoors = [];

}


/* Mark them visually */

openedDoors.forEach(number => {

    const door =
        document.querySelector(
            `.door[data-bird="${number}"]`
        );

    if (door) {

        door.classList.add("opened");

    }

});


/* ==========================================
   OPEN A DOOR
========================================== */

doors.forEach(door => {

    door.addEventListener(
        "click",
        function () {

            const birdNumber =
                Number(
                    this.dataset.bird
                );


            /* Set panel image */

            birdImage.src =
                birdImages[birdNumber];

            birdImage.alt =
                `Amazonian guardian ${birdNumber}`;


            /* Show modal */

            modal.classList.add("visible");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            /* Prevent background scrolling */

            document.body.style.overflow =
                "hidden";


            /* Remember door as opened */

            if (
                !openedDoors.includes(
                    birdNumber
                )
            ) {

                openedDoors.push(
                    birdNumber
                );

                localStorage.setItem(
                    "amazonianGuardiansOpened",
                    JSON.stringify(
                        openedDoors
                    )
                );

            }


            /* Change appearance */

            this.classList.add(
                "opened"
            );

        }
    );

});


/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal() {

    modal.classList.remove(
        "visible"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* X button */

closeModalButton.addEventListener(
    "click",
    closeModal
);


/* Clicking outside panel */

backdrop.addEventListener(
    "click",
    closeModal
);


/* ESC key */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains(
                "visible"
            )
        ) {

            closeModal();

        }

    }
);


/* ==========================================
   PRELOAD PANELS

   Makes opening later doors feel instant.
========================================== */

Object.values(
    birdImages
).forEach(src => {

    const image =
        new Image();

    image.src =
        src;

});
