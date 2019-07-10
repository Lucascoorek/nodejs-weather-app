document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const first = document.querySelector("#first");
  const second = document.querySelector("#second");
  form.addEventListener("submit", e => {
    e.preventDefault();
    first.textContent = "Loading...";
    second.textContent = "";
    const url = `http://localhost:3000/weather?address=${input.value}`;
    fetch(url)
      .then(respone => respone.json())
      .then(data => {
        if (data.error) {
          first.textContent = "";
          second.textContent = `${input.value} ${data.error}`;
          form.reset();
        } else {
          second.textContent = "";
          first.textContent = `Location: ${data.location}. Weather: ${
            data.forecast
          }`;
          form.reset();
        }
      });
  });
});
