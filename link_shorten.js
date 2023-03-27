const linkForm = document.querySelector("#form__link");
const submitBtn = document.querySelector("#form__submit");
const linksList = document.querySelector("#links__wrap");

const handleCopyClick = (e) => {
  e.preventDefault();
  const copyUrl = e.target.previousSibling.textContent;
  window.navigator.clipboard.writeText(copyUrl);
};

const createShortenItem = (shortenUrl) => {
  const item = document.createElement("li");
  const origin_span = document.createElement("a");
  const shorten_span = document.createElement("a");
  const copy_btn = document.createElement("button");

  origin_span.textContent = shortenUrl.original_link;
  origin_span.setAttribute("href", shortenUrl.original_link);
  origin_span.setAttribute("target", "_blank");
  shorten_span.textContent = shortenUrl.full_short_link2;
  shorten_span.setAttribute("href", shortenUrl.full_short_link2);
  shorten_span.setAttribute("target", "_blank");

  copy_btn.textContent = "copy";
  copy_btn.addEventListener("click", handleCopyClick);

  item.classList.add("link__item");
  origin_span.classList.add("item__origin");
  shorten_span.classList.add("item__shorten");
  copy_btn.classList.add("btn__service");

  item.append(origin_span, shorten_span, copy_btn);
  linksList.appendChild(item);
};

const linkShorten = async (url) => {
  const shortenUrl = await (
    await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
  ).json();
  if (shortenUrl !== undefined) {
    createShortenItem(shortenUrl.result);
  }
};

const handleSubmitForm = (e) => {
  e.preventDefault();
  linkShorten(e.target.value);
};

const handleSubmitClick = (e) => {
  e.preventDefault();
  const inputValue = document.querySelector("#input__link");
  linkShorten(inputValue.value);
};

linkForm.addEventListener("submit", handleSubmitForm);
submitBtn.addEventListener("click", handleSubmitClick);
