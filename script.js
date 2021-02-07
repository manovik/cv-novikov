document.addEventListener("DOMContentLoaded", () => {
  const edu = document.querySelector(".edu");
  const lang = document.querySelector(".languages");
  const interests = document.querySelector(".interests");
  const add = document.querySelector(".add");
  const skills = document.querySelector(".skills");
  const conts = document.querySelector(".contacts");
  const img = document.querySelector(".header__img");

  async function addEducation (url) {
    return await fetch(url)
      .then(data => data.json());
  }

  addEducation('./info.json')
    .then(data => {

      data.edu.forEach(element => {
        if(element.link) {
          edu.insertAdjacentHTML("afterend", `
          <div class="main__block pad">
              <h4 class="main__caption">${element.name}</h4>
              <a href="${element.link}">
                <p class="main__text">${element.descr}</p>
              </a>
            </div>
          `);
        } else {
          edu.insertAdjacentHTML("afterend", `
          <div class="main__block pad">
              <h4 class="main__caption">${element.name}</h4>
                <p class="main__text">${element.descr}</p>
            </div>
          `);
        }        
      });

      const sk = document.createElement('div');
      sk.classList.add('main__skills', 'pad');
      const skillsString = data.skills.join(', ');
      sk.append(skillsString);
      skills.insertAdjacentElement("afterend", sk);

      const langs = document.createElement('div');
      langs.classList.add('aside__languages', 'pad');
      const langsString = data.languages.join(', ');
      langs.append(langsString);
      lang.insertAdjacentElement("afterend", langs);

      const ints = document.createElement('div');
      ints.classList.add('aside__interests', 'pad');
      const intsString = data.interests.join(', ');
      ints.append(intsString);
      interests.insertAdjacentElement("afterend", ints);
      
      const adds = document.createElement('div');
      adds.classList.add('main__additional', 'pad');
      add.insertAdjacentElement("afterend", adds);
      adds.insertAdjacentHTML("afterend", data.add);

      
      const contacts = document.createElement('div');
      contacts.classList.add("aside__contacts");
      data.contacts.socials.forEach(social => {
        contacts.insertAdjacentHTML('beforeend', `
        <a class="aside__link" href="${social[1]}">
          ${social[0]}
        </a>
        `)
      });
      conts.insertAdjacentElement('afterend', contacts);
      conts.insertAdjacentHTML('afterend', `
        <a class="aside__link" href="tel:${data.contacts.tel}">
          ${data.contacts.tel}
        </a>
        <a class="aside__link" href="mailto:${data.contacts.email}">E-mail</a>
      `);

      const image = document.createElement('div');
      image.insertAdjacentHTML('beforeend', `
      <img src="${data.image}" alt="${data.imagealt}">
      `);
      img.append(image);

    });




});