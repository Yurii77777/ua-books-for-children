/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2021 - 2022> <Yurii Andriiko>
 * http://yurets.info/
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
"use strict";

const db = [
    {
        countryId: 0,
        countryTitle: "Ukraine",
        regionId: 0,
        regionTitle: "Kyivskyi",
        cityId: 0,
        cityTitle: "Kyiv",
        addresses: [
            {
                addressTitleUa: "вул. Олекси Тихого (Виборзька), буд. 55/13",
                addressTitleEng: "St. Oleksy Tyhoho (Vyborzka), bldg. 55/13",
                addressTitleDe: "St. Oleksy Tyhoho (Vyborzka), Geb. 55/13",
                mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.619404032457!2d30.437986815731186!3d50.44818947947503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc2368662709%3A0x609e55c29c3b4020!2z0YPQuy4g0JDQu9C10LrRgdC10Y8g0KLQuNGF0L7Qs9C-LCA1NSwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1656661871443!5m2!1sru!2sua",
                typeUa: "прийом та видача",
                typeEng: "reception and delivery",
                typeDe: "Empfang und Lieferung",
                setDefault: true,
                contacts: [
                    {
                        email: "child.help.book@gmail.com",
                    },
                    {
                        phone: "+38 044 209 53 02",
                    },
                    {
                        phone: "+38 098 306 84 84",
                    },
                    {
                        phone: "+38 098 683 85 21",
                    },
                    {
                        phone: "+38 063 499 37 69",
                    },
                ],
            },
        ],
    },
];

const $countriesList = document.querySelectorAll(
    ".addresses__filter-item.country"
);
const $regionsList = document.querySelectorAll(
    ".addresses__filter-item.region"
);
const $citiesList = document.querySelectorAll(".addresses__filter-item.city");
const $mapContainer = document.getElementsByTagName("iframe");
const $languagesNodeWrapper = document.querySelectorAll(".header__languages");
const $locationList = document.querySelectorAll(".addresses__location-list");

const getActiveLanguage = (languagesNode) => {
    const chidren = Array.from(languagesNode[0].children);
    let result = null || "ua";

    for (let i = 0; i < chidren.length; i++) {
        const languageItem = chidren[i].children[0];

        languageItem.classList.contains("active") &&
            (result = languageItem.textContent);
    }

    return result;
};

const getAddresses = (options = {}) => {
    const { $countryNode, $regionNode, $cityNode, db } = options;
    let result = null;

    const selectedCountry = +$countryNode[0].value;
    const selectedRegion = +$regionNode[0].value;
    const selectedCity = +$cityNode[0].value;

    for (let i = 0; i < db.length; i++) {
        const addressItem = db[i];
        const { countryId, regionId, cityId, addresses } = addressItem;

        if (
            selectedCountry === countryId &&
            selectedRegion === regionId &&
            selectedCity === cityId
        ) {
            result = addresses;
        }
    }

    return result;
};

const createAddressList = (options = {}) => {
    const { addresses } = options;
    const result = [];

    const selectedLanguage = getActiveLanguage($languagesNodeWrapper);

    for (let i = 0; i < addresses.length; i++) {
        const {
            addressTitleUa,
            addressTitleEng,
            addressTitleDe,
            setDefault,
            typeUa,
            typeEng,
            typeDe,
            contacts,
        } = addresses[i];

        const li = document.createElement("li");
        setDefault
            ? (li.className = "addresses__filter-item active")
            : (li.className = "addresses__filter-item");
        selectedLanguage === "ua" && li.append(addressTitleUa);
        selectedLanguage === "eng" && li.append(addressTitleEng);
        selectedLanguage === "de" && li.append(addressTitleDe);

        const span = document.createElement("span");
        span.className = "addresses__decoration";
        li.append(span);

        const spanType = document.createElement("span");
        spanType.className = "addresses__span-type";

        selectedLanguage === "ua" && spanType.append(typeUa);
        selectedLanguage === "eng" && spanType.append(typeEng);
        selectedLanguage === "de" && spanType.append(typeDe);
        li.append(spanType);

        const span1 = document.createElement("span");
        span1.className = "addresses__decoration";
        li.append(span1);

        for (let i = 0; i < contacts.length; i++) {
            const { email, phone } = contacts[i];

            const contactSpan = document.createElement("span");
            contactSpan.className = "addresses__contact-span";
            email && contactSpan.append(email);
            phone && contactSpan.append(phone);
            li.append(contactSpan);
        }

        result.push(li);
    }

    return result;
};

const handleActiveClasses = (e) => {
    const userClick = e.target;

    if (userClick.classList.contains("addresses__filter-item")) {
        userClick.classList.contains("active")
            ? userClick.classList.remove("active")
            : userClick.classList.add("active");
    }

    if (userClick.classList.contains("addresses__contact-span")) {
        e.target.parentNode.classList.contains("active")
            ? e.target.parentNode.classList.remove("active")
            : e.target.parentNode.classList.add("active");
    }
};

const setDefaultAddress = () => {
    const addresses = getAddresses({
        $countryNode: $countriesList,
        $regionNode: $regionsList,
        $cityNode: $citiesList,
        db,
    });

    const { mapSrc } = addresses.filter(({ setDefault }) => setDefault)[0];
    mapSrc && ($mapContainer[0].src = mapSrc);

    const addressList = createAddressList({ addresses });

    for (let i = 0; i < addressList.length; i++) {
        const addressItem = addressList[i];
        addressItem.addEventListener("click", (e) => handleActiveClasses(e));

        $locationList[0].appendChild(addressItem);
    }
};

setDefaultAddress();
