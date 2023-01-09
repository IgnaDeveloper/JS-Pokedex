const d = document;
const moon = "🌙",
  sun = "☀️";

export default function darkTheme(btn, classDark) {
  const $themeBtn = d.querySelector(btn),
    $body = d.querySelector("body"),
    $header = d.querySelector("header");

  const lightMode = () => {
      $themeBtn.textContent = moon;
      $body.classList.remove(classDark);
      $header.classList.remove(classDark);
    },
    darkMode = () => {
      $themeBtn.textContent = sun;
      $body.classList.add(classDark);
      $header.classList.add(classDark);
    };

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if ($themeBtn.textContent === moon) {
        darkMode();
      } else {
        lightMode();
      }
    }
  });
}
