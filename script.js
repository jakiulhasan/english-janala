const showLoading = (status) => {
  if (status) {
    document.getElementById("showLoading").classList.remove("hidden");
    document.getElementById("words-container").classList.add("hidden");
  } else {
    document.getElementById("words-container").classList.remove("hidden");
    document.getElementById("showLoading").classList.add("hidden");
  }
};

const showSynonym = (arr) => {
  const createHtml = arr.map((el) => `<span class="btn"> ${el} </span>`);
  return createHtml.join(" ");
};
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActiveDesign = (btns) => {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLessonWord = (levelId) => {
  showLoading(true);
  const loadLessonWordUrl = `https://openapi.programming-hero.com/api/level/${levelId}`;

  const removeActive = document.querySelectorAll(".removeActive");
  removeActiveDesign(removeActive);

  const loadLessonBtn = document.getElementById(`loadLessonBtn-${levelId}`);
  loadLessonBtn.classList.add("active");

  fetch(loadLessonWordUrl)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
};

const showInfo = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showModel(details.data);
};
// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
// }
const showModel = (word) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <div class="text-4xl font-bold">
                    ${
                      word.word
                    } <span class="font-bangla">( <i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })</span>
                </div>
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">Meaning</h2>
                    <h3 class="text-2xl font-bangla">${word.meaning}</h3>
                </div>
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold">Example</h2>
                    <h3 class="text-2xl">${word.sentence}</h3>
                </div>
                <div class="space-y-2">
                    <h2 class="text-2xl font-semibold font-bangla">সমার্থক শব্দ গুলো</h2>
                    <div>
                        ${showSynonym(word.synonyms)}
                    </div>
                </div>
  `;
  const myModal = document.getElementById("my_modal_1").showModal();
};

const displayWords = (words) => {
  // console.log(words);
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";
  wordsContainer.classList.replace("p-20", "p-5");
  if (words.length == 0) {
    wordsContainer.innerHTML = `
    <div class="mx-auto col-span-3 space-x-3">
        <img class="mx-auto" src="./assets/alert-error.png" />
        <h3 class="text-[#79716b] text-[14px] mb-2 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
        <h1 class="text-[#292524] text-4xl font-medium font-bangla">নেক্সট Lesson এ যান</h1>
    </div>
    `;
    showLoading(false);
    return;
  }

  wordsContainer.classList.add("grid", "grid-cols-3", "gap-5");
  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-white rounded-sm p-10 h-full">
            <div>
                <h1 class="text-3xl font-bold">${
                  word.word ? word.word : "শব্দ পাওয়া যায়নি"
                }</h1>
                <p class="text-xl font-medium my-4">Meaning /Pronounciation</p>
                <p class="font-bangla text-[#18181B] text-3xl font-semibold mb-10">"${
                  word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                } /
                    ${
                      word.pronunciation
                        ? word.pronunciation
                        : "উচ্চারন পাওয়া যায়নি"
                    }"
                </p>
            </div>
            <div class="flex justify-between">
              <button onclick="showInfo(${
                word.id
              })" class="btn hover:bg-[#1a91ff80] bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info text-xl"></i> </button>
              <button class="btn hover:bg-[#1a91ff80] bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high text-xl"></i></button>
            </div>
        </div>       
     `;
    wordsContainer.appendChild(card);
    showLoading(false);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerText = "";

  for (const lesson of lessons) {
    const levelItem = document.createElement("li");
    levelItem.innerHTML = `<button id="loadLessonBtn-${lesson.level_no}" onclick="loadLessonWord(${lesson.level_no})" class="removeActive btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Level ${lesson.level_no}</button>`;
    levelContainer.appendChild(levelItem);
  }
};

loadLessons();
