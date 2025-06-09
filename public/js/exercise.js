/* /public/js/exercise.js */
document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".exercise-tile");
  const modal = document.getElementById("exerciseModal");
  const resultPopup = document.getElementById("resultPopup");
  const resultText = document.getElementById("resultText");
  const hiddenExercise = document.getElementById("hiddenExercise");
  const form = document.getElementById("exerciseForm");

  // util
  const show = el => el.classList.remove("hidden");
  const hide = el => el.classList.add("hidden");

  /* open modal */
  tiles.forEach(tile => {
    tile.addEventListener("click", e => {
      e.preventDefault();
      hiddenExercise.value = tile.dataset.exercise;
      show(modal);
    });
  });

  /* close buttons */
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      hide(modal);
      hide(resultPopup);
    });
  });
  document.getElementById("closeResult").addEventListener("click", () => hide(resultPopup));

  /* submit form → start workout */
  form.addEventListener("submit", async e => {
    e.preventDefault();
    hide(modal);

    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/startExercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    // show summary
    resultText.innerHTML = `
      <strong>Name:</strong> ${data.Name}<br>
      <strong>Age:</strong> ${data.Age}<br>
      <strong>Height:</strong> ${data.Height} cm<br>
      <strong>Weight:</strong> ${data.Weight} kg<br>
      <strong>Exercise:</strong> ${data.ExerciseName}<br>
      <strong>Reps / Steps:</strong> ${data.StepCount}
    `;
    show(resultPopup);
  });
});
