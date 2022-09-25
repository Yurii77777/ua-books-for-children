// /**
//  * Made by Yurets in UA!
//  * Copyright (c) GPL License <2021 - 2022> <Yurii Andriiko>
//  * http://yurets.info/
//  * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
//  * "Роби добре, та тільки добре! А можеш? - Роби краще!"
//  */

// "use strict";

// const handleRemoveClassName = (options) => {
//     const { node, className } = options;

//     for (let i = 0; i < node.length; i++) {
//         node[i].classList.contains(className) &&
//             node[i].classList.remove(className);
//     }
// };

// // Прокрутка до блоку з контактами (Footer)
// const $getContactsButton = document.querySelectorAll(".donation__contact");
// const $footer = document.getElementById("footer");

// $getContactsButton[0].addEventListener("click", (e) => {
//     e.stopPropagation();

//     $footer.scrollIntoView({ behavior: "smooth", block: "start" });
// });

// // Логіка зони фільтрів в секції Адреса (addresses)
// const addresses = {
//     countries: [
//         {
//             countryTitleUa: "Україна",
//             countryTitleEng: "Ukraine",
//             countryTitleDe: "Ukraine",
//             countryRegions: [
//                 {
//                     regionTitleUa: "Київський",
//                     regionTitleEng: "Kyivskyi",
//                     regionTitleDe: "Kyivskyi",
//                     regionCities: [
//                         {
//                             cityTitleUa: "Київ",
//                             cityTitleEng: "Kyiv",
//                             cityTitleDe: "Kiew",
//                             cityAddresses: [
//                                 {
//                                     addressTitleUa:
//                                         "вул. Олекси Тихого (Виборзька), буд. 55/13",
//                                     addressTitleEng:
//                                         "St. Oleksy Tyhoho (Vyborzka), bldg. 55/13",
//                                     addressTitleDe:
//                                         "St. Oleksy Tyhoho (Vyborzka), Geb. 55/13",
//                                     mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.619404032457!2d30.437986815731186!3d50.44818947947503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc2368662709%3A0x609e55c29c3b4020!2z0YPQuy4g0JDQu9C10LrRgdC10Y8g0KLQuNGF0L7Qs9C-LCA1NSwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1656661871443!5m2!1sru!2sua",
//                                     typeUa: "прийом та видача",
//                                     typeEng: "reception and delivery",
//                                     typeDe: "Empfang und Lieferung",
//                                     contacts: [
//                                         {
//                                             email: "child.help.book@gmail.com",
//                                         },
//                                         {
//                                             phone: "+38 044 209 53 02",
//                                         },
//                                         {
//                                             phone: "+38 098 306 84 84",
//                                         },
//                                         {
//                                             phone: "+38 098 683 85 21",
//                                         },
//                                         {
//                                             phone: "+38 063 499 37 69",
//                                         },
//                                     ],
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// };

// let filterByCountry = null;
// let filterByRegion = null;
// let filterByCity = null;
// let isFilterActive = false;

// const $filterList = document.querySelectorAll(".addresses__filter-list");
// const filterList = Array.from($filterList[0].children);

// for (let i = 0; i < filterList.length; i++) {
//     i === 0 && (filterByCountry = filterList[i]);
//     i === 1 && (filterByRegion = filterList[i]);
//     i === 2 && (filterByCity = filterList[i]);
// }

// // Тумблер вмикає / вимикає "прапор" активності будь-якого списку фільтрів
// const setIsFilterActice = () => {
//     isFilterActive ? (isFilterActive = false) : (isFilterActive = true);
// };

// // Отримати активну мову
// const getActiveLanguage = (languageNode) => {
//     let result = null;
//     const languagesList = Array.from(languageNode[0].children);

//     for (let i = 0; i < languagesList.length; i++) {
//         i === 0 &&
//             languagesList[i].classList.contains("active") &&
//             (result = "ua");
//         i === 1 &&
//             languagesList[i].classList.contains("active") &&
//             (result = "eng");
//         i === 2 &&
//             languagesList[i].classList.contains("active") &&
//             (result = "de");
//     }

//     return result;
// };

// // Отримати та підготувати список країн із БД
// const getCountries = (data) => {
//     let result = [];

//     const countries = data?.countries;
//     !countries &&
//         console.log("Упс... десь пропав список країн, ключ countries");

//     const isCountiesList = !!countries.length;

//     if (isCountiesList) {
//         for (let i = 0; i < countries.length; i++) {
//             let dataObj = {};
//             const { countryTitleUa, countryTitleEng, countryTitleDe } =
//                 countries[i];

//             dataObj["countryTitleUa"] = countryTitleUa;
//             dataObj["countryTitleEng"] = countryTitleEng;
//             dataObj["countryTitleDe"] = countryTitleDe;

//             result.push(dataObj);
//         }
//     }

//     return result;
// };

// // Отримати та підготувати список регіонів обраної країни
// const getRegions = (data) => {
//     let result = [];

//     const isCountrySelected =
//         filterByCountry.children[0].textContent !== "Країна";

//     if (!isCountrySelected) {
//         const selectedLanguage = getActiveLanguage($languages);

//         if (selectedLanguage === "ua") {
//             filterByRegion.children[0].textContent = "Виберіть країну!";
//             filterByRegion.children[0].style.color = "red";

//             setTimeout(() => {
//                 filterByRegion.children[0].textContent = "Регіон";
//                 filterByRegion.children[0].style.color = "#000";
//             }, 2000);
//         } else if (selectedLanguage === "eng") {
//             filterByRegion.children[1].textContent = "Choose a country!";
//             filterByRegion.children[1].style.color = "red";

//             setTimeout(() => {
//                 filterByRegion.children[1].textContent = "Region";
//                 filterByRegion.children[1].style.color = "#000";
//             }, 2000);
//         } else if (selectedLanguage === "de") {
//             filterByRegion.children[2].textContent = "Wähle ein Land!";
//             filterByRegion.children[2].style.color = "red";

//             setTimeout(() => {
//                 filterByRegion.children[2].textContent = "Region";
//                 filterByRegion.children[2].style.color = "#000";
//             }, 2000);
//         }
//     } else if (isCountrySelected) {
//         const selectedCountryTitleUa = filterByCountry.children[0].textContent;

//         // Явну перевірку чи є список країн не виконую
//         // оскільки якщо користувач потрапив в даний блок,
//         // то цю перевірку він вже "пройшов"
//         const countries = data?.countries;

//         for (let i = 0; i < countries.length; i++) {
//             const countryItem = countries[i];
//             const { countryTitleUa } = countryItem;

//             if (countryTitleUa === selectedCountryTitleUa) {
//                 const countryRegions = countryItem?.countryRegions;

//                 for (let k = 0; k < countryRegions.length; k++) {
//                     let dataObj = {};
//                     const { regionTitleUa, regionTitleEng, regionTitleDe } =
//                         countryRegions[k];

//                     dataObj["regionTitleUa"] = regionTitleUa;
//                     dataObj["regionTitleEng"] = regionTitleEng;
//                     dataObj["regionTitleDe"] = regionTitleDe;

//                     result.push(dataObj);
//                 }
//             }
//         }
//     }

//     return result;
// };

// const getCities = (data) => {
//     let result = [];

//     const isRegionSelected =
//         filterByRegion.children[0].textContent !== "Регіон";

//     if (!isRegionSelected) {
//         const selectedLanguage = getActiveLanguage($languages);

//         if (selectedLanguage === "ua") {
//             filterByCity.children[0].textContent = "Виберіть регіон!";
//             filterByCity.children[0].style.color = "red";

//             setTimeout(() => {
//                 filterByCity.children[0].textContent = "Місто";
//                 filterByCity.children[0].style.color = "#000";
//             }, 2000);
//         } else if (selectedLanguage === "eng") {
//             filterByCity.children[1].textContent = "Choose a region!";
//             filterByCity.children[1].style.color = "red";

//             setTimeout(() => {
//                 filterByCity.children[1].textContent = "City";
//                 filterByCity.children[1].style.color = "#000";
//             }, 2000);
//         } else if (selectedLanguage === "de") {
//             filterByCity.children[2].textContent =
//                 "Wählen Sie eine Region aus!";
//             filterByCity.children[2].style.color = "red";

//             setTimeout(() => {
//                 filterByCity.children[2].textContent = "Stadt";
//                 filterByCity.children[2].style.color = "#000";
//             }, 2000);
//         }

//         ruleArrows({
//             arrowDown: ".addresses__arrow-down-city",
//             arrowUp: ".addresses__arrow-up-city",
//         });
//     } else if (isRegionSelected) {
//         const selectedCountryTitleUa = filterByCountry.children[0].textContent;
//         const selectedRegionTitleUa = filterByRegion.children[0].textContent;
//         const countries = data?.countries;

//         for (let i = 0; i < countries.length; i++) {
//             const countryItem = countries[i];
//             const { countryTitleUa } = countryItem;

//             if (countryTitleUa === selectedCountryTitleUa) {
//                 const countryRegions = countryItem?.countryRegions;

//                 for (let k = 0; k < countryRegions.length; k++) {
//                     const regionItem = countryRegions[k];
//                     const { regionTitleUa } = regionItem;

//                     if (regionTitleUa === selectedRegionTitleUa) {
//                         const regionCities = regionItem?.regionCities;

//                         for (let j = 0; j < regionCities.length; j++) {
//                             let dataObj = {};
//                             const { cityTitleUa, cityTitleEng, cityTitleDe } =
//                                 regionCities[j];

//                             dataObj["cityTitleUa"] = cityTitleUa;
//                             dataObj["cityTitleEng"] = cityTitleEng;
//                             dataObj["cityTitleDe"] = cityTitleDe;

//                             result.push(dataObj);
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     return result;
// };

// const getAddresses = (data) => {
//     let result = [];

//     const selectedCountryTitleUa = filterByCountry.children[0].textContent;
//     const selectedRegionTitleUa = filterByRegion.children[0].textContent;
//     const selectedCityTitleUa = filterByCity.children[0].textContent;
//     const countries = data?.countries;

//     for (let i = 0; i < countries.length; i++) {
//         const countryItem = countries[i];
//         const { countryTitleUa } = countryItem;

//         if (countryTitleUa === selectedCountryTitleUa) {
//             const countryRegions = countryItem?.countryRegions;

//             for (let k = 0; k < countryRegions.length; k++) {
//                 const regionItem = countryRegions[k];
//                 const { regionTitleUa } = regionItem;

//                 if (regionTitleUa === selectedRegionTitleUa) {
//                     const regionCities = regionItem?.regionCities;

//                     for (let j = 0; j < regionCities.length; j++) {
//                         const cityItem = regionCities[j];
//                         const { cityTitleUa } = cityItem;

//                         if (cityTitleUa === selectedCityTitleUa) {
//                             const cityAddresses = cityItem?.cityAddresses;

//                             for (let l = 0; l < cityAddresses.length; l++) {
//                                 const address = cityAddresses[l];
//                                 result.push(address);
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     return result;
// };

// const createFilterListNode = (options) => {
//     const { parentClass, childClass, data, variant } = options;

//     let nodeString = null;

//     const list = document.createElement("ul");
//     list.classList.add(parentClass);

//     const selectedLanguage = getActiveLanguage($languages);

//     const createItemOfList = (options) => {
//         const {
//             childClass,
//             selectedLanguage,
//             itemTitleUa,
//             itemTitleEng,
//             itemTitleDe,
//         } = options;

//         const item = document.createElement("li");
//         item.classList.add(childClass);

//         const spanUa = document.createElement("span");
//         spanUa.setAttribute("data-lang", "ua");
//         selectedLanguage === "ua" && spanUa.classList.add("active");
//         spanUa.append(itemTitleUa);
//         item.append(spanUa);

//         const spanEng = document.createElement("span");
//         spanEng.setAttribute("data-lang", "eng");
//         selectedLanguage === "eng" && spanEng.classList.add("active");
//         spanEng.append(itemTitleEng);
//         item.append(spanEng);

//         const spanDe = document.createElement("span");
//         spanDe.setAttribute("data-lang", "de");
//         selectedLanguage === "de" && spanDe.classList.add("active");
//         spanDe.append(itemTitleDe);
//         item.append(spanDe);

//         return item;
//     };

//     if (variant === "country") {
//         const countriesList = getCountries(data);
//         const isCountries = !!countriesList.length;
//         !isCountries && console.log("Список країн пустий ...");

//         if (isCountries) {
//             for (let i = 0; i < countriesList.length; i++) {
//                 const { countryTitleUa, countryTitleEng, countryTitleDe } =
//                     countriesList[i];

//                 const item = createItemOfList({
//                     childClass,
//                     selectedLanguage,
//                     itemTitleUa: countryTitleUa,
//                     itemTitleEng: countryTitleEng,
//                     itemTitleDe: countryTitleDe,
//                 });

//                 list.append(item);
//             }

//             nodeString = list;
//         }
//     } else if (variant === "region") {
//         const regionsList = getRegions(data);
//         const isRegions = !!regionsList.length;
//         !isRegions && console.log("Список країн пустий ...");

//         if (isRegions) {
//             for (let i = 0; i < regionsList.length; i++) {
//                 const { regionTitleUa, regionTitleEng, regionTitleDe } =
//                     regionsList[i];

//                 const item = createItemOfList({
//                     childClass,
//                     selectedLanguage,
//                     itemTitleUa: regionTitleUa,
//                     itemTitleEng: regionTitleEng,
//                     itemTitleDe: regionTitleDe,
//                 });

//                 list.append(item);
//             }

//             nodeString = list;
//         }
//     } else if (variant === "city") {
//         const citiesList = getCities(data);
//         const isCities = !!citiesList.length;

//         if (isCities) {
//             for (let i = 0; i < citiesList.length; i++) {
//                 const { cityTitleUa, cityTitleEng, cityTitleDe } =
//                     citiesList[i];

//                 const item = createItemOfList({
//                     childClass,
//                     selectedLanguage,
//                     itemTitleUa: cityTitleUa,
//                     itemTitleEng: cityTitleEng,
//                     itemTitleDe: cityTitleDe,
//                 });

//                 list.append(item);
//             }

//             nodeString = list;
//         }
//     }

//     return nodeString;
// };

// const createAddressListItem = (data) => {
//     let result = [];
//     const selectedLanguage = getActiveLanguage($languages);

//     for (let i = 0; i < data.length; i++) {
//         const {
//             addressTitleUa,
//             addressTitleEng,
//             addressTitleDe,
//             typeUa,
//             typeEng,
//             typeDe,
//             contacts,
//         } = data[i];

//         const item = document.createElement("li");
//         item.classList.add("addresses__location-item");

//         const spanUa = document.createElement("span");
//         spanUa.setAttribute("data-lang", "ua");
//         selectedLanguage === "ua" && spanUa.classList.add("active");
//         spanUa.append(addressTitleUa);
//         item.append(spanUa);

//         const spanEng = document.createElement("span");
//         spanEng.setAttribute("data-lang", "eng");
//         selectedLanguage === "eng" && spanEng.classList.add("active");
//         spanEng.append(addressTitleEng);
//         item.append(spanEng);

//         const spanDe = document.createElement("span");
//         spanDe.setAttribute("data-lang", "de");
//         selectedLanguage === "de" && spanDe.classList.add("active");
//         spanDe.append(addressTitleDe);
//         item.append(spanDe);

//         const addrParagraph = document.createElement("p");
//         addrParagraph.classList.add("addresses__hidden-content");

//         const spanDecorationUp = document.createElement("span");
//         spanDecorationUp.classList.add("addresses__decoration", "active");
//         addrParagraph.append(spanDecorationUp);

//         const spanTypeUa = document.createElement("span");
//         selectedLanguage === "ua"
//             ? spanTypeUa.classList.add("addresses__type", "active")
//             : spanTypeUa.classList.add("addresses__type");
//         spanTypeUa.setAttribute("data-lang", "ua");
//         spanTypeUa.append(typeUa);
//         addrParagraph.append(spanTypeUa);

//         const spanTypeEng = document.createElement("span");
//         selectedLanguage === "eng"
//             ? spanTypeEng.classList.add("addresses__type", "active")
//             : spanTypeEng.classList.add("addresses__type");
//         spanTypeEng.setAttribute("data-lang", "eng");
//         spanTypeEng.append(typeEng);
//         addrParagraph.append(spanTypeEng);

//         const spanTypeDe = document.createElement("span");
//         selectedLanguage === "de"
//             ? spanTypeDe.classList.add("addresses__type", "active")
//             : spanTypeDe.classList.add("addresses__type");
//         spanTypeDe.setAttribute("data-lang", "de");
//         spanTypeDe.append(typeDe);
//         addrParagraph.append(spanTypeDe);

//         const spanDecorationDown = document.createElement("span");
//         spanDecorationDown.classList.add("addresses__decoration", "active");
//         addrParagraph.append(spanDecorationDown);

//         for (let i = 0; i < contacts.length; i++) {
//             const contactItem = contacts[i];
//             const { email, phone } = contactItem;

//             const spanContact = document.createElement("span");

//             if (email) {
//                 spanContact.classList.add("addresses__email-contact", "active");
//                 spanContact.append(email);
//                 addrParagraph.append(spanContact);
//             } else if (phone) {
//                 spanContact.classList.add("addresses__phone-contact", "active");
//                 spanContact.append(phone);
//                 addrParagraph.append(spanContact);
//             }
//         }

//         item.append(addrParagraph);
//         result.push(item);
//     }

//     return result;
// };

// // Чи вже доданий список до фільтру
// const isFilterListExist = (options) => {
//     const { country, region, city } = options;
//     let result = {
//         isCountryList: null,
//         isRegionList: null,
//         isCityList: null,
//     };

//     if (country) {
//         const contryChildren = Array.from(filterByCountry.children);

//         for (let i = 0; i < contryChildren.length; i++) {
//             const child = contryChildren[i];
//             child.classList.contains("addresses__country-filter-list") &&
//                 (result.isCountryList = true);
//         }
//     } else if (region) {
//         const regionChildren = Array.from(filterByRegion.children);

//         for (let i = 0; i < regionChildren.length; i++) {
//             const child = regionChildren[i];
//             child.classList.contains("addresses__region-filter-list") &&
//                 (result.isRegionList = true);
//         }
//     } else if (city) {
//         const cityChildren = Array.from(filterByCity.children);

//         for (let i = 0; i < cityChildren.length; i++) {
//             const child = cityChildren[i];
//             child.classList.contains("addresses__city-filter-list") &&
//                 (result.isCityList = true);
//         }
//     }

//     return result;
// };

// // Отримати обраний пункт зі списку
// const getSelectedFilterItem = (options) => {
//     const { event, isItemSelected, isSubItemSelected } = options;
//     let result = {
//         titleUa: null,
//         titleEng: null,
//         titleDe: null,
//     };

//     if (isItemSelected) {
//         result.titleUa = event.target.children[0].textContent;
//         result.titleEng = event.target.children[1].textContent;
//         result.titleDe = event.target.children[2].textContent;
//     } else if (isSubItemSelected) {
//         result.titleUa = event.target.parentElement.children[0].textContent;
//         result.titleEng = event.target.parentElement.children[1].textContent;
//         result.titleDe = event.target.parentElement.children[2].textContent;
//     }

//     return result;
// };

// const ruleArrows = (options) => {
//     const { arrowDown, arrowUp } = options;
//     const $arrowDown = document.querySelectorAll(arrowDown);
//     const $arrowUp = document.querySelectorAll(arrowUp);

//     $arrowDown[0].classList.contains("active")
//         ? $arrowDown[0].classList.remove("active")
//         : $arrowDown[0].classList.add("active");

//     $arrowUp[0].classList.contains("active")
//         ? $arrowUp[0].classList.remove("active")
//         : $arrowUp[0].classList.add("active");
// };

// // Встановити фільтр за країнами
// const setFilterByCountry = (e) => {
//     e.stopPropagation();

//     setIsFilterActice();
//     const { isCountryList } = isFilterListExist({
//         country: true,
//     });
//     const { isRegionList } = isFilterListExist({
//         region: true,
//     });

//     if (isRegionList) {
//         const regionsList = document.querySelectorAll(
//             ".addresses__region-filter-list"
//         );
//         regionsList[0].remove();
//         filterByRegion.children[0].textContent = "Регіон";
//         filterByRegion.children[1].textContent = "Region";
//         filterByRegion.children[2].textContent = "Region";
//     }

//     if (!isCountryList) {
//         const countryFilterNode = createFilterListNode({
//             parentClass: "addresses__country-filter-list",
//             childClass: "addresses__country-filter-item",
//             data: addresses,
//             variant: "country",
//         });
//         countryFilterNode && filterByCountry.append(countryFilterNode);
//         const countriesList = document.querySelectorAll(
//             ".addresses__country-filter-list"
//         );
//         countriesList[0].classList.add("active");
//     } else if (isCountryList && !isFilterActive) {
//         const countriesList = document.querySelectorAll(
//             ".addresses__country-filter-list"
//         );
//         countriesList[0].classList.contains("active") &&
//             countriesList[0].classList.remove("active");
//     } else if (isCountryList && isFilterActive) {
//         const countriesList = document.querySelectorAll(
//             ".addresses__country-filter-list"
//         );
//         !countriesList[0].classList.contains("active") &&
//             countriesList[0].classList.add("active");
//     }

//     const isItemSelected =
//         e.target.className === "addresses__country-filter-item";

//     const isSubItemSelected =
//         e.target.parentElement.className === "addresses__country-filter-item";

//     if (isItemSelected || isSubItemSelected) {
//         const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
//             event: e,
//             isItemSelected,
//             isSubItemSelected,
//         });

//         filterByCountry.children[0].textContent = titleUa;
//         filterByCountry.children[1].textContent = titleEng;
//         filterByCountry.children[2].textContent = titleDe;
//     }

//     ruleArrows({
//         arrowDown: ".addresses__arrow-down",
//         arrowUp: ".addresses__arrow-up",
//     });
// };

// const setFilterByRegion = (e) => {
//     e.stopPropagation();

//     setIsFilterActice();

//     const { isRegionList } = isFilterListExist({
//         region: true,
//     });
//     const { isCityList } = isFilterListExist({
//         city: true,
//     });

//     if (isCityList) {
//         const citiesList = document.querySelectorAll(
//             ".addresses__city-filter-list"
//         );
//         citiesList[0].remove();
//         filterByCity.children[0].textContent = "Місто";
//         filterByCity.children[1].textContent = "City";
//         filterByCity.children[2].textContent = "Stadt";
//     }

//     if (!isRegionList) {
//         const regionFilterNode = createFilterListNode({
//             parentClass: "addresses__region-filter-list",
//             childClass: "addresses__region-filter-item",
//             data: addresses,
//             variant: "region",
//         });
//         regionFilterNode && filterByRegion.append(regionFilterNode);
//         const regionsList = document.querySelectorAll(
//             ".addresses__region-filter-list"
//         );
//         regionsList[0]?.classList.add("active");
//     } else if (isRegionList && !isFilterActive) {
//         const regionsList = document.querySelectorAll(
//             ".addresses__region-filter-list"
//         );
//         regionsList[0].classList.contains("active") &&
//             regionsList[0].classList.remove("active");
//     } else if (isRegionList && isFilterActive) {
//         const regionsList = document.querySelectorAll(
//             ".addresses__region-filter-list"
//         );
//         !regionsList[0].classList.contains("active") &&
//             regionsList[0].classList.add("active");
//     }

//     const isItemSelected =
//         e.target.className === "addresses__region-filter-item";

//     const isSubItemSelected =
//         e.target.parentElement.className === "addresses__region-filter-item";

//     if (isItemSelected || isSubItemSelected) {
//         const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
//             event: e,
//             isItemSelected,
//             isSubItemSelected,
//         });

//         filterByRegion.children[0].textContent = titleUa;
//         filterByRegion.children[1].textContent = titleEng;
//         filterByRegion.children[2].textContent = titleDe;
//     }

//     ruleArrows({
//         arrowDown: ".addresses__arrow-down-region",
//         arrowUp: ".addresses__arrow-up-region",
//     });
// };

// const addressesList = document.querySelectorAll(".addresses__location-list");

// const setFilterByCity = (e) => {
//     e.stopPropagation();

//     setIsFilterActice();
//     const { isCityList } = isFilterListExist({
//         city: true,
//     });

//     if (!isCityList) {
//         const cityFilterNode = createFilterListNode({
//             parentClass: "addresses__city-filter-list",
//             childClass: "addresses__city-filter-item",
//             data: addresses,
//             variant: "city",
//         });
//         cityFilterNode && filterByCity.append(cityFilterNode);
//         const citiesList = document.querySelectorAll(
//             ".addresses__city-filter-list"
//         );
//         citiesList[0]?.classList.add("active");
//     } else if (isCityList && !isFilterActive) {
//         const citiesList = document.querySelectorAll(
//             ".addresses__city-filter-list"
//         );
//         citiesList[0].classList.contains("active") &&
//             citiesList[0].classList.remove("active");
//     } else if (isCityList && isFilterActive) {
//         const citiesList = document.querySelectorAll(
//             ".addresses__city-filter-list"
//         );
//         !citiesList[0].classList.contains("active") &&
//             citiesList[0].classList.add("active");
//     }

//     const isItemSelected = e.target.className === "addresses__city-filter-item";

//     const isSubItemSelected =
//         e.target.parentElement.className === "addresses__city-filter-item";

//     if (isItemSelected || isSubItemSelected) {
//         const { titleUa, titleEng, titleDe } = getSelectedFilterItem({
//             event: e,
//             isItemSelected,
//             isSubItemSelected,
//         });

//         filterByCity.children[0].textContent = titleUa;
//         filterByCity.children[1].textContent = titleEng;
//         filterByCity.children[2].textContent = titleDe;

//         const adrressesChildren = Array.from(addressesList[0].children);

//         for (let i = 0; i < adrressesChildren.length; i++) {
//             addressesList[0].children[i].remove();
//         }

//         const cityAddresses = getAddresses(addresses);
//         const addressesListItems = createAddressListItem(cityAddresses);

//         for (let i = 0; i < addressesListItems.length; i++) {
//             const addressItem = addressesListItems[i];
//             addressesList[0].append(addressItem);
//         }
//     }

//     ruleArrows({
//         arrowDown: ".addresses__arrow-down-city",
//         arrowUp: ".addresses__arrow-up-city",
//     });
// };

// const setAddress = (e) => {
//     e.stopPropagation();

//     const $addressDetails = document.querySelectorAll(
//         ".addresses__hidden-content"
//     );
//     !$addressDetails[0].classList.contains("active")
//         ? $addressDetails[0].classList.add("active")
//         : $addressDetails[0].classList.remove("active");

//     const marSrc = getMapSrc(addresses);
//     const $mapContainer = document.querySelectorAll(
//         ".addresses__map-container"
//     );
//     $mapContainer[0].children[0].src !== marSrc &&
//         ($mapContainer[0].children[0].src = marSrc);
// };

// const getMapSrc = (data) => {
//     let result = null;

//     const cityAddresses = getAddresses(data);
//     const addressList = Array.from(addressesList[0].children);

//     for (let i = 0; i < addressList.length; i++) {
//         const addressItem = addressList[i];
//         const addressTitleUa = addressItem.children[0].textContent;

//         for (let i = 0; i < cityAddresses.length; i++) {
//             const adressUa = cityAddresses[i].addressTitleUa;

//             if (adressUa === addressTitleUa) {
//                 result = cityAddresses[i]?.mapSrc;
//             }
//         }
//     }

//     return result;
// };

// const setDefaultAddress = (options) => {
//     const { countryTitleUa, regionTitleUa, cityTitleUa, addressTitleUa } =
//         options;

//     const countries = addresses?.countries;

//     for (let i = 0; i < countries.length; i++) {
//         const countryItem = countries[i];
//         const {
//             countryTitleUa: countryNameUa,
//             countryTitleEng,
//             countryTitleDe,
//         } = countryItem;

//         if (countryNameUa === countryTitleUa) {
//             filterByCountry.children[0].textContent = countryNameUa;
//             filterByCountry.children[1].textContent = countryTitleEng;
//             filterByCountry.children[2].textContent = countryTitleDe;
//         }
//     }

//     for (let i = 0; i < countries.length; i++) {
//         const countryItem = countries[i];
//         const { countryTitleUa: countryNameUa, countryRegions } = countryItem;

//         if (countryNameUa === countryTitleUa) {
//             for (let j = 0; j < countryRegions.length; j++) {
//                 const regionItem = countryRegions[j];
//                 const {
//                     regionTitleUa: regionNameUa,
//                     regionTitleEng,
//                     regionTitleDe,
//                 } = regionItem;

//                 if (regionNameUa === regionTitleUa) {
//                     filterByRegion.children[0].textContent = regionNameUa;
//                     filterByRegion.children[1].textContent = regionTitleEng;
//                     filterByRegion.children[2].textContent = regionTitleDe;
//                 }
//             }
//         }
//     }

//     let cityAddresses = [];

//     for (let i = 0; i < countries.length; i++) {
//         const countryItem = countries[i];
//         const { countryTitleUa: countryNameUa, countryRegions } = countryItem;

//         if (countryNameUa === countryTitleUa) {
//             for (let j = 0; j < countryRegions.length; j++) {
//                 const regionItem = countryRegions[j];
//                 const { regionTitleUa: regionNameUa, regionCities } =
//                     regionItem;

//                 if (regionNameUa === regionTitleUa) {
//                     for (let k = 0; k < regionCities.length; k++) {
//                         const cityItem = regionCities[k];
//                         const {
//                             cityTitleUa: cityNameUa,
//                             cityTitleEng,
//                             cityTitleDe,
//                         } = cityItem;

//                         if (cityNameUa === cityTitleUa) {
//                             filterByCity.children[0].textContent = cityNameUa;
//                             filterByCity.children[1].textContent = cityTitleEng;
//                             filterByCity.children[2].textContent = cityTitleDe;

//                             cityAddresses = getAddresses(addresses);
//                             const addressesListItems =
//                                 createAddressListItem(cityAddresses);

//                             for (
//                                 let l = 0;
//                                 l < addressesListItems.length;
//                                 l++
//                             ) {
//                                 const addressItem = addressesListItems[l];
//                                 addressesList[0].append(addressItem);
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     const $address = document.querySelectorAll(".addresses__location-list");
//     const address = Array.from($address[0].children);

//     for (let i = 0; i < address.length; i++) {
//         const addressItem = address[i];
//         const addressNameUa = addressItem.children[0].textContent;
//         const addressDetailContacts = addressItem.children[3];

//         addressNameUa === addressTitleUa &&
//             addressDetailContacts.classList.add("active");
//     }

//     for (let i = 0; i < cityAddresses.length; i++) {
//         const addressItem = cityAddresses[i];
//         const { mapSrc } = addressItem;

//         const $mapContainer = document.querySelectorAll(
//             ".addresses__map-container"
//         );
//         $mapContainer[0].children[0].src !== mapSrc &&
//             ($mapContainer[0].children[0].src = mapSrc);
//     }
// };

// setDefaultAddress({
//     countryTitleUa: "Україна",
//     regionTitleUa: "Київський",
//     cityTitleUa: "Київ",
//     addressTitleUa: "вул. Олекси Тихого (Виборзька), буд. 55/13",
// });

// filterByCountry.addEventListener("click", (e) => setFilterByCountry(e));
// filterByRegion.addEventListener("click", (e) => setFilterByRegion(e));
// filterByCity.addEventListener("click", (e) => setFilterByCity(e));
// addressesList[0].addEventListener("click", (e) => setAddress(e));
