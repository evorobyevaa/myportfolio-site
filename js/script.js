"use strict"

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          alert('Спасибо за ваше обращение! Вернусь с обратной связью совсем скоро!');
          form.reset();
          form.classList.remove('_sending');
        } else {
          alert('Ошибка');
          form.classList.remove('_sending');
        }
      }).catch(error => {
        alert('Ошибка');
      });
    } else {
      alert('Заполните обятательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('._email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  const menuBtn = document.querySelector('.menu__burger');
  const menu = document.querySelector('.menu__list');
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  })
  menu.addEventListener('click', function() {
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
  })

})