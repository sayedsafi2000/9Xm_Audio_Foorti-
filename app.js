const loadAudio = (search, searchText) => {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayAudio(data.artists))
}
const displayAudio = audios => {
    const audioDiv = document.getElementById("audioDiv");
    audioDiv.innerHTML = "";
    // console.log(audios)
    audios.forEach(audio => {
        const { idArtist, strGenre, intBornYear, intMembers, strArtistThumb, strBiographyEN, strCountry, strStyle } = audio;
        const createDiv = document.createElement("div");
        createDiv.classList.add("col");
        createDiv.innerHTML = `
        <div onclick="loadModal(${idArtist})" class="card h-100">
        <img src="${strArtistThumb}" class="card-img-top" alt="...">
        <div class="card-body">
                <h6 class="card-title">${strGenre}</h6>
                <h6 class="card-title">Group Members: ${intMembers}</h6>
                <p class="card-text">${strBiographyEN.slice(0, 250)}...</p>
            </div>
            <div class="">
            <button type="button" class="w-100 btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Click For Details
            </button>
            </div>
        </div>
        `
        audioDiv.appendChild(createDiv);
    });
}
const searchField = document.getElementById("searchField");
const searchSong = () => {
    const searchText = searchField.value;
    loadAudio(searchText);
    searchField.value = "";
}
searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const searchText = searchField.value;
        loadAudio(searchText);
        searchField.value = "";
    }
})
let loadModal = (idArtist) => {
    const url = `https://theaudiodb.com/api/v1/json/2/artist.php?i=${idArtist}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalSinger(data.artists[0]));
}
const modalSinger = DJ => {
    console.log(DJ);
    const { idArtist, strArtist, intBornYear, intMembers, strArtistThumb, strBiographyEN, strCountry, strStyle } = DJ;
    const getModal = document.getElementById("modal-Singer");
    getModal.innerHTML = '';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add("card")
    modalDiv.innerHTML = `
        <img style="height:350px;" src="${strArtistThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Born Year:${intBornYear}</h5>
        <h5 class="card-title">${strCountry}</h5>
        <h5 class="card-title">Born Year:${strStyle}</h5>
        <h6 class="card-title">Group Members: ${intMembers}</h6>
        <p class="card-text">${strBiographyEN}</p>
        </div>
`
    getModal.appendChild(modalDiv);
}

loadAudio("");