document.body.addEventListener('keypress', onKeyPress)

let recordPath;
let channel1=  [];
let channel2 = [];
let channel3 = [];
let channel4 = [];

document.querySelector('#playBtn1').addEventListener('click', () => {playChannel(channel1)});
document.querySelector('#playBtn2').addEventListener('click', () => {playChannel(channel2)});
document.querySelector('#playBtn3').addEventListener('click', () => {playChannel(channel3)});
document.querySelector('#playBtn4').addEventListener('click', () => {playChannel(channel4)});



document.querySelector('#recordBtn1').addEventListener('click', () => {
    recordStartTime = Date.now();
    recordPath = 1;
})
document.querySelector('#recordBtn2').addEventListener('click', () => {
    recordStartTime2 = Date.now();
    recordPath = 2;
})
document.querySelector('#recordBtn3').addEventListener('click', () => {
    recordStartTime3 = Date.now();
    recordPath = 3;
})
document.querySelector('#recordBtn4').addEventListener('click', () => {
    recordStartTime4 = Date.now();
    recordPath = 4;
})


function onKeyPress(ev) {
    let sound;
    let soundName;
    switch (ev.code) {

        case "KeyA":
            soundName = "boom";
            sound = document.querySelector("#boom");
            break;
        case "KeyS":
            soundName = "clap";
            sound = document.querySelector("#clap");
            break;
        case "KeyD":
            soundName = "hihat";
            sound = document.querySelector("#hihat");
            break;
        case "KeyF":
            soundName = "kick";
            sound = document.querySelector("#kick");
            break;
        case "KeyG":
            soundName = "openhat";
            sound = document.querySelector("#openhat");
            break;
        case "KeyH":
            soundName = "ride";
            sound = document.querySelector("#ride");
            break;
        case "KeyJ":
            soundName = "snare";
            sound = document.querySelector("#snare");
            break;
        case "KeyK":
            soundName = "tink";
            sound = document.querySelector("#tink");
            break;
        case "KeyL":
            soundName = "tom";
            sound = document.querySelector("#tom");
            break;
    }

    if (sound && recordPath == 1) {
        const soundTime = Date.now() - recordStartTime;
        const recordedsound = {
            sound: soundName,
            time: soundTime,
        }
        channel1.push(recordedsound);

        sound.play();
        transition(soundName)
    }
    if (sound && recordPath == 2) {

        const soundTime = Date.now() - recordStartTime2;
        const recordedSound = {
            sound: soundName,
            time: soundTime,
        }
        channel2.push(recordedSound);
        sound.play();
        transition(soundName)
    }
    if (sound && recordPath == 3) {

        const soundTime = Date.now() - recordStartTime3;
        const recordedSound = {
            sound: soundName,
            time: soundTime,
        }
        channel3.push(recordedSound);
        sound.play();
        transition(soundName)
    }
    if (sound && recordPath == 4) {

        const soundTime = Date.now() - recordStartTime4;
        const recordedSound = {
            sound: soundName,
            time: soundTime,
        }
        channel4.push(recordedSound);
        sound.play();
        transition(soundName)
        
    } else if (sound) {
        sound.play();
        transition(soundName)
    }
}

function transition(soundName) {
    var span = document.querySelector('.' + soundName)
    span.classList.add('transition')
    setTimeout(() => {span.classList.remove('transition')},500)
}

function playChannel(channel) {
    for (let index = 0; index < channel.length; index++) {
        const soundObject = channel[index];

        setTimeout(() => {
            playSound(soundObject.sound)
        }, soundObject.time)
    }
}

function playSound(soundName) {
    const sound = document.querySelector('#' + soundName)
    sound.play();
}
