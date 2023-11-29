!(function () {
  const t = document.querySelector("fastmenu-widget"),
    e = t.getAttribute("subdomain");
  let n = "All",
    o = null,
    l = null,
    i = null,
    d = null;
  function s(t) {
    a(null, t), r();
  }
  function c(t, e, o, l) {
    const i = document.createElement("button");
    return (
      (i.type = "button"),
      i.classList.add(
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
        e ? "bg-gray-900" : "bg-white",
        e ? "text-white" : "text-gray-600",
        e ? "hover:text-white" : "hover:text-gray-700"
      ),
      (i.textContent = t),
      i.addEventListener("click", () => {
        (n = t), o(l);
      }),
      i
    );
  }
  function a(t, e) {
    if (
      (t ||
        ((t = document.getElementById("fastmenu-filters")).innerHTML =
          ""),
      e && e.length > 1)
    ) {
      const o = document.createElement("div");
      o.classList.add(
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
      const l = c("All", "All" === n, s, e);
      o.appendChild(l),
        e.forEach((t) => {
          const l = c(t, n === t, s, e);
          o.appendChild(l);
        }),
        t.appendChild(o);
    }
  }
  function r(t) {
    t ||
      ((t = document.getElementById("fastmenu-items")).innerHTML =
        ""),
      "All" === n
        ? d.forEach((e, n) => {
            u(e, i, n, t);
          })
        : o[n].forEach((e, n) => {
            u(e, i, n, t);
          });
  }
  function u(t, e, n, o) {
    const l = (function (t) {
        if (!t) return t;
        const e = t.match(
          /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing$/
        );
        if (e) return `https://drive.google.com/uc?id=${e[1]}`;
        return t;
      })(t[e.card.image]),
      i = document.createElement("div");
    (i.className =
      "card w-full  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-8 md:mb-4"),
      (i.innerHTML = `\n      <div class="content-card overflow-hidden bg-white rounded shadow flex flex-grow flex-col text-gray-800 text-left h-full">\n        ${
        l
          ? `\n          <div class="relative w-full pb-[100%] bg-gray-300" style="padding-bottom: 100%;">\n            <img alt="Item Image" class="object-cover absolute h-full w-full inset-0" src="${l}" lazy="loaded"/>\n          </div>`
          : ""
      }\n        <div class="h-full p-4 flex flex-col justify-between">\n          <div>\n            ${
        t[e.card.title]
          ? `<p class="title font-semibold text-2xl">${
              t[e.card.title]
            }</p>`
          : ""
      }\n            ${
        t[e.card.description]
          ? `<p class="description text-base text-gray-700">${
              t[e.card.description]
            }</p>`
          : ""
      }\n          </div>\n          <div class="caption-and-custom-fields">\n            ${
        e.card.caption
          ? `<p class="caption text-gray-600 text-sm ${
              t[e.card.title] || t[e.card.description] ? "mt-4" : ""
            }">${t[e.card.caption]}</p>`
          : ""
      }\n            ${
        e.card.customFields.length > 0 &&
        e.card.customFields.split(",").length > 0
          ? `\n              <ul class="${
              t[e.card.title] ||
              t[e.card.description] ||
              t[e.card.caption]
                ? "mt-4"
                : ""
            }">\n                ${e.card.customFields
              .split(",")
              .map((e) =>
                t[e]
                  ? `\n                    <li class="${e} custom-field flex justify-between">\n                      <span class="font-bold">${e}</span>\n                      <span class="text-right">${
                      t[e]
                    }${
                      "Price" === e ? t.Currency : ""
                    }</span>\n                    </li>`
                  : ""
              )
              .join("")}\n              </ul>`
          : ""
      }\n            ${(e.card.buttonAction, "")}\n            ${
        "cart" === e.card.buttonAction && e.ordersEnabled
          ? `\n              <button id='item-button-${n}' class="w-full mt-4 bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none" style="background-color: ${e.card.buttonBgColor}; color: ${e.card.buttonTextColor};">\n                ${e.card.buttonText}\n              </button>`
          : ""
      }\n            ${
        "link" === e.card.buttonAction
          ? `\n              <a target="_blank" href="${
              t[e.card.buttonLink]
            }" class="w-full mt-4 block cursor-pointer bg-blue-500 hover:bg-blue-700 font-medium py-2 px-4 rounded text-center hover:shadow-md transition-shadow duration-300 focus:outline-none" style="background-color: ${
              e.card.buttonBgColor
            }; color: ${e.card.buttonTextColor};">\n                ${
              e.card.buttonText
            }\n              </a>`
          : ""
      }\n          </div>\n        </div>\n      </div>\n    `),
      o.appendChild(i);
    const d = document.getElementById("item-button-" + n);
    d &&
      d.addEventListener("click", () => {
        !(function (t) {
          console.log("item added", t);
        })(t);
      });
  }
  !(function () {
    const t = document.createElement("link");
    (t.href =
      "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"),
      (t.rel = "stylesheet"),
      document.head.appendChild(t);
  })(),
    (function (e) {
      (t.innerHTML = "<div id='fastmenu-loading'>Loading</div>"),
        fetch("http://localhost:8000/menu?subdomain=" + e)
          .then(function (t) {
            if (!t.ok) throw new Error("Network response was not ok");
            return t.json();
          })
          .then(function (e) {
            console.log("data", e),
              (d = e.menuItems),
              (function (t, e) {
                window.ss = function () {
                  console.log("gs", t), console.log("menu", e);
                };
              })((i = e.globalSettings), d),
              t.appendChild(
                (function ({ gs: t, menu: e }) {
                  const n = document.createElement("div");
                  n.classList.add(
                    "min-h-full",
                    "pt-4",
                    "max-w-full",
                    "overflow-hidden"
                  ),
                    (n.style.backgroundColor =
                      t.theme.backgroundColor);
                  const i = document.createElement("div");
                  var d, s;
                  (i.id = "fastmenu-main-container"),
                    i.classList.add(
                      "main",
                      "w-[90%]",
                      "mx-auto",
                      "sm:w-full"
                    ),
                    (d = e),
                    (s = t.card.filterBy),
                    (o = d.reduce((t, e) => {
                      const n = e[s];
                      return (t[n] = t[n] || []), t[n].push(e), t;
                    }, {})),
                    (l = Object.keys(o));
                  const c = document.createElement("div");
                  (c.id = "fastmenu-filters"), i.appendChild(c);
                  const a = document.createElement("div");
                  return (
                    (a.id = "fastmenu-items"),
                    a.classList.add("items", "flex", "flex-wrap"),
                    i.appendChild(a),
                    n.appendChild(i),
                    n
                  );
                })({ gs: i, menu: d })
              ),
              a(null, l),
              r(null);
          })
          .finally(() => {
            document.getElementById("fastmenu-loading").remove();
          });
    })(e),
    console.log("fastMenuWidget", e);
})();
