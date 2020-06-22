'use strict';

const userNameBlock = document.querySelector('.name'),
      signUpBtn = document.querySelector('.signUp'),
      logInBtn = document.querySelector('.logIn'),
      userList = document.querySelector('.userList');

let date = new Date();

let formatter = new Intl.DateTimeFormat("ru", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

const render = function(userName, userSurname) {
  let userItem = document.createElement('li');
  userItem.innerHTML = `${userName}, ${userSurname}, ${formatter.format(date)}`;
  userList.append(userItem);
};

let users =[] || JSON.parse(localStorage.getItem('users'));

signUpBtn.addEventListener('click', function(){
  let a = prompt('Введите ваше имя и фамилию через пробел', 'Иван Иванов'),
      b = prompt('Введите ваш логин'),
      c = prompt('Введите пароль');

  let userData = {};
  userData.userFullName = a;
  userData.login = b;
  userData.password = c;

  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));

  let userName = userData.userFullName.split(' ')[0],
    userSurname = userData.userFullName.split(' ')[1];
  render(userName, userSurname);

  console.log(users);

});









