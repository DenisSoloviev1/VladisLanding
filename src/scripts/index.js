import "../styles/index.scss"; // Главные стили
import "../styles/styles.scss"; // Дополнительные стили
import { UniversalGallery } from "./gallery";

//открытие меню
document.getElementById("burgerCheckbox").addEventListener("change", function() {
  const menu = document.querySelector(".menuContainer");
  menu.dataset.isShow = this.checked;
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.menuContainer a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("burgerCheckbox").checked = false;
    document.querySelector(".menuContainer").dataset.isShow = "false";
  });
});

//отслеживание начала анимации
document.addEventListener("DOMContentLoaded", function () {
  const animatableElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Добавляем класс animated при появлении в зоне видимости
          entry.target.classList.add("animated");

          // Отключаем наблюдение после анимации
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  animatableElements.forEach((element) => {
    observer.observe(element);
  });
});

//обработчик для галереи
document.addEventListener("DOMContentLoaded", () => {
  const photoGalleries = document.querySelectorAll(".scrollContainer");
  photoGalleries.forEach((gallery) => {
    new UniversalGallery(gallery, {
      scrollContainerClass: ".scrollMain",
      trackClass: ".scrollTrack",
      itemClass: ".galleryPhoto",
      prevBtnSelector: "#prev",
      nextBtnSelector: "#next",
      horizontal: true,
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cardGalleries = document.querySelectorAll(".cardGallery");

  cardGalleries.forEach((gallery) => {
    new UniversalGallery(gallery, {
      scrollContainerClass: ".cardScrollContainer",
      trackClass: ".cardTrack",
      itemClass: ".card",
      prevBtnSelector: "#prev",
      nextBtnSelector: "#next",
      horizontal: true,
    });
  });
});
