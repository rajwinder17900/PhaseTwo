//getting the add button from html document
let btn = document.getElementById("addButton");

//selecting the ul from the html document
let ul = document.querySelector('ul');

//defining functionality on add
addButton.onclick = addNewtask;

//this defines everything on add button click
//My delete and add functionality was good
//ADDED CHECKED FUNTIONALITY AND TO TAKE THE SELECTED LI TO THE BOTTOM FUNCTIONALITY AS WELL
function addNewtask() {
  let li = document.createElement("li");
  let textField = document.getElementById("inputtext").value;
  let span = document.createElement('span');
  span.innerHTML = textField;
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "check");
  checkbox.onclick = style;
  li.appendChild(span);
  li.appendChild(checkbox);
  document.getElementById("inputtext").value = "";

  //list item should not be empty
  if (textField === "") {
    alert("Field Cannot be empty!");
  } else {
    document.getElementById("schedule").appendChild(li);
  }

  let dlt = document.createElement("dlt");

  //delete button creation
  let deleteBtn = document.createElement("button");
  deleteBtn.style.backgroundColor = "black";
  deleteBtn.style.color = "gold";
  deleteBtn.innerHTML = "Delete";
  dlt.className = "remove";
  dlt.appendChild(deleteBtn);
  li.appendChild(dlt);

    //delete button functionality
  let remove = document.getElementsByClassName("remove");
  let i;
  for (i = 0; i < remove.length; i++) {
    remove[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
      
    };
  }
}

//taking all the textfields of li to have the line through
function lineThrough() {
  var checkIt = document.getElementsByClassName("check");
  for (let i = 0; i < checkIt.length; i++) {
      checkIt[i].addEventListener("click", style);
  }
}

//defining the styling of the li element here
function style(e) {
  let clicked = e.target.parentElement;
  let get = e.target.previousElementSibling;
  get.classList.toggle("check");
  ul.appendChild(clicked);
}

//USING PAYMENT REQUEST API BECAUSE I DO NOT WANT ANYONE TO USE MY TO-DO FUNCTIONALITY FOR FREE
//I NEED MY PAYMENT.. LOL
let moneyButton = document.getElementById('paymentRequest');

//Adding event on payment button clicked
moneyButton.addEventListener('click', needMyPay);

//integrating payment request API
function needMyPay() {
    if (window.PaymentRequest) {

        let supportedMethodsToPay = [{
            supportedMethods: ["basic-card"],
            data: {
              supportedNetworks: ["visa", "mastercard"]
            }
        }];

        let paymentDescription = {
            total: {
                label: "My TO-DO list charges",
                amount: {
                    currency: 'CAD',
                    value: 20
                }
            }
        };

        let paymentRequesting = new PaymentRequest(supportedMethodsToPay, paymentDescription);
        paymentRequesting.show();

    } else {
        alert('You have some issues with the payment, resolve it and then come 😥');
    }
}

//weather api
let cityName = document.getElementById('city');
let submit = document.getElementById('button')
let name = document.getElementById('cityNm');
let desc = document.getElementById('description');
let temp = document.getElementById('tmp');
let wSpeed = document.getElementById('speed');
let wDegree = document.getElementById('degree');
let country = document.getElementById('country');
console.log(submit);

submit.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&appid=5a9276bfd3a21a044a2251db564a92db')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let nameOfCity = data['name'];
          name.innerHTML = nameOfCity;
          let tempr = data['main']['temp'];
          let countryWeather = data['sys']['country'];
          let description = data['weather'][0]['description'];
          let windDegree = 'Wind Degree- ' + data['wind']['deg']
          let windSpeed = 'Wind Speed- ' + data['wind']['speed']

          country.innerHTML = 'Country- ' + countryWeather
          temp.innerHTML = tempr;
          desc.innerHTML = description;
          wSpeed.innerHTML = windSpeed
          wDegree.innerHTML = windDegree
    })
    .catch(err => alert('Incorrect city name..'))
  })
