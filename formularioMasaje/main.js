function addIconsEvents(wrapper) {
  const icons = document.querySelectorAll("i.bi.bi-heart, i.bi.bi-star");
  for (const icon of icons) {
    icon.addEventListener("click", (e) => {
      const target = e.target;
      const classToChange = [...target.classList].find((e) =>
        e.startsWith("bi-")
      );
      const newClass = classToChange.endsWith("-fill")
        ? classToChange.replace("-fill", "")
        : classToChange + "-fill";
      target.classList.remove(classToChange);
      target.classList.add(newClass);
    });
  }
}

class PositionCard {
  constructor(data, i) {
    this.data = data;
    this.index = parseInt(i) + 1;
    this.wrapper = document.getElementById("position-card-wrapper");

    this.bestPositions = {
      "doggy style": {
        male: 29,
        female: 20,
      },
      cowgirl: {
        male: 22,
        female: 23,
      },
      missionary: {
        male: 19,
        female: 28,
      },
      "prone bone": {
        male: 9,
        female: 9,
      },
      "position 69": {
        male: 9,
        female: 9,
      },
    };

    this.printPosition();
  }

  printPosition() {
    const { url, name } = this.data;
    const bestPositionFooter = this.getBestPositionFooter(name);
    // @TODO -> Cambiar 'src' de la propiedad de la imagen por la constante 'url'
    const template = /* html */ `
			<div id="position-card-${this.index}" class="card ${
      bestPositionFooter != "" ? "border-primary" : ""
    } mw-200 shadow-sm">
        <div class="card-body ${
          bestPositionFooter ? "border-primary" : ""
        } d-flex flex-column">
            <p class="mb-2 text-center fw-semibold">${this.index}. ${name}</p>
            <img class="m-auto position-img" width="150" src="./img/prueba.png" alt="${name}" />
            <div class="d-flex justify-content-between px-3 mt-1">
              <i class="bi bi-heart text-danger cursor-pointer"></i> 
              <i class="bi bi-star text-warning cursor-pointer"></i> 
            </div>
        </div>
        ${bestPositionFooter}
			</div>
		`;
    this.wrapper.insertAdjacentHTML("beforeend", template);
    // this.addIconsEvents(
    //   this.wrapper.querySelector(`#position-card-${this.index}`)
    // );
  }

  getBestPositionFooter(name) {
    const isBestPosition = Object.keys(this.bestPositions).find((e) => {
      if (name.toLowerCase().includes(e)) {
        return e;
      }
    });
    let bestPositionFooter = "";
    if (isBestPosition) {
      const positionData = this.bestPositions[isBestPosition];
      bestPositionFooter = /* html */ `
        <div class="card-footer text-body-secondary d-flex justify-content-around py-1 fw-bold">
          <span class="female-color">
            ${positionData.female} %
            <i class="bi bi-gender-female"></i>
          </span>
          <span class="male-color">
            ${positionData.male} %
            <i class="bi bi-gender-male"></i>
          </span>
        </div>
		  `;
    }
    return bestPositionFooter;
  }
}

class CategoryListCheck {
  constructor(name, options) {
    this.name = name;
    this.options = options;

    this.wrapper = document.getElementById("categories-card-wrapper");

    this.printCategoryList();
  }

  printCategoryList() {
    const categoryOptionsList = this.getCategoriesOptionsList();
    const template = /* html */ `
      <div class="limelight-regular text-primary-emphasis">${this.name}</div>
      <ul class="list-group mb-3">
        ${categoryOptionsList}
      </ul>
    `;
    this.wrapper.insertAdjacentHTML("beforeend", template);
    // this.addIconsEvents(
    //   this.wrapper.querySelector(`#position-card-${this.index}`)
    // );
  }

  getCategoriesOptionsList() {
    const listItems = this.options.map((e, i) => {
      const template = /* html */ `
        <li class="list-group-item d-flex justify-content-between">
          <span class="flc">
            ${e.name}
          </span>
          <div class="d-flex gap-2">
            <i class="bi bi-heart text-danger cursor-pointer"></i> 
            <i class="bi bi-star text-warning cursor-pointer"></i> 
          </div>
        </li>
      `;
      return template;
    });
    return listItems.join("");
  }
}

class SexyZarikOptionList {
  constructor() {
    this.list = document.getElementById("zarik-list");
    this.options = this.list.querySelectorAll(".zarik-list-option");

    this.addClickEvent();
  }

  addClickEvent() {
    this.options.forEach((e) => {
      e.addEventListener("click", (ev) => {
        const icon = ev.currentTarget.querySelector("i");
        const iconClass =
          icon.classList[1] == "bi-square"
            ? "bi bi-check-square-fill text-primary"
            : "bi bi-square";
        icon.setAttribute("class", iconClass);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayRangeValue();
  enableTooltips();

  const positionCardList = [];
  const categoryListCheckList = [];

  for (const [i, position] of Object.entries(posistionData)) {
    positionCardList.push(new PositionCard(position, i));
  }
  for (const [name, options] of Object.entries(categoriesData)) {
    categoryListCheckList.push(new CategoryListCheck(name, options));
  }
  new SexyZarikOptionList();

  addIconsEvents();

  const resultModal = new bootstrap.Modal("#dialogResult", {});

  const form = document.getElementById("masajeForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let payload = {};
    payload.valoracionMasaje = parseInt(
      document.getElementById("valoracionGeneral").value
    );
    payload.valoracionMasajeTexto = document.getElementById(
      "valoracionMasajista"
    ).value;
    payload.positions = positionCardList
      .filter((pc) => {
        const card = pc.wrapper.querySelector(`#position-card-${pc.index}`);
        return (
          card.querySelector(".bi-heart-fill") ||
          card.querySelector(".bi-star-fill")
        );
      })
      .map((pc) => {
        const name = pc.data.name;
        const heart = !!pc.wrapper
          .querySelector(`#position-card-${pc.index}`)
          .querySelector(".bi-heart-fill");
        const star = !!pc.wrapper
          .querySelector(`#position-card-${pc.index}`)
          .querySelector(".bi-star-fill");
        return { name, heart, star };
      });
    const categoryListItems = [
      ...document.querySelectorAll(".list-group-item"),
    ].filter((lgi) => {
      return (
        lgi.querySelector(".bi-heart-fill") ||
        lgi.querySelector(".bi-star-fill")
      );
    });
    payload.categories = categoryListItems.map((cli) => {
      const name = cli.querySelector(".flc").innerText.trim();
      const heart = !!cli.querySelector(".bi-heart-fill");
      const star = !!cli.querySelector(".bi-star-fill");
      return { name, heart, star };
    });

    const zarikList = [...document.querySelectorAll(".zarik-list-option")]
      .filter((zlp) => {
        return !!zlp.querySelector(".bi-check-square-fill");
      })
      .map((zlp) => zlp.innerText.trim());
    payload.zarikList = zarikList;
    payload.mejorExperiencia =
      document.getElementById("mejorExperiencia").value;
    payload.peticion = document.getElementById("peticion").value;

    document.getElementById("resultText").innerText = JSON.stringify(
      payload,
      null,
      2
    );
    resultModal.show();
  });

  document.getElementById("copyResult").addEventListener("click", (e) => {
    const content = document.getElementById("resultText").innerText;
    navigator.clipboard.writeText(content);
    resultModal.hide();
    alert(
      "¡Respuesta copiada!, ahora puedes mandarsela a Давідка por WhatsApp 💙"
    );
  });
});

function displayRangeValue() {
  const rangeValueShow = document.getElementById("range-value");
  const range = document.getElementById("valoracionGeneral");
  range.addEventListener("input", (e) => {
    const value = e.target.value;
    rangeValueShow.innerText = value;
  });
}

function enableTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}
