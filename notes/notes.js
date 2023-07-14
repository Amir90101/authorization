

const form = document.getElementById('contact-form');
const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');
const h2 = document.querySelector('h2');

async function drawUser() {
  const response = await fetch('http://localhost:3000/data');
  const data = await response.json();
  for (let key in data) {
    let datas = data[key];
    if (datas.name === formDataObj.name || datas.sname === formDataObj.sname) {
      h2.textContent = datas.name;
    }
  }
}

async function doForm(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const formObj = Object.fromEntries(form.entries());
  if (!formObj.name) {
    console.log('dont worked')
    return;
  }
  formObj.userId = userId;

  await fetch('http://localhost:3000/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formObj),
  });
  drawInfo();
}

form.addEventListener('submit', doForm);

let div = document.querySelector('div');

async function drawInfo() {
  const response = await fetch('http://localhost:3000/dataa');
  const data = await response.json();
  div.innerHTML = '';



  for (let key in data) {
    let datas = data[key];


    if (datas.userId === userId) {
      let divv = document.createElement('div');
      divv.id = key;
      div.appendChild(divv);
      let p = document.createElement('p');
      p.setAttribute('userId', userId);
      p.innerHTML = datas.name;
      divv.appendChild(p);
      let btnEdit = document.createElement('button');
      btnEdit.innerHTML = 'Edit';
      btnEdit.addEventListener('click', (function (editKey) {
        
        
        
        return function () {
          editInfo(editKey, datas.name);
        };
      })(key));
      divv.appendChild(btnEdit);
      let btnDelete = document.createElement('button');
      btnDelete.innerHTML = 'delete';
      btnDelete.addEventListener('click', () => {
        deleteInfo(key);
      });
      divv.appendChild(btnDelete);
    }
  }
}



drawInfo();



async function deleteInfo(id) {
  try {
    const response = await fetch(`http://localhost:3000/dataa/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const divToRemove = document.getElementById(id);
      if (divToRemove) {
        divToRemove.remove();
      }
    } else {
      console.error('не удалилось', response.status);
    }
  } catch (error) {
    console.error(error);
  }
}



async function editInfo(id, name) {
  const newName = prompt('new edit:', name);
  if (newName) {
    try {
      const response = await fetch(`http://localhost:3000/dataa/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      if (response.ok) {
        drawInfo();
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
