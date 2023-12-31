let form = document.getElementById("form");
let submiteButton=document.querySelector('#form > button')

let tbody = document.getElementById("tbody");

let employeeArr = [];

let editoption = {
  editEmpolye: false,
  rowEle: null,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let empolyee = {
    empid: form.empid.value,
    name: form.name.value,
    email: form.email.value,
  };
  if (editoption.editEmpolye) {
    editRecord(empolyee);
  } else {
    addempolyee(empolyee);
  }
  searchFun(empolyee);
  employeeArr.push(empolyee);
  form.reset();
});

function addempolyee(empolyee) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${empolyee.empid}</td>
    <td>${empolyee.name}</td>
    <td>${empolyee.email}</td>
    <td>
    <button type="button" onclick="editEmp(this)" data-empid='${empolyee.empid}' class="btn btn-primary">Edit</button>
    <button type="button" onclick="deleteEmp(this)" data-empid='${empolyee.empid}'  class="btn btn-danger">Delete</button>
    </td>
    `;
  tbody.appendChild(tr);
}

function deleteEmp(buttonRef) {
  let ele = buttonRef.parentNode.parentNode;
  //   console.log(ele);

  ele.remove();
}

function editEmp(buttonRef) {
  let row = buttonRef.parentNode.parentNode;
  let td = row.querySelectorAll("td");

  let empolyee = {
    empid: td[0].innerText,
    name: td[1].innerText,
    email: td[2].innerText,
  };
 submiteButton.innerText='Update'
  prefillform(empolyee);
  editoption = {
    editEmpolye: true,
    rowEle: row,
  };
}

function prefillform(empolyee) {
  for (let x in empolyee) {
    form[x].value = empolyee[x];
  }
}

function editRecord(empolyee) {
  let ro = editoption.rowEle;

  let cells = ro.querySelectorAll("td");
  cells[0].innerText = empolyee.empid;
  cells[1].innerText = empolyee.name;
  cells[2].innerText = empolyee.email;
  submiteButton.innerText='Submit'
  editoption = {
    editEmpolye: false,
    rowEle: null,
  };
}

// // serach

function searchFun() {
  let searchitem = document.getElementById("searchBar");
  let filteremp = employeeArr.filter((emplo) =>
    emplo.name.toUpperCase().includes(searchitem.value.toUpperCase())
  );
  console.log(filteremp);
}


