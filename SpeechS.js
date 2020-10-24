var voiceList = document.querySelector('#voiceList');
var txtInput = document.querySelector('#txtInput');
var btnspeak = document.querySelector('#btnspeak');

var texttospeech = window.speechSynthesis;
var voices = [];

GetVoices();

if (speechSynthesis !== undefined); {
    speechSynthesis.onvoiceschanged = GetVoices;
}

btnspeak.addEventListener('click', () => {
    var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;

        }
    });

    texttospeech.speak(toSpeak);

});

function GetVoices() {
    voices = texttospeech.getVoices();
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);

    });

    voiceList.selectedIndex = 0;

}