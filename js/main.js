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
