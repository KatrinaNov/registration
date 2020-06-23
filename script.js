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


const render = function(item) {
    let userItem = document.createElement('li');
    userItem.innerHTML = `Имя: ${item.userFullName.split(' ')[0]}, фамилия: ${item.userFullName.split(' ')[1]}, зарегистрирован: ${item.date}`;
    userList.append(userItem);  
};

let users = JSON.parse(localStorage.getItem('users')) || [];

signUpBtn.addEventListener('click', function(){
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

  do {
    b = prompt('Введите ваш логин');
    if (b === '') {
      alert('Логин обязателен к заполнению');
    }
  } while (b === '' || b === null);

  do {
    c = prompt('Введите пароль');
    if (c === '') {
      alert('Без пароля никак');
    }
  } while (c === '' || c === null);
      

  let userData = {};
  userData.userFullName = a;
  userData.login = b;
  userData.password = c;
  userData.date = formatter.format(new Date());

  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));


    render(userData);


  console.log(users);

});

console.log(users);
users.forEach(function(item) {
  render(item);
});











