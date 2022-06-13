const form = document.querySelector('form');
const searchResults = document.querySelector('#searchResults');
const searchWord = document.querySelector('#searchWord');
const word = document.querySelector('#word');
const pronounce = document.querySelector('#pronounce');
const volumeIcon = document.querySelector('#volume');
const sound = document.querySelector('#sound');
const button = document.querySelector('button');
const meaningHeader = document.querySelector('#meaning');
const meaningText = document.querySelector('#meaningText');
const exampleHeader = document.querySelector('#example');
const exampleText = document.querySelector('#exampleText');
const synonyms = document.querySelector('#synonyms');
const synonymsText = document.querySelector('#synonymsText');
let validValue;
let validVolume;
let definitionVariable;
let arrayOfSynonyms;

// When form is submited do this:
form.addEventListener('submit', e => {
    // Dont go anywhere
    e.preventDefault();
    // Store value from input to this variable
    const searchValue = searchWord.value;
    // Make request to this URL
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
    // If we get response do this:
    .then(res => {
        searchResults.style.display = 'flex';
        searchResults.style.justifyContent = 'center';
        searchResults.style.alignItems = 'center';
        // Write searched word
        word.textContent = searchValue;
        // Go trough all phonetics
        for (let i in res.data[0].phonetics) {
            if ('text' in res.data[0].phonetics[i]) {
                validValue = res.data[0].phonetics[i].text;
            }
        }
        pronounce.textContent = validValue;
        button.style.display = 'inline';

        for (let i in res.data[0].phonetics) {
            if ('audio' in res.data[0].phonetics[i]) {
                if (res.data[0].phonetics[i].audio !== '') {
                    validVolume = res.data[0].phonetics[i].audio;
                }
            }
        }

        sound.setAttribute('src', validVolume);
        volumeIcon.addEventListener('click', function() {
            sound.play();
        });

        meaningHeader.textContent = 'Meaning'
        meaningText.textContent = res.data[0].meanings[0].definitions[0].definition;

        exampleHeader.textContent = 'Example';

        for (let def in res.data[0].meanings) {
            if ('definitions' in res.data[0].meanings[def]) {
                for (let exam in res.data[0].meanings[def].definitions) {
                    if ('example' in res.data[0].meanings[def].definitions[exam]) {
                        exampleText.textContent = res.data[0].meanings[def].definitions[exam].example;
                    }
                }
            }
        }

        synonyms.textContent = 'Synonyms';

        for (let i in res.data[0].meanings) {
            if ('synonyms' in res.data[0].meanings[i]) {
                if (res.data[0].meanings[i].synonyms.length !== 0) {
                    arrayOfSynonyms = res.data[0].meanings[i].synonyms;
                    synonymsText.textContent = arrayOfSynonyms.slice(0, 4).toString();
                }
            }
        }
    }).catch(() => {
        alert('Sorry, there is some problem with request.');
    })
    searchWord.value = '';
})