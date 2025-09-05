const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("levelContainer");
  levelContainer.innerText = "";

  for (const lesson of lessons) {
    const levelItem = document.createElement("li");
    levelItem.innerHTML = `<button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Level ${lesson.level_no}</button>`;
    levelContainer.appendChild(levelItem);
  }
};
loadLessons();
