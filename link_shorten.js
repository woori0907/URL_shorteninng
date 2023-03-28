const linkForm = document.querySelector("#form__link");
const submitBtn = document.querySelector("#form__submit");
const linksList = document.querySelector("#links__wrap");

let savedLinks = [];

const date = new Date();

const saveTimeStamp = () => {
  const curMonth = date.getMonth();
  const curDate = date.getDate();
  const saveDate = {
    curMonth,
    curDate,
  };
  localStorage.setItem("curDay", JSON.stringify(saveDate));
};

const loadTimeStamp = () => {
  const loadedDate = JSON.parse(localStorage.getItem("curDay"));
  console.log(loadedDate);
  const curMonth = date.getMonth();
  const curDate = date.getDate();
  console.log(curMonth, curDate);
  if (curMonth === loadedDate.curMonth && curDate === loadedDate.curDate) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

const saveLocalStorage = () => {
  /**
   * Todo
   * 1. 값 받아오기 => linkShorten에서
   * 2. 로컬 스토리지에 저장하기.
   */
  localStorage.setItem("shortenUrl", JSON.stringify(savedLinks));
};
const loadLocalStorage = () => {
  /**
   * Todo
   * 1. 로컬 스토리지에 있는 데이터 불러오기.
   * 2. 데이터가 있으면 createShortenItem으로 아이템 만들어서 뿌리기
   * 주의 : 브라우저가 로딩될 때 한 번 실행할 것!
   */
  const loadedData = localStorage.getItem("shortenUrl");
  if (loadedData) {
    const parsedData = JSON.parse(loadedData);
    savedLinks = parsedData;
    parsedData.forEach((data) => {
      createShortenItem(data);
    });
  }
};

const handleCopyClick = (e) => {
  e.preventDefault();
  const copyUrl = e.target.previousSibling.textContent;
  // 클립보드에 복사하는 api
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
  shorten_span.textContent = shortenUrl.shorted_link;
  shorten_span.setAttribute("href", shortenUrl.shorted_link);
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
  const urlObj = {
    original_link: shortenUrl.result.original_link,
    shorted_link: shortenUrl.result.full_short_link2,
  };
  if (shortenUrl !== undefined) {
    savedLinks.push(urlObj);
    createShortenItem(urlObj);
    saveLocalStorage();
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

if (loadTimeStamp() === true) {
  loadLocalStorage();
} else {
  localStorage.removeItem("shortenUrl");
}

linkForm.addEventListener("submit", handleSubmitForm);
submitBtn.addEventListener("click", handleSubmitClick);

window.addEventListener("beforeunload", saveTimeStamp);
