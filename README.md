# Fictivo v.1.0.0

[![Build](https://img.shields.io/github/actions/workflow/status/APorkolab/Fictivo/ci.yml?branch=main)](../../actions)
[![License](https://img.shields.io/badge/license-MIT-informational.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/APorkolab/Fictivo.svg)](../../issues)

# Documentation

## 1. The description of the task

The Fictivo v.1.0.0 application is specifically designed for novel and prose writing: it allows the user to generate a large number of randomized, multi-national male and female names.

As of now, the application can generate names for 23 countries, with the greatest variety in English and Hungarian.

Additionally, titles and ranks can be generated for the names. Artist names can also be created using the application.

The original task:

> A random name generator
>
> Skills: Front-end
>
> Focus: Interface, form, randomness management
>
> Difficulty: 1/5
>
> The advantage of a project like this is that the interface can be
> straightforward and works for many topics.
>
> Are you a fan of role-playing games? Generate character names! But it
> also works for startup names, cat and dog names, etc. There will be
> something for everyone!

## 2. Preparations before running the software

There is no need for preparations before running. Just enjoy the random names! :)

## **3. Version history**

Technologies used: Angular 22 (standalone components, signals, `@angular/build` application builder), TypeScript 6, RxJS 7, Bootstrap 5, Vitest 5 for unit tests (see _package.json_ for the exact list).

### v.1.0.0 (2022-11-17)

- First release.
- The random name generator for
  - American English,
  - Argentinian,
  - Australian English,
  - Brazilian,
  - British English,
  - Bulgarian,
  - Canadian English,
  - Chinese,
  - Danish,
  - Finnish,
  - French,
  - German,
  - Hungarian,
  - Kazakh,
  - Mexican,
  - Norwegian,
  - Polish,
  - Portuguese,
  - Russian,
  - Spanish,
  - Swedish,
  - Turkish,
  - Ukrainian names.
- The following ranks and titles has been added to this application:
  - Educational titles,
  - Hungarian educational titles,
  - Hungarian police ranks,
  - Hungarian police ranks with abbreviated form,
  - Hungarian fireman ranks,
  - Hungarian fireman rank with abbreviated form,
  - Hungarian military ranks,
  - Hungarian military ranks with abbreviated form,
  - USA military ranks,
  - USA military ranks with abbreviated form,
  - SS military ranks,
  - Civilian professions,
  - Civilian professions (in Hungarian).
- With the name generator, you can even make nicknamed artist names using only one element (such as Cher, Ákos, Charlie, Dido, Madonna and Mika).
  _- Further plans include multilingualisation and the expansion of the name database._

## **4. Install the application**

Prerequisites: [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) `^22.22.3`, `^24.15.0` or `>=26` (npm comes with it). A global Angular CLI is not needed; the project-local one is used through the npm scripts.

1.  Clone the repository:

    `git clone https://github.com/APorkolab/Fictivo.git`

2.  Install the dependencies in the project folder:

    `npm ci`

3.  Build the production bundle:

    `npm run build`

    The output is written to `dist/fictivo`; copy its contents to any static web server if you want to deploy it.

## **5. Configure the application**

- There is no need to configure the application because there is no backend in it, and it does not read any environment variables.

## **6. Start, test and develop the application**

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with live reload on http://localhost:4200 |
| `npm run build` | Production build into `dist/fictivo` |
| `npm start` | Serves the production build (`dist/fictivo`) with `serve`; run `npm run build` first. This is also what the `Procfile` uses. |
| `npm test` | Unit tests (Vitest) in watch mode |
| `npm run test:ci` | Unit tests once, as in CI |
| `npm run typecheck` | Strict TypeScript check of the application and the tests |

CI (`.github/workflows/ci.yml`) runs the type check, the production build and the unit tests on every push and pull request.

## **7. A special thanks to...**

- Thanks for the project idea for Josef Cruz
  (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef)
- Thanks for the database of the names for dasmig
  (https://github.com/dasmig/name-generator)

- Thanks for the pretty, responsive HTML template for Toolplate (https://www.tooplate.com/view/2095-level)

## **8. Legal information**

[![Creative Commons License](https://camo.githubusercontent.com/72af7c8e70a45c471163e803748d0338b3b2b52f6b040804e549e4163de72a58/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792f342e302f38387833312e706e67)](http://creativecommons.org/licenses/by/4.0/)  
This work by [Ádám Dr. Porkoláb](https://porkolab.digital/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).  
Based on a work at [](https://github.com/APorkolab/)[https://github.com/APorkolab/](https://github.com/APorkolab/).

---

# Fictivo v.1.0.0.0 - dokumentáció

## 1. A feladat leírása

A Fictivo v.1.0.0 alkalmazás kifejezetten regény- és prózaírásra készült: lehetővé teszi a felhasználó számára, hogy nagyszámú véletlenszerű, több nemzetiségű férfi és női nevet generáljon.

Jelenleg az alkalmazás 23 ország neveit képes generálni, a legnagyobb választékban főleg angol és a magyar neveket.

Emellett a nevekhez címek és rangok is generálhatók. Az alkalmazással művésznevek is létrehozhatók.

Az eredeti feladat:

> Egy véletlenszerű névgenerátor
>
> Képességek: .
>
> Fókusz: Interface, form, véletlenszerűség kezelése
>
> Nehézség: 1/5
>
> Egy ilyen projekt előnye, hogy az interfész lehet
> egyszerű és sok témában működik.
>
> Rajongsz a szerepjátékokért? Generálj karakterneveket! De ez
> de működik az induló nevek, macska- és kutyanevek, stb. esetében is. Lesznek
> mindenkinek lesz valami!

## 2. Előkészületek a szoftver futtatása előtt

A futtatás előtt nincs szükség előkészületekre. Csak élvezd a véletlenszerű neveket! :)

## **3. Verziótörténet**

Használt technológiák: Angular 22 (standalone komponensek, signalok, `@angular/build` application builder), TypeScript 6, RxJS 7, Bootstrap 5, a unit tesztekhez Vitest 5 (a pontos listát lásd a _package.json_-ban).

### v.1.0.0 (2022-11-17)

- Első kiadás.
- A véletlenszerű névgenerátor
  - Amerikai angol,
  - Argentin,
  - Ausztrál angol,
  - brazil,
  - brit angol,
  - bolgár,
  - kanadai angol,
  - kínai,
  - dán,
  - finn,
  - francia,
  - német,
  - magyar,
  - kazah,
  - mexikói,
  - norvég,
  - lengyel,
  - portugál,
  - orosz,
  - spanyol,
  - svéd,
  - török,
  - ukrán nevekhez.
- A következő rangok és címek kerültek hozzá az alkalmazáshoz:
  - oktatási címek,
  - magyar oktatási címek,
  - magyar rendőri rangok,
  - magyar rendőri rangok rövidített formában,
  - magyar tűzoltói rangok,
  - magyar tűzoltói rangok rövidített formában,
  - magyar katonai rangok,
  - magyar katonai rendfokozatok rövidített formában,
  - USA-beli katonai rangok,
  - USA-beli katonai rangok rövidített formában,
  - SS katonai rangok,
  - Polgári foglalkozások,
  - Polgári foglalkozások (magyar nyelven).
- A névgenerátorral akár beceneves művészneveket is készíthetsz egyetlen névelem felhasználásával (pl. Cher, Ákos, Charlie, Dido, Madonna, Mika).
  \*- A további tervek között szerepel a többnyelvűsítés és a névadatbázis bővítése.

## **4. Az alkalmazás telepítése**

Előfeltételek: [Git](https://git-scm.com/) és [Node.js](https://nodejs.org/en/) `^22.22.3`, `^24.15.0` vagy `>=26` (az npm vele együtt érkezik). Globális Angular CLI nem kell, az npm scriptek a projekt saját CLI-jét használják.

1.  Klónozd a tárolót:

    `git clone https://github.com/APorkolab/Fictivo.git`

2.  Telepítsd a függőségeket a projekt mappájában:

    `npm ci`

3.  Készítsd el az éles buildet:

    `npm run build`

    Az eredmény a `dist/fictivo` mappába kerül; telepítéshez ennek tartalmát kell bármilyen statikus webszerverre másolni.

## **5. Az alkalmazás konfigurálása**

- Nincs szükség az alkalmazás konfigurálására, mivel nincs benne backend, és környezeti változókat sem olvas.

## **6. Az alkalmazás indítása, tesztelése és fejlesztése**

| Parancs | Mire való |
|---|---|
| `npm run dev` | Fejlesztői szerver élő újratöltéssel a http://localhost:4200 címen |
| `npm run build` | Éles build a `dist/fictivo` mappába |
| `npm start` | Az éles build (`dist/fictivo`) kiszolgálása a `serve` csomaggal; előtte futtasd az `npm run build`-et. A `Procfile` is ezt használja. |
| `npm test` | Unit tesztek (Vitest) figyelő módban |
| `npm run test:ci` | Unit tesztek egyszeri futtatása, ahogy a CI is futtatja |
| `npm run typecheck` | Szigorú TypeScript-ellenőrzés az alkalmazásra és a tesztekre |

A CI (`.github/workflows/ci.yml`) minden push és pull request esetén lefuttatja a típusellenőrzést, az éles buildet és a unit teszteket.

## **7. Külön köszönet...**

- Köszönet a projekt ötletéért Josef Cruznak
  (https://javascript.plainenglish.io/9-super-creative-project-ideas-for-junior-web-developers-e8181e6f4eef)
- Köszönet a nevek adatbázisáért dasmig-nek
  (https://github.com/dasmig/name-generator)

- Köszönet a szép, reszponzív HTML sablonért a Toolplate-nek (https://www.tooplate.com/view/2095-level)

## **8. Jogi információk**

<a  rel="license"  href="http://creativecommons.org/licenses/by-nc/4.0/"><img  alt="Creative Commons Licenc"  style="border-width:0"  src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><a  xmlns:cc="http://creativecommons.org/ns#"  href="porkolab.digital"  property="cc:attributionName"  rel="cc:attributionURL">Dr. Porkoláb Ádám</a> <span  xmlns:dct="http://purl.org/dc/terms/"  href="http://purl.org/dc/dcmitype/InteractiveResource"  property="dct:title"  rel="dct:type">Fictivo</span> című műve <a  rel="license"  href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Nevezd meg! - Ne add el! 4.0 Nemzetközi Licenc</a> alatt van.<br />Based on a work at <a  xmlns:dct="http://purl.org/dc/terms/"  href="www.github.com/APorkolab"  rel="dct:source">www.github.com/APorkolab</a>.<br />Az ezen publikus licenc <strong>hatáskörén kívül eső</strong> jogok megtekinthetőek itt: <a  xmlns:cc="http://creativecommons.org/ns#"  href="www.porkolab.digital"  rel="cc:morePermissions">www.porkolab.digital</a>
