const navBtn = document.querySelector("#header__nav_btn");

const handleNavBtnClick = () => {
  const nav = document.querySelector("#header__nav");
  nav.classList.toggle("active");
};

navBtn.addEventListener("click", handleNavBtnClick);
