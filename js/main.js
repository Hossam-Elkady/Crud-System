var pName = document.getElementById("productName");
var pCategory = document.getElementById("productCategory");
var pPrice = document.getElementById("productPrice");
var pDescription = document.getElementById("productDescription");
var inputs = document.getElementsByClassName("form-control");
var addEditBtn = document.getElementById("add-editBtn")
var searchInp= document.getElementById("search")
var Btn= document.getElementById("Btn")
var products = [];

JSON.parse(localStorage.getItem("productsList"));

if (JSON.parse(localStorage.getItem("productsList")) != null) {
    products = JSON.parse(localStorage.getItem("productsList"));
    display();
}



function addBtn(){
    addProduct();
    clearForm();
    display();
}

pName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,10}$/
    if(!nameRejex.test(pName.value)){
        Btn.disabled="true"
        pName.classList.add("is-invalid")
        pName.classList.remove("is-valid")
        document.getElementById("nameValidation").classList.remove("d-none")
    }
    else{
        Btn.removeAttribute("disabled")
        pName.classList.add("is-valid")
        pName.classList.remove("is-invalid")
        document.getElementById("nameValidation").classList.add("d-none")
    }
    if (pName.value==""){
        pName.classList.remove("is-invalid")
        document.getElementById("nameValidation").classList.add("d-none")

    }
}

pCategory.onkeyup=function(){
    var categoryRejex=/^[A-Z][a-z]{2,10}$/
    if(!categoryRejex.test(pCategory.value)){
        Btn.disabled="true"
        pCategory.classList.add("is-invalid")
        pCategory.classList.remove("is-valid")
        document.getElementById("categoryValidation").classList.remove("d-none")
    }
    else{
        Btn.removeAttribute("disabled")
        pCategory.classList.add("is-valid")
        document.getElementById("categoryValidation").classList.add("d-none")
        pCategory.classList.remove("is-invalid")
    }
    if (pCategory.value==""){
        document.getElementById("categoryValidation").classList.add("d-none")
        pCategory.classList.remove("is-invalid")
    }
}

pPrice.onkeyup=function(){
    var priceRejex=/^[0-9]{1,10}$/
    if(!priceRejex.test(pPrice.value)){
        Btn.disabled="true"
        document.getElementById("priceValidation").classList.remove("d-none")
        pPrice.classList.add("is-invalid")
        pPrice.classList.remove("is-valid")
    }
    else{
        Btn.removeAttribute("disabled")
        pPrice.classList.add("is-valid")
        document.getElementById("priceValidation").classList.add("d-none")
        pPrice.classList.remove("is-invalid")
    }
    if(pPrice.value==""){
        pPrice.classList.remove("is-invalid")
        document.getElementById("priceValidation").classList.add("d-none")
    }
}


function addProduct() {
    var product =
    {
        productName: pName.value,
        productCategory: pCategory.value,
        productPrice: pPrice.value,
        productDescription: pDescription.value
    }
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
}

function display() {
    var container = "";
    for (var i = 0; i < products.length; i++) {
        container += `<tr>
                        <td>${(i + 1)}</td>
                        <td>${products[i].productName}</td>
                        <td>${products[i].productCategory}</td>
                        <td>${products[i].productPrice}</td>
                        <td>${products[i].productDescription}</td>
                        <td class="text-center"><button class='bg-danger' onclick="deleteProduct(${i})">Delete</button></td>
                        <td class="text-center"><button class='bg-warning' onclick="editProduct(${i})">Edit</button></td>
                    </tr>`
    }
    document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(index) {
    products.splice(index, 1)
    display();
    localStorage.setItem("productsList", JSON.stringify(products));
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}


searchInp.onkeyup=function(){
    var container = "";
    var val = searchInp.value;
    for (var i = 0; i < products.length; i++) {
        if (products[i].productName.toLowerCase().includes(val.toLowerCase())) {

            container += `<tr>
                            <td>${(i + 1)}</td>
                            <td>${products[i].productName}</td>
                            <td>${products[i].productCategory}</td>
                            <td>${products[i].productPrice}</td>
                            <td>${products[i].productDescription}</td>
                            <td class="text-center"><button class='bg-danger' onclick="deleteProduct(${i})">Delete</button></td>
                            <td class="text-center"><button class='bg-warning' onclick="editProduct(${i})">Edit</button></td>
                        </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = container;
}



var tempIndex;

function editProduct(index) {
    pName.value = products[index].productName;
    pPrice.value = products[index].productPrice;
    pCategory.value = products[index].productCategory;
    pDescription.value = products[index].productDescription;
    tempIndex = index;
    addEditBtn.innerHTML = `<button onclick="update()" class="btn btn-warning py-3 px-3 border-0 mt-5" id="Btn">Update Product</button>`;
}

function update() {
    tempProduct =
    {
        productName: pName.value,
        productCategory: pCategory.value,
        productPrice: pPrice.value,
        productDescription: pDescription.value
    }
    products.splice(tempIndex, 1, tempProduct)
    localStorage.setItem("productsList", JSON.stringify(products));
    addEditBtn.innerHTML = `<button onclick="addBtn()" class="btn btn-info py-3 px-4 border-0 mt-5" id="Btn">Add Product</button>`;
    display();
    clearForm();
}

