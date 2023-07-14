const form = document.getElementById('contact-form');

async function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  const response = await fetch('http://localhost:3000/data');
  const data = await response.json();
  console.log(data);
  if (
    !formDataObj.name ||
    !formDataObj.sname ||
    !formDataObj.email
  ) {
    console.log('dont worked');
    return false;
  }

  let emailExists = false;

  for (let key in data) {
    let datas = data[key];
    if (datas.email === formDataObj.email || datas.name === formDataObj.name) {
      emailExists = true;
      alert("email already have");
      break;
    }
  }

  if (!emailExists) {
    await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body: JSON.stringify(formDataObj),
    });
    window.location.href="http://localhost:3000/loginIn"
  }

  return false;
}

form.addEventListener('submit', submitForm);;





