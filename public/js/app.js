document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const first = document.querySelector("#first");
  const second = document.querySelector("#second");
  form.addEventListener("submit", e => {
    e.preventDefault();
    first.textContent = "Loading...";
    second.textContent = "";
    const url = `/weather?address=${input.value}`;
    fetch(url)
      .then(respone => respone.json())
      .then(data => {
        if (data.error) {
          first.textContent = "";
          second.textContent = `${input.value} ${data.error}`;
          form.reset();
        } else {
          second.textContent = "";
          first.innerHTML = `<p>Location: ${data.location}.</p><p>Weather: ${
            data.forecast
          }</p>`;
          form.reset();
        }
      });
  });
});
