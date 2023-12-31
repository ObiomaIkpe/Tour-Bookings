console.log('hello from parcel!')

//import '@babel/polyfill';
import { displayMap } from './mapbox';
import {login, logout} from './login';
import {updateData} from './updateSettings'
//DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');





//DELEGATION
if (mapBox){
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    //VALUES
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
    login(email, password)
}
)}

if(logOutBtn) {
  logOutBtn.addEventListener('click', logout) 
}
  
if(userDataForm){
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateData(name, email);
  })
 }
    
if(userPasswordForm){
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').value = 'updating...';

    const password = document.getElementById('password').value();
    const passwordCurrent = document.getElementById('password-current').value();
    await updateSettings({password, passwordConfirm}, 
      'password' );

      document.querySelector('.btn--save-password').textContent = 'updating...'; 
      document.getElementById('password').value = '';
      document.getElementById('password-current').value = '';
    })
}
  