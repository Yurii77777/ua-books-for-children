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
            countryCities: [],
        },
        {
            countryTitleUa: "Польша",
            countryTitleEng: "Poland",
            countryTitleDe: "Polen",
            countryCities: [],
        },
        {
            countryTitleUa: "Німеччина",
            countryTitleEng: "Germany",
            countryTitleDe: "Deutschland",
            countryCities: [],
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

const createFilterListNode = (options) => {
    const { parentClass, childClass, data } = options;

    let nodeString = null;

    const list = document.createElement("ul");
    list.classList.add(parentClass);

    const countriesList = getCounries(addresses);
    const isCountries = !!countriesList.length;
    !isCountries && console.log("Список країн пустий ...");

    if (isCountries) {
        const selectedLanguage = getActiveLanguage($languages);

        for (let i = 0; i < countriesList.length; i++) {
            const { countryTitleUa, countryTitleEng, countryTitleDe } =
                countriesList[i];

            const countryItem = document.createElement("li");
            countryItem.classList.add(childClass);

            const spanUa = document.createElement("span");
            spanUa.setAttribute("data-lang", "ua");
            selectedLanguage === "ua" && spanUa.classList.add("active");
            spanUa.append(countryTitleUa);
            countryItem.append(spanUa);

            const spanEng = document.createElement("span");
            spanEng.setAttribute("data-lang", "eng");
            selectedLanguage === "eng" && spanEng.classList.add("active");
            spanEng.append(countryTitleEng);
            countryItem.append(spanEng);

            const spanDe = document.createElement("span");
            spanDe.setAttribute("data-lang", "de");
            selectedLanguage === "de" && spanDe.classList.add("active");
            spanDe.append(countryTitleDe);
            countryItem.append(spanDe);

            list.append(countryItem);
        }

        nodeString = list;
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
    }

    return result;
};

// Отримати обраний пункт зі списку
const getSelectedFilterItem = (options) => {
    const { event, isCountryItemSelected, isCountrySubItemSelected } = options;
    let result = {
        titleUa: null,
        titleEng: null,
        titleDe: null,
    };

    if (isCountryItemSelected) {
        result.titleUa = event.target.children[0].textContent;
        result.titleEng = event.target.children[1].textContent;
        result.titleDe = event.target.children[2].textContent;
    } else if (isCountrySubItemSelected) {
        result.titleUa = event.target.parentElement.children[0].textContent;
        result.titleEng = event.target.parentElement.children[1].textContent;
        result.titleDe = event.target.parentElement.children[2].textContent;
    }

    return result;
};

// Встановити фільтр за країнами
const setFilterByContry = (e) => {
    setIsFilterActice();
    const { isCountryList, isRegionList, isCityList } = isFilterListExist({
        country: true,
    });

    const isCountryItemSelected =
        e.target.className === "addresses__country-filter-item";

    const isCountrySubItemSelected =
        e.target.parentElement.className === "addresses__country-filter-item";

    if (!isCountryList) {
        const countryFilterNode = createFilterListNode({
            parentClass: "addresses__country-filter-list",
            childClass: "addresses__country-filter-item",
            data: addresses,
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

    if (isCountryItemSelected || isCountrySubItemSelected) {
        const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
            event: e,
            isCountryItemSelected,
            isCountrySubItemSelected,
        });

        filterByCountry.children[0].textContent = titleUa;
        filterByCountry.children[1].textContent = titleEng;
        filterByCountry.children[2].textContent = titleDe;
    }
};

const setFilterByRegion = () => {
    setIsFilterActice();
    console.log("Set filter by Region");
};

const setFilterByCity = () => {
    setIsFilterActice();
    console.log("Set filter by City");
};

filterByCountry.addEventListener("click", (e) => setFilterByContry(e));
filterByRegion.addEventListener("click", (e) => setFilterByRegion());
filterByCity.addEventListener("click", (e) => setFilterByCity());
