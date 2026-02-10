
function Place(location, landmarks, season, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.season = season;
  this.notes = notes;
  this.id = null;
}

Place.prototype.summary = function () {
  return this.location + " (" + this.season + ")";
};

function PlacesList() {
  this.places = {};
  this.currentId = 0;
}

PlacesList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

PlacesList.prototype.addPlace = function (place) {
  place.id = this.assignId();
  this.places[place.id] = place;
};

PlacesList.prototype.findPlace = function (id) {
  return this.places[id];
};


const placesList = new PlacesList();

function displayPlaces() {
  const placesUl = document.getElementById("placesList");
  placesUl.innerHTML = "";

  for (let id in placesList.places) {
    const li = document.createElement("li");
    li.textContent = placesList.places[id].summary();
    li.addEventListener("click", function () {
      showPlaceDetails(id);
    });
    placesUl.appendChild(li);
  }
}

function showPlaceDetails(id) {
  const place = placesList.findPlace(id);
  const detailsDiv = document.getElementById("placeDetails");

  detailsDiv.innerHTML = `
    <h2>${place.location}</h2>
    <p><strong>Landmarks:</strong> ${place.landmarks}</p>
    <p><strong>Best Time:</strong> ${place.season}</p>
    <p><strong>Notes:</strong> ${place.notes}</p>
  `;
}


document.getElementById("placeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const landmarks = document.getElementById("landmarks").value;
  const season = document.getElementById("season").value;
  const notes = document.getElementById("notes").value;

  const newPlace = new Place(location, landmarks, season, notes);
  placesList.addPlace(newPlace);

  displayPlaces();
  event.target.reset();
});
