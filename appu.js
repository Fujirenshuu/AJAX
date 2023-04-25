const form = document.querySelector("#search-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll(".show-img").forEach((img) => img.remove());
  document.querySelectorAll(".show-caption").forEach((cp) => cp.remove());

  const keyword = form.elements.query.value;
  const config = {
    params: { q: keyword },
  };
  const res = await axios.get("https://api.tvmaze.com/search/shows", config);

  getImages(res.data);
  form.elements.query.value = "";
});

const getImages = async (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("img");
      img.src = result.show.image.medium;
      img.classList.add("show-img");

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = result.show.name;
      figcaption.classList.add("show-caption");

      const figure = document.createElement("figure");
      figure.append(img, figcaption);
      document.body.append(figure);
    }
  }
};
