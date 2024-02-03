import people from '../Data/people.js' 

let varsPageURL = window.location.search.substring(1);

let index;

try{
  if(varsPageURL.length !== 0){
    index = varsPageURL;
  }
  else{
    index = 1;
  }
}
catch{
  index = 1;
}


console.log(index);

index -= 1;

let name = people[index].First_Name + ' ' + people[index].Last_Name;
let number;
try{
  number = people[index].phone_numbers.substr(0,14);
}
catch{
  number = "(___) ___ - ___";
}

let price = priceToApprox(people[index]['Estimated Price per Month']);
let address = people[index].address1 + ', ' + people[index].city_state_zip;

let name_input = document.querySelector('.js-name');
name_input.placeholder = name;

let name_width = getTextWidth(name + "f");
name_input.style.width = name_width;

let nameElement = document.querySelector('.js-name');
nameElement.addEventListener('focus', () => {
  nameElement.placeholder = ''; 
});
nameElement.addEventListener('keyup', () => {
  name_input.style.width = getTextWidth(nameElement.value + "ff");
});


let number_input = document.querySelector('.js-number');
number_input.placeholder = number;

let number_width = getTextWidth(number);
number_input.style.width = number_width;

let numberElement = document.querySelector('.js-number');
numberElement.addEventListener('focus', () => {
  numberElement.placeholder = '';
});
numberElement.addEventListener('keyup', () => {
  number_input.style.width = getTextWidth(numberElement.value);
});

document.querySelector('.js-price').innerHTML = price;
let priceElement = document.querySelector('.js-money');

sendText(false);

let buttonElement = document.querySelector('.js-submit');
buttonElement.addEventListener('click', () =>{
  
  nameElement.value === "" ? name=name : name = nameElement.value;
  numberElement.value === "" ? number=number : number = numberElement.value;
  priceElement.value === "" ? price=price : price = priceElement.value;
  //console.log("Name: " + name + " Number: " + number + " Price: " + price);
  sendText(true);

  document.querySelector('.content').innerHTML = 
  `
  <img src="./images/check.png" class="check">
      <div class="update">Thanks for Updating Your Information!</div>
      <div class="call">Expect Our Call Soon!</div>
  `;

});

function sendText(edit){
  var xml = new XMLHttpRequest();
  xml.open("POST", "https://sandeshz.pythonanywhere.com/users", true);
  //xml.open("POST", "http://127.0.0.1:5000/users", true);
  // xml.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5000/users");
  // xml.setRequestHeader("Access-Control-Allow-Origin", "POST, GET, PUT");
  // xml.setRequestHeader("Access-Control-Allow-Origin", "Content-type");
  //xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  let data;

  if (!edit){
    data = {
      'from':'Mailer Campaign',
      'index':index + 1,
      'name':name,
      'number':number,
      'monthly':price,
      'address':address
    }
  }
  else{
    data = {
      'from':'Mailer Campaign - USER EDIT',
      'index':index + 1,
      'name':name,
      'number':number,
      'monthly':price,
      'address':address
    }
  }
  let dataSend = JSON.stringify(data);

  xml.send(dataSend);
}

function priceToApprox(price){
  let approx;
  approx = Math.round(price);
  approx = Math.floor(approx/50)*50;

  return '$' + approx.toString() + ' - $' + (approx + 50).toString();
}

function getTextWidth(content) { 
     
  let text = document.createElement("span"); 
  document.body.appendChild(text); 

  text.style.font = "Arial"; 
  text.style.fontSize = 100 + "px"; 
  text.style.height = 'auto'; 
  text.style.width = 'auto'; 
  text.style.position = 'absolute'; 
  text.style.whiteSpace = 'no-wrap'; 
  text.innerHTML = content; 

  let width = Math.ceil(text.clientWidth); 
  let formattedWidth = (width + 70) + "px"; 

  // document.querySelector('.output').textContent 
  //         = formattedWidth; 
  document.body.removeChild(text);
  
  return formattedWidth;
} 
