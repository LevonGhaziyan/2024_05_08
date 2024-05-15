// Event listener for clicking on the plant selector closed button
document.querySelector("#plant_selector_closed").addEventListener("click", () => {
    const obj = document.querySelector("#plant_selector_body");
    obj.style.left = "-100vw"; // Move the plant selector body off screen to the left
    obj.style.display = "flex"; // Display the plant selector body
    let left_counter = -100; // Initialize a counter for smooth transition

    // Function to smoothly transition the plant selector body into view
    const interval = setInterval(smooth_transformation, 1);
    function smooth_transformation() {
        if (left_counter >= 0) {
            clearInterval(interval); // Stop the interval once the transition is complete
        } else {
            obj.style.left = `${++left_counter}vw`; // Incrementally move the plant selector body into view
        }
    }

    document.querySelector("#plant_selector_closed").style.display = "none"; // Hide the plant selector closed button
});


// Event listener for clicking on the plant selector close button
document.querySelector("#plant_selector_close_button").addEventListener("click", () => {
    const obj = document.querySelector("#plant_selector_body");
    let left_counter = 0; // Initialize a counter for smooth transition

    // Function to smoothly transition the plant selector body out of view
    const interval = setInterval(smooth_transformation, 1);
    function smooth_transformation() {
        if (left_counter <= -100) {
            clearInterval(interval); // Stop the interval once the transition is complete

            obj.style.display = "none"; // Hide the plant selector body
            document.querySelector("#plant_selector_closed").style.display = "flex"; // Display the plant selector closed button
        } else {
            obj.style.left = `${--left_counter}vw`; // Incrementally move the plant selector body out of view
        }
    }
});


// Event listener for clicking on the water pouring button
let pouring_checker = false; // Variable to prevent multiple clicks
document.querySelector("#footer_water").addEventListener("click", () => {
    if (!pouring_checker) {
        pouring_checker = true; // Set pouring_checker to true to prevent multiple clicks
        const img = new Image();
        img.id = "water_pouring";

        document.querySelector("#plant_container").appendChild(img); // Append the water pouring image to the plant container
        setTimeout(() => {
            img.src = "./img/Water-Pouring_4-ezgif.com-loop-count.gif"; // Set the source of the water pouring image
        }, 0);

        img.addEventListener("load", () => {
            setTimeout(() => {
                document.querySelector("#water_pouring").remove(); // Remove the water pouring image after it's loaded and played
                pouring_checker = false; // Set pouring_checker back to false to allow for another click
            }, 4000); // Wait for 4 seconds before removing the water pouring image
        });
    }
});

// Object to keep track of the state of various icons
const icons_state = {
    booster: true,
    booster3: true,
    achievement: false,
    Profile: false,
    Settings: false,
    Shop: false,
    "Water btn": true,
    last_change: null
}

// Function to change the state of an icon and update its image
function change_icon_state(address, name) {
    if (icons_state.last_change?.[0] != address) {
        if (icons_state.last_change) {
            document.querySelector(icons_state.last_change[0]).src = `./img/${icons_state.last_change[1]}=Disabled.svg`
            icons_state[icons_state.last_change[1]] = false
        }

        const url = `./img/${name}=${icons_state[name] ? "Disabled" : "Select"}.svg`
        icons_state[name] = !icons_state[name]

        icons_state.last_change = [address, name]

        document.querySelector(address).src = url
    }
}

function change_icon_state_booster(address, name) {

    const url = `./img/${name}=${icons_state[name] ? "Disabled" : "Select"}.svg`
    icons_state[name] = !icons_state[name]


    document.querySelector(address).src = url
}

// Event listeners for clicking on various icons to change their state
document.querySelector("#booster1").addEventListener("click", () => { change_icon_state_booster("#booster1>img", "booster") })
document.querySelector("#booster2").addEventListener("click", () => { change_icon_state_booster("#booster2>img", "booster3") })
document.querySelector("#footer_shop").addEventListener("click", () => { change_icon_state("#footer_shop>img", "Shop") })
document.querySelector("#footer_achievement").addEventListener("click", () => { change_icon_state("#footer_achievement>img", "achievement") })
document.querySelector("#footer_profile").addEventListener("click", () => { change_icon_state("#footer_profile>img", "Profile") })
document.querySelector("#footer_settings").addEventListener("click", () => { change_icon_state("#footer_settings>img", "Settings") })