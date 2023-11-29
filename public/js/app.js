(function () {
  function startWidget() {
    // const fastMenuWidget = document.querySelector("fastmenu-widget");
    const fastMenuWidget = document.querySelector("fastmenu-widget");
    const subdomain = fastMenuWidget.getAttribute("subdomain");
    let currentFilter = "All";
    let groupedByFilter = null;
    let filters = null;
    let gs = null;
    let menu = null;

    function loadTailwindStylesheet() {
      const link = document.createElement("link");
      link.href =
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      link.rel = "stylesheet";

      document.head.appendChild(link);
    }

    function convertDriveLinkToDirect(link) {
      if (!link) {
        return link;
      }
      // Check if the link matches the Google Drive pattern
      const driveLinkRegex =
        /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing$/;
      const match = link.match(driveLinkRegex);

      if (match) {
        // If it's a match, construct the direct link
        const fileId = match[1];
        const directLink = `https://drive.google.com/uc?id=${fileId}`;
        return directLink;
      } else {
        // If it's not a match, return the original link
        return link;
      }
    }
    function groupBy(array, key) {
      return array.reduce((acc, item) => {
        const keyValue = item[key];
        acc[keyValue] = acc[keyValue] || [];
        acc[keyValue].push(item);
        return acc;
      }, {});
    }

    function debugMenu(gs, menu) {
      window.ss = function () {
        console.log("gs", gs);
        console.log("menu", menu);
      };
    }
    function updateFilter(filters) {
      generateFilters(null, filters);
      generateItems();
    }

    function createPill(label, active, clickHandler, filters) {
      const button = document.createElement("button");
      button.type = "button";
      button.classList.add(
        "px-4",
        "whitespace-nowrap",
        "py-2",
        "w-auto",
        "transition-shadow",
        "duration-200",
        "shadow-sm",
        "hover:shadow-md",
        "inline-flex",
        "justify-center",
        "items-center",
        "rounded-md",
        "text-base",
        "sm:text-sm",
        "font-medium",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500",
        "mr-2",
        "mb-2",
        active ? "bg-gray-900" : "bg-white",
        active ? "text-white" : "text-gray-600",
        active ? "hover:text-white" : "hover:text-gray-700"
      );
      button.textContent = label;
      button.addEventListener("click", () => {
        currentFilter = label;
        clickHandler(filters);
      });
      return button;
    }
    function generateFilters(filtersWrapper, filters) {
      if (!filtersWrapper) {
        filtersWrapper = document.getElementById("fastmenu-filters");
        filtersWrapper.innerHTML = "";
      }

      if (filters && filters.length > 1) {
        const filtersDiv = document.createElement("div");
        filtersDiv.classList.add(
          "filters-div",
          "filters",
          "flex",
          "flex-nowrap",
          "overflow-y-auto",
          "py-2",
          "px-2",
          "mb-2",
          "sm:flex-wrap"
        );

        const pillAll = createPill(
          "All",
          currentFilter === "All",
          updateFilter,
          filters
        );
        filtersDiv.appendChild(pillAll);

        filters.forEach((filter) => {
          const pill = createPill(
            filter,
            currentFilter === filter,
            updateFilter,
            filters
          );
          filtersDiv.appendChild(pill);
        });

        filtersWrapper.appendChild(filtersDiv);
      }
    }
    function generateItems(itemsWrapper) {
      if (!itemsWrapper) {
        itemsWrapper = document.getElementById("fastmenu-items");
        itemsWrapper.innerHTML = "";
      }

      if (currentFilter === "All") {
        menu.forEach((item, idx) => {
          createCard(item, gs, idx, itemsWrapper);
        });
      } else {
        groupedByFilter[currentFilter].forEach((item, idx) => {
          createCard(item, gs, idx, itemsWrapper);
        });
      }
    }
    function createCard(item, gs, idx, itemsWrapper) {
      function handleAddItem(item) {
        console.log("item added", item);
      }

      const imageLink = convertDriveLinkToDirect(item[gs.card.image]);

      const cardContainer = document.createElement("div");
      cardContainer.className =
        "card w-full  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-8 md:mb-4";
      cardContainer.innerHTML = `
              <div class="content-card overflow-hidden bg-white rounded shadow flex flex-grow flex-col text-gray-800 text-left h-full">
                ${
                  imageLink
                    ? `
                  <div class="relative w-full pb-[100%] bg-gray-300" style="padding-bottom: 100%;">
                    <img alt="Item Image" class="object-cover absolute h-full w-full inset-0" src="${imageLink}" lazy="loaded"/>
                  </div>`
                    : ""
                }
                <div class="h-full p-4 flex flex-col justify-between">
                  <div>
                    ${
                      item[gs.card.title]
                        ? `<p class="title font-semibold text-2xl">${
                            item[gs.card.title]
                          }</p>`
                        : ""
                    }
                    ${
                      item[gs.card.description]
                        ? `<p class="description text-base text-gray-700">${
                            item[gs.card.description]
                          }</p>`
                        : ""
                    }
                  </div>
                  <div class="caption-and-custom-fields">
                    ${
                      gs.card.caption
                        ? `<p class="caption text-gray-600 text-sm ${
                            item[gs.card.title] ||
                            item[gs.card.description]
                              ? "mt-4"
                              : ""
                          }">${item[gs.card.caption]}</p>`
                        : ""
                    }
                    ${
                      gs.card.customFields.length > 0 &&
                      gs.card.customFields.split(",").length > 0
                        ? `
                      <ul class="${
                        item[gs.card.title] ||
                        item[gs.card.description] ||
                        item[gs.card.caption]
                          ? "mt-4"
                          : ""
                      }">
                        ${gs.card.customFields
                          .split(",")
                          .map((cf) => {
                            if (!item[cf]) {
                              return "";
                            }
                            return `
                            <li class="${cf} custom-field flex justify-between">
                              <span class="font-bold">${cf}</span>
                              <span class="text-right">${item[cf]}${
                              cf === "Price" ? item.Currency : ""
                            }</span>
                            </li>`;
                          })
                          .join("")}
                      </ul>`
                        : ""
                    }
                    ${gs.card.buttonAction === "no action" ? "" : ""}
                    ${
                      gs.card.buttonAction === "cart" &&
                      gs.ordersEnabled
                        ? `
                      <button id='item-button-${idx}' class="w-full mt-4 bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none" style="background-color: ${gs.card.buttonBgColor}; color: ${gs.card.buttonTextColor};">
                        ${gs.card.buttonText}
                      </button>`
                        : ""
                    }
                    ${
                      gs.card.buttonAction === "link"
                        ? `
                      <a target="_blank" href="${
                        item[gs.card.buttonLink]
                      }" class="w-full mt-4 block cursor-pointer bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none" style="background-color: ${
                            gs.card.buttonBgColor
                          }; color: ${gs.card.buttonTextColor};">
                        ${gs.card.buttonText}
                      </a>`
                        : ""
                    }
                  </div>
                </div>
              </div>
            `;

      itemsWrapper.appendChild(cardContainer);

      const button = document.getElementById("item-button-" + idx);
      if (button) {
        button.addEventListener("click", () => {
          handleAddItem(item);
        });
      }
      // console.log("itemsWrapper", itemsWrapper);
    }

    function createMenuStructure({ gs, menu }) {
      const container = document.createElement("div");
      container.classList.add(
        "min-h-full",
        "pt-4",
        "max-w-full",
        "overflow-hidden"
      );
      container.style.backgroundColor = gs.theme.backgroundColor;

      const mainDiv = document.createElement("div");
      mainDiv.id = "fastmenu-main-container";
      mainDiv.classList.add(
        "main",
        "w-[90%]",
        "mx-auto",
        "sm:w-full"
      );

      groupedByFilter = groupBy(menu, gs.card.filterBy);
      filters = Object.keys(groupedByFilter);

      const filtersDiv = document.createElement("div");
      filtersDiv.id = "fastmenu-filters";
      mainDiv.appendChild(filtersDiv);

      const itemsDiv = document.createElement("div");
      itemsDiv.id = "fastmenu-items";
      itemsDiv.classList.add("items", "flex", "flex-wrap");

      mainDiv.appendChild(itemsDiv);
      container.appendChild(mainDiv);

      return container;
    }

    function loadMenu(subdomain) {
      // before load show loading
      fastMenuWidget.innerHTML =
        "<div id='fastmenu-loading'>Loading</div>";

      fetch("http://localhost:8000/menu?subdomain=" + subdomain)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(function (data) {
          console.log("data", data);
          menu = data.menuItems;
          gs = data.globalSettings;

          // Call the effect manually
          debugMenu(gs, menu);
          fastMenuWidget.appendChild(
            createMenuStructure({ gs, menu })
          );
          generateFilters(null, filters);
          generateItems(null);
        })
        .finally(() => {
          const fastmenuLoader = document.getElementById(
            "fastmenu-loading"
          );
          fastmenuLoader.remove();
        });
      //   .catch(function (err) {
      //     console.log("Loading menu", err);
      //     fastMenuWidget.innerHTML = "<div>Error happened</div>";
      //   });
    }

    loadTailwindStylesheet();
    loadMenu(subdomain);

    // Create an instance of LoadMenuWidget

    console.log("fastMenuWidget", subdomain);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const intervalRef = setInterval(() => {
      const fastMenuWidget =
        document.querySelector("fastmenu-widget");

      if (!fastMenuWidget) {
        console.log("nema widget");
      } else {
        console.log("ima widget");
        startWidget();
        clearInterval(intervalRef);
      }
    }, 500);
  });
})();
