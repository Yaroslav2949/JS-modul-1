const search = document.querySelector(".js-search");
const list = document.querySelector(".js-list");
search.addEventListener("submit", onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const { query, days } = evt.currentTarget.elements;
  getWeather(query.value, days.value)
    .then((data) => (list.innerHTML=createMarkup(data.forecast.forecastday)))
    .catch((err) => console.log(err));
}
function getWeather(city, days) {
  // http://api.weatherapi.com/v1/forecast.json?key=114e586fc08848afb2b175719231407&q=Paris&days=5
  const Base_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "114e586fc08848afb2b175719231407";

  return fetch(
    `${Base_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`
  ).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `<li>
  <img src="${icon}" alt="${text}">
  <p>${text}</p>
  <h2>${date}</h2>
  <h3>${avgtemp_c}</h3>
</li>`
    )
    .join("");
}

// const start = document.querySelector(".js-start");
// const container = document.querySelector(".js-container");
// start.addEventListener("click", onStart);
// console.log(start);

// function onStart() {
//   const result = [];
//   [...container.children].forEach((box, i) => (box.textContent = ""));
//   [...container.children].forEach((box, i) => {
//     createPromise(i)
//       .then((smile) => {
//         box.textContent = smile;
//         result.push("1");
//       })
//       .catch((smile) => {
//         box.textContent = smile;
//       })
//       .finally(() => {
//         setTimeout(() => {
//           if (i === container.children.length - 1) {
//             if (!result.length || result.length === 3) {
//               alert("Winner");
//             } else {
//               alert("Lost money");
//             }
//           }
//         }, 500);
//       });
//   });
// }

// function createPromise(delay) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       const random = Math.random();
//       if (random > 0.5) {
//         res("🤑");
//       } else {
//         rej("😈");
//       }
//     }, 1000 * delay);
//   });
// }
