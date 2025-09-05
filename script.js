const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLessonWord = (levelId) => {
  const loadLessonWordUrl = `https://openapi.programming-hero.com/api/level/${levelId}`;
  console.log(loadLessonWordUrl);
  fetch(loadLessonWordUrl)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
};

const displayWords = (words) => {
  console.log(words);
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
    return;
  }

  wordsContainer.classList.add("grid", "grid-cols-3", "gap-5");
  words.forEach((word) => {
    console.log(word);
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
              <button class="btn hover:bg-[#1a91ff80] bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info text-xl"></i> </button>
              <button class="btn hover:bg-[#1a91ff80] bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high text-xl"></i></button>
            </div>
        </div>       
     `;
    wordsContainer.appendChild(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerText = "";

  for (const lesson of lessons) {
    const levelItem = document.createElement("li");
    levelItem.innerHTML = `<button onclick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Level ${lesson.level_no}</button>`;
    levelContainer.appendChild(levelItem);
  }
};
loadLessons();
