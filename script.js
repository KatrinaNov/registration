'use strict';

const userNameBlock = document.querySelector('.name'),
      signUpBtn = document.querySelector('.signUp'),
      logInBtn = document.querySelector('.logIn'),
      userList = document.querySelector('.userList');

let formatter = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});
let users = JSON.parse(localStorage.getItem('users')) || [];

// выводит на страницу надпись о регистрации
const render = function() {
  userList.textContent = '';
  users.forEach(function(item) {
    let userItem = document.createElement('li');
    userItem.innerHTML = `Имя: ${item.userFullName.split(' ')[0]}, фамилия: ${item.userFullName.split(' ')[1]}, зарегистрирован: ${item.date} <button class="deleteUser"><img src="img/delete.svg" alt="удалить"></button>`;
    userList.append(userItem);

    const deleteUserButton = userItem.querySelector('.deleteUser');
    deleteUserButton.addEventListener('click', function(){
      userItem.remove();
      users.splice(users.indexOf(item), 1);
      localStorage.setItem('users', JSON.stringify(users));
    });
  });        
};

// регистрация
const signUpUser = function() {
  // ввод имени и фамилии  + проверка на пробелы
  let a, b, c;
  do {
    a = prompt('Введите ваше имя и фамилию через пробел', 'Иван Иванов');
     a = a.trim();
    if (a.lastIndexOf(' ') !== a.indexOf(' ')) {
      alert('Слишком много пробелов');
    }
    if (a.indexOf(' ') === -1) {
      alert('Кажется вы забыли ввести фамилию');
    }
  } while (a === '' || (a.lastIndexOf(' ') !== a.indexOf(' ')) || a.indexOf(' ') === -1);
  // логин
  do {
    b = prompt('Введите ваш логин');
    if (b === '') {
      alert('Логин обязателен к заполнению');
    }
  } while (b === '' || b === null);
// пароль
  do {
    c = prompt('Введите пароль');
    if (c === '') {
      alert('Без пароля никак');
    }
  } while (c === '' || c === null);      
// создаем объект с данными пользователя
  const userData = {
    userFullName: a,
    login: b,
    password: c,
    date: formatter.format(new Date())
  };   
// заносим пользователя в массив и в локалсторедж
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
};
// кнопка Зарегистрироваться
signUpBtn.addEventListener('click', function(){
  signUpUser();
  render();  
});
// кнопка Авторизоваться
logInBtn.addEventListener('click', function(){
  let login, password;  
  // логин
  do {
    login = prompt('Введите ваш логин');
    if (login === '') {
      alert('Логин обязателен к заполнению');
    }
  } while (login === '' || login === null);
// пароль
  do {
    password = prompt('Введите пароль');
    if (password === '') {
      alert('Без пароля никак');
    }
  } while (password === '' || password === null); 
  for (let i = 0; i < users.length; i++) {
    if (login === users[i].login) {
      if (password === users[i].password) {
        userNameBlock.textContent = users[i].userFullName.split(' ')[0];
        break;
      } else {
        alert('неверный пароль!');
      }     
    } else {
      let j = i;
      if (j === users.length-1) {
        alert('Такой пользователь не найден!');
      }
    }    
  }
});

render();
















