// Constructor
function PlaceManager() {
    this.places = {};  
    this.currentId = 0; 
};

// Id generator
PlaceManager.prototype.assignId = function() {
    this.currentId++;
    return this.currentId;
};

PlaceManager.prototype.addPlace = function(place) {
    const id = this.assignId();   
    place.id = id;                
    this.places[id] = place;      
};

PlaceManager.prototype.getPlace = function(id) {
    return this.places[id];
};


// Remove task
PlaceManager.prototype.deletePlace = function(id) {
    if (this.places[id]) { 
        delete this.places[id];
        return true; 
    } 
    return false;
    };

  function Place(location, timeOfYear, landmarks, notes) {
    this.location = location;
    this.timeOfYear = timeOfYear;
    this.landmarks = landmarks.split(",")
    this.notes = notes;
    this.id = null   // Given by generator
}

// UI & DOM manipulationm
const myPlaces = new PlaceManager();

// DOM Elements
const listEl = document.getElementById(`placesList`)

// HANDLER: Add Button Click
   function handleAddPlace() {

    const locIn = document.getElementById("location");
    const timeIn = document.getElementById("timeOfYear");
    const landIn = document.getElementById("landmarks");
    const notesIn = document.getElementById("notes");

    // 1. Create Object
    const newPlace = new Place(
        locIn.value,
        timeIn.value,
        landIn.value,
        notesIn.value
    );

    // 2. Store Data
    myPlaces.addPlace(newPlace);

    // 3. Update UI
    renderPlaces();

    // 4. Reset Inputs
    locIn.value = "";
    timeIn.value = "";
    landIn.value = "";
    notesIn.value = "";
}

function handleDeletePlace(id) {

    if (confirm("Delete this place?")) {
        myPlaces.deletePlace(id);
        renderPlaces();
    }
}

function renderPlaces() {

    const list = document.getElementById("placesList");
    const emptyState = document.getElementById("emptyState");

    const placeIds = Object.keys(myPlaces.places);

// Show empty text if list is 0
if (placeIds.length === 0) {
   emptyState.style.display = "block"
   list.innerHTML = "";
   return;
}

// Hide text when place is added
emptyState.style.display = "none";
list.innerHTML = "";

// Display places
placeIds.forEach(id => {

        const place = myPlaces.places[id];

        const card = document.createElement("div");
        card.className = "place-card";

        card.innerHTML = `
        <div  class="place-header">
            <h3>📍 ${place.location}</h3>
            <p>${place.timeOfYear || ""}</p>
            <button onclick="event.stopPropagation(); handleDeletePlace(${id})">
                🗑️
            </button>
        </div>
        `;

        card.addEventListener("click", function() {
            renderDetails(id);
        });

        list.appendChild(card);
    });
}

    function renderDetails(id) {

    const place = myPlaces.getPlace(id);
    const details = document.getElementById("details");

    details.innerHTML = `
        <h2>🌍 ${place.location}</h2>
        <p><strong>Time:</strong> ${place.timeOfYear}</p>

        <h3>🏛️ Landmarks</h3>
        <ul>
            ${place.landmarks.map(l => `<li>${l.trim()}</li>`).join("")}
        </ul>

        <h3>📝 Notes</h3>
        <p>${place.notes}</p>
    `;
}