/**
 * Reset basic CSS styles v.1.0.0
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2021> <Yurii Andriiko>
 * http://yurets.info/
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */

"use strict";

/**
 * Фукція проходить по всьому DOM-дереву, шукає data-атрибут "lang"
 * видаляє та додає клас "active" в залежності від вибраної мови
 * The function runs throughout the DOM-tree, looking for the data attribute "lang"
 * removes and adds the "active" class depending on the selected language
 * Фукция проходит по всему DOM-дереву, ищет data-атрибут "lang"
 * удаляет и добавляет класс "active" в зависимости от выбранного языка
 * @param {HTMLNode} parentElement
 * @param {String} language
 */
const setLanguage = (parentElement, language) => {
    const nodeIterator = parentElement.createNodeIterator(
        document,
        NodeFilter.SHOW_ELEMENT,
        null
    );

    let child = null;

    while ((child = nodeIterator.nextNode()) !== null) {
        if (child.dataset.lang) {
            child.classList.contains("active") &&
                child.classList.remove("active");
            child.dataset.lang === language && child.classList.add("active");
        }
    }
};

const handleRemoveClassName = (options) => {
    const { node, className } = options;

    for (let i = 0; i < node.length; i++) {
        node[i].classList.contains(className) &&
            node[i].classList.remove(className);
    }
};

/**
 * Вибір мови
 * Handler for language select
 */
const $languages = document.querySelectorAll(".header__languages");

$languages[0].addEventListener("click", (e) => {
    e.stopPropagation();

    const userClick = e.target;
    const langaugesList = Array.from($languages[0].children);
    const selectedLanguageIndex = langaugesList.indexOf(userClick);

    if (selectedLanguageIndex === 0) {
        handleRemoveClassName({ node: langaugesList, className: "active" });
        langaugesList[selectedLanguageIndex].classList.add("active");

        setLanguage(document, "ua");
    } else if (selectedLanguageIndex === 1) {
        handleRemoveClassName({ node: langaugesList, className: "active" });
        langaugesList[selectedLanguageIndex].classList.add("active");

        setLanguage(document, "eng");
    } else if (selectedLanguageIndex === 2) {
        handleRemoveClassName({ node: langaugesList, className: "active" });
        langaugesList[selectedLanguageIndex].classList.add("active");

        setLanguage(document, "de");
    }
});

// Прокрутка до блоку з контактами (Footer)
const $getContactsButton = document.querySelectorAll(".donation__contact");
const $footer = document.getElementById("footer");

$getContactsButton[0].addEventListener("click", (e) => {
    e.stopPropagation();

    $footer.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Логіка зони фільтрів в секції Адреса (addresses)
const addresses = {
    countries: [
        {
            countryTitleUa: "Україна",
            countryTitleEng: "Ukraine",
            countryTitleDe: "Ukraine",
            countryRegions: [
                {
                    regionTitleUa: "Київський",
                    regionTitleEng: "Kyivskyi",
                    regionTitleDe: "Kyivskyi",
                    regionCities: [
                        {
                            cityTitleUa: "Київ",
                            cityTitleEng: "Kyiv",
                            cityTitleDe: "Kiew",
                            cityAddresses: [],
                        },
                        {
                            cityTitleUa: "Бровари",
                            cityTitleEng: "Breweries",
                            cityTitleDe: "Brauereien",
                            cityAddresses: [],
                        },
                    ],
                },
                {
                    regionTitleUa: "Харківський",
                    regionTitleEng: "Kharkiv",
                    regionTitleDe: "Charkiw",
                    regionCities: [],
                },
                {
                    regionTitleUa: "Львівський",
                    regionTitleEng: "Lviv",
                    regionTitleDe: "Lemberg",
                    regionCities: [],
                },
            ],
        },
        {
            countryTitleUa: "Польша",
            countryTitleEng: "Poland",
            countryTitleDe: "Polen",
            countryRegions: [],
        },
        {
            countryTitleUa: "Німеччина",
            countryTitleEng: "Germany",
            countryTitleDe: "Deutschland",
            countryRegions: [],
        },
    ],
};

let filterByCountry = null;
let filterByRegion = null;
let filterByCity = null;
let isFilterActive = false;

const $filterList = document.querySelectorAll(".addresses__filter-list");
const filterList = Array.from($filterList[0].children);

for (let i = 0; i < filterList.length; i++) {
    i === 0 && (filterByCountry = filterList[i]);
    i === 1 && (filterByRegion = filterList[i]);
    i === 2 && (filterByCity = filterList[i]);
}

// Тумблер вмикає / вимикає "прапор" активності будь-якого списку фільтрів
const setIsFilterActice = () => {
    isFilterActive ? (isFilterActive = false) : (isFilterActive = true);
};

// Отримати активну мову
const getActiveLanguage = (languageNode) => {
    let result = null;
    const languagesList = Array.from(languageNode[0].children);

    for (let i = 0; i < languagesList.length; i++) {
        i === 0 &&
            languagesList[i].classList.contains("active") &&
            (result = "ua");
        i === 1 &&
            languagesList[i].classList.contains("active") &&
            (result = "eng");
        i === 2 &&
            languagesList[i].classList.contains("active") &&
            (result = "de");
    }

    return result;
};

// Отримати та підготувати список країн із БД
const getCounries = (data) => {
    let result = [];

    const countries = data?.countries;
    !countries &&
        console.log("Упс... десь пропав список країн, ключ countries");

    const isCountiesList = !!countries.length;

    if (isCountiesList) {
        for (let i = 0; i < countries.length; i++) {
            let dataObj = {};
            const { countryTitleUa, countryTitleEng, countryTitleDe } =
                countries[i];

            dataObj["countryTitleUa"] = countryTitleUa;
            dataObj["countryTitleEng"] = countryTitleEng;
            dataObj["countryTitleDe"] = countryTitleDe;

            result.push(dataObj);
        }
    }

    return result;
};

// Отримати та підготувати список регіонів обраної країни
const getRegions = (data) => {
    let result = [];

    const isCountrySelected =
        filterByCountry.children[0].textContent !== "Країна";

    if (!isCountrySelected) {
        const selectedLanguage = getActiveLanguage($languages);

        if (selectedLanguage === "ua") {
            filterByRegion.children[0].textContent = "Виберіть країну!";
            filterByRegion.children[0].style.color = "red";

            setTimeout(() => {
                filterByRegion.children[0].textContent = "Регіон";
                filterByRegion.children[0].style.color = "#000";
            }, 2000);
        } else if (selectedLanguage === "eng") {
            filterByRegion.children[1].textContent = "Choose a country!";
            filterByRegion.children[1].style.color = "red";

            setTimeout(() => {
                filterByRegion.children[1].textContent = "Region";
                filterByRegion.children[1].style.color = "#000";
            }, 2000);
        } else if (selectedLanguage === "de") {
            filterByRegion.children[2].textContent = "Wähle ein Land!";
            filterByRegion.children[2].style.color = "red";

            setTimeout(() => {
                filterByRegion.children[2].textContent = "Region";
                filterByRegion.children[2].style.color = "#000";
            }, 2000);
        }
    } else if (isCountrySelected) {
        const selectedCountryTitleUa = filterByCountry.children[0].textContent;

        // Явну перевірку чи є список країн не виконую
        // оскільки якщо користувач потрапив в даний блок,
        // то цю перевірку він вже "пройшов"
        const countries = data?.countries;

        for (let i = 0; i < countries.length; i++) {
            const countryItem = countries[i];
            const { countryTitleUa } = countryItem;

            if (countryTitleUa === selectedCountryTitleUa) {
                const countryRegions = countryItem?.countryRegions;

                for (let k = 0; k < countryRegions.length; k++) {
                    let dataObj = {};
                    const { regionTitleUa, regionTitleEng, regionTitleDe } =
                        countryRegions[k];

                    dataObj["regionTitleUa"] = regionTitleUa;
                    dataObj["regionTitleEng"] = regionTitleEng;
                    dataObj["regionTitleDe"] = regionTitleDe;

                    result.push(dataObj);
                }
            }
        }
    }

    return result;
};

const getCities = (data) => {
    let result = [];

    const isRegionSelected =
        filterByRegion.children[0].textContent !== "Регіон";

    if (!isRegionSelected) {
        const selectedLanguage = getActiveLanguage($languages);

        if (selectedLanguage === "ua") {
            filterByCity.children[0].textContent = "Виберіть регіон!";
            filterByCity.children[0].style.color = "red";

            setTimeout(() => {
                filterByCity.children[0].textContent = "Місто";
                filterByCity.children[0].style.color = "#000";
            }, 2000);
        } else if (selectedLanguage === "eng") {
            filterByCity.children[1].textContent = "Choose a region!";
            filterByCity.children[1].style.color = "red";

            setTimeout(() => {
                filterByCity.children[1].textContent = "City";
                filterByCity.children[1].style.color = "#000";
            }, 2000);
        } else if (selectedLanguage === "de") {
            filterByCity.children[2].textContent =
                "Wählen Sie eine Region aus!";
            filterByCity.children[2].style.color = "red";

            setTimeout(() => {
                filterByCity.children[2].textContent = "Stadt";
                filterByCity.children[2].style.color = "#000";
            }, 2000);
        }
    } else if (isRegionSelected) {
        const selectedCountryTitleUa = filterByCountry.children[0].textContent;
        const selectedRegionTitleUa = filterByRegion.children[0].textContent;
        const countries = data?.countries;

        for (let i = 0; i < countries.length; i++) {
            const countryItem = countries[i];
            const { countryTitleUa } = countryItem;

            if (countryTitleUa === selectedCountryTitleUa) {
                const countryRegions = countryItem?.countryRegions;

                for (let k = 0; k < countryRegions.length; k++) {
                    const regionItem = countryRegions[k];
                    const { regionTitleUa } = regionItem;

                    if (regionTitleUa === selectedRegionTitleUa) {
                        const regionCities = regionItem?.regionCities;

                        for (let j = 0; j < regionCities.length; j++) {
                            let dataObj = {};
                            const { cityTitleUa, cityTitleEng, cityTitleDe } =
                                regionCities[j];

                            dataObj["cityTitleUa"] = cityTitleUa;
                            dataObj["cityTitleEng"] = cityTitleEng;
                            dataObj["cityTitleDe"] = cityTitleDe;

                            result.push(dataObj);
                        }
                    }
                }
            }
        }
    }

    return result;
};

const createFilterListNode = (options) => {
    const { parentClass, childClass, data, variant } = options;

    let nodeString = null;

    const list = document.createElement("ul");
    list.classList.add(parentClass);

    const selectedLanguage = getActiveLanguage($languages);

    const createItemOfList = (options) => {
        const {
            childClass,
            selectedLanguage,
            itemTitleUa,
            itemTitleEng,
            itemTitleDe,
        } = options;

        const item = document.createElement("li");
        item.classList.add(childClass);

        const spanUa = document.createElement("span");
        spanUa.setAttribute("data-lang", "ua");
        selectedLanguage === "ua" && spanUa.classList.add("active");
        spanUa.append(itemTitleUa);
        item.append(spanUa);

        const spanEng = document.createElement("span");
        spanEng.setAttribute("data-lang", "eng");
        selectedLanguage === "eng" && spanEng.classList.add("active");
        spanEng.append(itemTitleEng);
        item.append(spanEng);

        const spanDe = document.createElement("span");
        spanDe.setAttribute("data-lang", "de");
        selectedLanguage === "de" && spanDe.classList.add("active");
        spanDe.append(itemTitleDe);
        item.append(spanDe);

        return item;
    };

    if (variant === "country") {
        const countriesList = getCounries(data);
        const isCountries = !!countriesList.length;
        !isCountries && console.log("Список країн пустий ...");

        if (isCountries) {
            for (let i = 0; i < countriesList.length; i++) {
                const { countryTitleUa, countryTitleEng, countryTitleDe } =
                    countriesList[i];

                const item = createItemOfList({
                    childClass,
                    selectedLanguage,
                    itemTitleUa: countryTitleUa,
                    itemTitleEng: countryTitleEng,
                    itemTitleDe: countryTitleDe,
                });

                list.append(item);
            }

            nodeString = list;
        }
    } else if (variant === "region") {
        const regionsList = getRegions(data);
        const isRegions = !!regionsList.length;
        !isRegions && console.log("Список країн пустий ...");

        if (isRegions) {
            for (let i = 0; i < regionsList.length; i++) {
                const { regionTitleUa, regionTitleEng, regionTitleDe } =
                    regionsList[i];

                const item = createItemOfList({
                    childClass,
                    selectedLanguage,
                    itemTitleUa: regionTitleUa,
                    itemTitleEng: regionTitleEng,
                    itemTitleDe: regionTitleDe,
                });

                list.append(item);
            }

            nodeString = list;
        }
    } else if (variant === "city") {
        const citiesList = getCities(data);
        const isCities = !!citiesList.length;

        if (isCities) {
            for (let i = 0; i < citiesList.length; i++) {
                const { cityTitleUa, cityTitleEng, cityTitleDe } =
                    citiesList[i];

                const item = createItemOfList({
                    childClass,
                    selectedLanguage,
                    itemTitleUa: cityTitleUa,
                    itemTitleEng: cityTitleEng,
                    itemTitleDe: cityTitleDe,
                });

                list.append(item);
            }

            nodeString = list;
        }
    }

    return nodeString;
};

// Чи вже доданий список до фільтру
const isFilterListExist = (options) => {
    const { country, region, city } = options;
    let result = {
        isCountryList: null,
        isRegionList: null,
        isCityList: null,
    };

    if (country) {
        const contryChildren = Array.from(filterByCountry.children);

        for (let i = 0; i < contryChildren.length; i++) {
            const child = contryChildren[i];
            child.classList.contains("addresses__country-filter-list") &&
                (result.isCountryList = true);
        }
    } else if (region) {
        const regionChildren = Array.from(filterByRegion.children);

        for (let i = 0; i < regionChildren.length; i++) {
            const child = regionChildren[i];
            child.classList.contains("addresses__region-filter-list") &&
                (result.isRegionList = true);
        }
    } else if (city) {
        const cityChildren = Array.from(filterByCity.children);

        for (let i = 0; i < cityChildren.length; i++) {
            const child = cityChildren[i];
            child.classList.contains("addresses__city-filter-list") &&
                (result.isCityList = true);
        }
    }

    return result;
};

// Отримати обраний пункт зі списку
const getSelectedFilterItem = (options) => {
    const { event, isItemSelected, isSubItemSelected } = options;
    let result = {
        titleUa: null,
        titleEng: null,
        titleDe: null,
    };

    if (isItemSelected) {
        result.titleUa = event.target.children[0].textContent;
        result.titleEng = event.target.children[1].textContent;
        result.titleDe = event.target.children[2].textContent;
    } else if (isSubItemSelected) {
        result.titleUa = event.target.parentElement.children[0].textContent;
        result.titleEng = event.target.parentElement.children[1].textContent;
        result.titleDe = event.target.parentElement.children[2].textContent;
    }

    return result;
};

// Встановити фільтр за країнами
const setFilterByCountry = (e) => {
    setIsFilterActice();
    const { isCountryList } = isFilterListExist({
        country: true,
    });
    const { isRegionList } = isFilterListExist({
        region: true,
    });

    if (isRegionList) {
        const regionsList = document.querySelectorAll(
            ".addresses__region-filter-list"
        );
        regionsList[0].remove();
        filterByRegion.children[0].textContent = "Регіон";
        filterByRegion.children[1].textContent = "Region";
        filterByRegion.children[2].textContent = "Region";
    }

    if (!isCountryList) {
        const countryFilterNode = createFilterListNode({
            parentClass: "addresses__country-filter-list",
            childClass: "addresses__country-filter-item",
            data: addresses,
            variant: "country",
        });
        countryFilterNode && filterByCountry.append(countryFilterNode);
        const countriesList = document.querySelectorAll(
            ".addresses__country-filter-list"
        );
        countriesList[0].classList.add("active");
    } else if (isCountryList && !isFilterActive) {
        const countriesList = document.querySelectorAll(
            ".addresses__country-filter-list"
        );
        countriesList[0].classList.contains("active") &&
            countriesList[0].classList.remove("active");
    } else if (isCountryList && isFilterActive) {
        const countriesList = document.querySelectorAll(
            ".addresses__country-filter-list"
        );
        !countriesList[0].classList.contains("active") &&
            countriesList[0].classList.add("active");
    }

    const isItemSelected =
        e.target.className === "addresses__country-filter-item";

    const isSubItemSelected =
        e.target.parentElement.className === "addresses__country-filter-item";

    if (isItemSelected || isSubItemSelected) {
        const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
            event: e,
            isItemSelected,
            isSubItemSelected,
        });

        filterByCountry.children[0].textContent = titleUa;
        filterByCountry.children[1].textContent = titleEng;
        filterByCountry.children[2].textContent = titleDe;
    }
};

const setFilterByRegion = (e) => {
    setIsFilterActice();

    const { isRegionList } = isFilterListExist({
        region: true,
    });
    const { isCityList } = isFilterListExist({
        city: true,
    });

    if (isCityList) {
        const citiesList = document.querySelectorAll(
            ".addresses__city-filter-list"
        );
        citiesList[0].remove();
        filterByCity.children[0].textContent = "Місто";
        filterByCity.children[1].textContent = "City";
        filterByCity.children[2].textContent = "Stadt";
    }

    if (!isRegionList) {
        const regionFilterNode = createFilterListNode({
            parentClass: "addresses__region-filter-list",
            childClass: "addresses__region-filter-item",
            data: addresses,
            variant: "region",
        });
        regionFilterNode && filterByRegion.append(regionFilterNode);
        const regionsList = document.querySelectorAll(
            ".addresses__region-filter-list"
        );
        regionsList[0]?.classList.add("active");
    } else if (isRegionList && !isFilterActive) {
        const regionsList = document.querySelectorAll(
            ".addresses__region-filter-list"
        );
        regionsList[0].classList.contains("active") &&
            regionsList[0].classList.remove("active");
    } else if (isRegionList && isFilterActive) {
        const regionsList = document.querySelectorAll(
            ".addresses__region-filter-list"
        );
        !regionsList[0].classList.contains("active") &&
            regionsList[0].classList.add("active");
    }

    const isItemSelected =
        e.target.className === "addresses__region-filter-item";

    const isSubItemSelected =
        e.target.parentElement.className === "addresses__region-filter-item";

    if (isItemSelected || isSubItemSelected) {
        const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
            event: e,
            isItemSelected,
            isSubItemSelected,
        });

        filterByRegion.children[0].textContent = titleUa;
        filterByRegion.children[1].textContent = titleEng;
        filterByRegion.children[2].textContent = titleDe;
    }
};

const setFilterByCity = (e) => {
    setIsFilterActice();
    const { isCityList } = isFilterListExist({
        city: true,
    });

    if (!isCityList) {
        const cityFilterNode = createFilterListNode({
            parentClass: "addresses__city-filter-list",
            childClass: "addresses__city-filter-item",
            data: addresses,
            variant: "city",
        });
        cityFilterNode && filterByCity.append(cityFilterNode);
        const citiesList = document.querySelectorAll(
            ".addresses__city-filter-list"
        );
        citiesList[0]?.classList.add("active");
    } else if (isCityList && !isFilterActive) {
        const citiesList = document.querySelectorAll(
            ".addresses__city-filter-list"
        );
        citiesList[0].classList.contains("active") &&
            citiesList[0].classList.remove("active");
    } else if (isCityList && isFilterActive) {
        const citiesList = document.querySelectorAll(
            ".addresses__city-filter-list"
        );
        !citiesList[0].classList.contains("active") &&
            citiesList[0].classList.add("active");
    }

    const isItemSelected = e.target.className === "addresses__city-filter-item";

    const isSubItemSelected =
        e.target.parentElement.className === "addresses__city-filter-item";

    if (isItemSelected || isSubItemSelected) {
        const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
            event: e,
            isItemSelected,
            isSubItemSelected,
        });

        filterByCity.children[0].textContent = titleUa;
        filterByCity.children[1].textContent = titleEng;
        filterByCity.children[2].textContent = titleDe;
    }
};

filterByCountry.addEventListener("click", (e) => setFilterByCountry(e));
filterByRegion.addEventListener("click", (e) => setFilterByRegion(e));
filterByCity.addEventListener("click", (e) => setFilterByCity(e));
