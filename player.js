"use strict";
const phrases = [
  { folder:"dream_it_possible_breathiness", text:"“dark turning dust”", target:"Breathiness ON", duration:2.12 },
  { folder:"feng_vibrato", text:"“爱”", target:"Vibrato ON", duration:1.42 },
  { folder:"try_falsetto", text:"“you”", target:"Falsetto OFF", duration:1.90 }
];
const byId = id => document.getElementById(id);
let audio = byId("audio");
let phrase = 0;
let version = "preflow_unspecified";
let cue = 0;
let playing = false;
const help = "Switch versions while the excerpt loops to compare the same moment.";
function duration() { return Number.isFinite(audio.duration) ? audio.duration : phrases[phrase].duration; }
function update() {
  const time = audio.readyState ? audio.currentTime : cue;
  byId("play").textContent = playing ? "Ⅱ Pause" : "▶ Play";
  byId("seek").max = duration();
  byId("seek").value = time;
  byId("timer").textContent = time.toFixed(2) + " / " + duration().toFixed(2) + " s";
}
function start(el) {
  el.play().catch(err => {
    if (el !== audio || err.name === "AbortError") return;
    playing = false;
    byId("hint").textContent = "Playback could not start. Press Play to try again.";
    update();
  });
}
function bind(el) {
  el.addEventListener("loadedmetadata", () => {
    if (el !== audio) return;
    if (cue > 0) el.currentTime = Math.min(cue,Math.max(0,el.duration - 0.01));
    cue = 0; update();
  });
  for (const event of ["timeupdate","seeked","durationchange"]) el.addEventListener(event, () => { if (el === audio) update(); });
  el.addEventListener("ended", () => { if (el === audio) { playing = false; update(); } });
  el.addEventListener("error", () => {
    if (el !== audio) return;
    playing = false; byId("hint").textContent = "The excerpt could not be loaded. Check your connection and try again."; update();
  });
}
function change(nextPhrase,nextVersion) {
  const old = audio;
  cue = nextPhrase === phrase ? (old.readyState ? old.currentTime : cue) : 0;
  phrase = nextPhrase; version = nextVersion;
  const example = phrases[phrase];
  byId("command").textContent = example.target; byId("lyric").textContent = example.text;
  byId("lyric").lang = phrase === 1 ? "zh" : "en";
  byId("hint").textContent = help;
  const next = new Audio();
  next.id = "audio"; next.preload = "auto"; next.loop = byId("loop").checked;
  audio = next; bind(next); old.pause(); old.replaceWith(next);
  next.src = "./audio/" + example.folder + "/" + version + ".wav";
  next.load();
  if (playing) start(next);
  update();
}
byId("phrases").addEventListener("change", e => change(Number(e.target.value),version));
byId("conditions").addEventListener("change", e => change(phrase,e.target.value));
byId("play").addEventListener("click", () => {
  playing = !playing; byId("hint").textContent = help;
  if (playing) { if (audio.error) audio.load(); start(audio); } else audio.pause();
  update();
});
byId("loop").addEventListener("change", e => { audio.loop = e.target.checked; });
byId("seek").addEventListener("input", e => {
  cue = Number(e.target.value);
  if (audio.readyState >= 1) { audio.currentTime = cue; cue = 0; }
  update();
});
bind(audio); update();

