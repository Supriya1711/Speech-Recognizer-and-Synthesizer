var transcript;
function runSpeechRecognition() {
    
    // get output div reference
    var output = document.querySelector('#output');
    
    // get action element reference
    var action = document.querySelector('#action');
    
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
         transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence * 100 + "%";
        output.classList.remove("hide");
    };

    // start recognition
    recognition.start();
}

// ==========================SPECCH SYNTHESIZER===========================
var voiceList = document.querySelector('#voiceList');
    var btnspeak = document.querySelector('#btnspeak');

    var texttospeech = window.speechSynthesis;
    var voices = [];
    GetVoices();
    if (speechSynthesis !== undefined); {
        speechSynthesis.onvoiceschanged = GetVoices;
    }
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
 

function runSpeakSynthesis(){
    console.log(transcript)
    btnspeak.addEventListener('click', () => {
        var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
        console.log(selectedVoiceName);
        var toSpeak = new SpeechSynthesisUtterance(transcript);
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });

    texttospeech.speak(toSpeak);

});
}
// ====================================================================================================