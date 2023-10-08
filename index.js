const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound").play();
const btn = document.getElementById("btn-search");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.title === "No Definitions Found") {
        alert("No Definitions Found");
        return;
      }
      result.innerHTML = `
            <div class="word">
                <h3> ${inpWord} </h3>
               
            </div>
            <div class="details">
                <p> ${data[0].meanings[0].partOfSpeech} </p>
                <p> ${data[0].phonetic} </p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-meaning">
                Synonyms:
                <br>
                ${
                  data[0].meanings[0].synonyms[1] ||
                  data[0].meanings[1].synonyms[1] ||
                  "No Synonyms"
                } 
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No Example"}
            </p>
            `;
      sound.setAttribute("src", `https:${data[0].phonetics[1].audio}`);
      console.log(sound);
    });
});

// function playSound() {
//   if (sound != undefined) {
//     sound
//       .then(function () {
//         sound.play();
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// }
