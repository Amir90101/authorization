

// const form = document.getElementById('contact-form');

// async function submitForm(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const formDataObj = Object.fromEntries(formData.entries());
  
//   if (!formDataObj.name || !formDataObj.sname) {
//     console.log('НЕ РАБОТАЕТ');
//     return; 
//   }
  
//   const response = await fetch('http://localhost:3000/data');
//   const data = await response.json();
//   console.log(data);
  
//   let found = false;
  
//   for (let key in data) {
//     let datas = data[key];
    
//     if (datas.name === formDataObj.name && datas.sname === formDataObj.sname) {
//       found = true;
//       userId = key
//       console.log(userId)
//       break;
//     }
//   }
  
//   if (found) {
//     console.log("найдено");
//     window.location.href = "http://localhost:3000/notes?userId=" + userId;
//   } else {
//     console.log("не найдено");
//   }
// }

// form.addEventListener('submit', submitForm);








const form = document.getElementById('contact-form');

async function doForm(event) {
  event.preventDefault();
  const formAA = new FormData(event.target);
  const formObj = Object.fromEntries(formAA.entries());
  
  if (!formObj.email || !formObj.password) {
    return; 
  }
  
  const response = await fetch('http://localhost:3000/data');
  const data = await response.json();
  
  let found = false;
  
  for (let key in data) {
    let dataKey = data[key];
    
    if (dataKey.email === formObj.email && dataKey.password === formObj.password) {
      found = true;
      userId = key
      break;
    }
  }
  
  if (found) {
    window.location.href = "http://localhost:3000/notes?userId=" + userId;
  } else {
    window.location.href = "http://localhost:3000/"; 
  }
}

form.addEventListener('submit', doForm);