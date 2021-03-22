


//text field load
function textFillCustomer(){
    $('#tCus>tr').off("click");
    $('#tCus>tr').on("click",function(){
        $('#CustomerID').val($($(this).children().get(0)).text());
        $('#CustomerName').val($($(this).children().get(1)).text());
        $('#CustomerAddress').val($($(this).children().get(2)).text());
        $('#Salary').val($($(this).children().get(3)).text());
    });
}
textFillCustomer();

function clearCus(){
    $('#CustomerID').val(null);
    $('#CustomerName').val(null);
    $('#CustomerAddress').val(null);
    $('#Salary').val(null);
}
clearCus();


$("#CustomerID").keypress(function (e){
    $("#CustomerID").css("box-shadow", "none");
    $('#CustomerName').val(null);
    $('#CustomerAddress').val(null);
    $('#Salary').val(null);
    
  });
  $("#CustomerName").keypress(function (e) {
    $("#CustomerName").css("box-shadow", "none");
  });
  $("#Salary").keypress(function (e) {
    $("#Salary").css("box-shadow", "none");
  });



  $("#CustomerName").on('keyup', function (f) {
    if (f.key == "Enter") {
        $('#CustomerAddress').focus();
    }
  });

  $("#CustomerAddress").on('keyup', function (f) {
    if (f.key == "Enter") {
        $('#Salary').focus();
    }
  });


  /*Prevent Default*/
$('#CustomerID,#CustomerName,#CustomerAddress,#Salary').on('keydown',function (event) {
    if(event.key=='Tab'){
        event.preventDefault();
    }
});

// ******************  Events **********************
// ***************  Add 

$('#cusAdd').click(function () {
   if($('#CustomerID').val()=="" ||$('#CustomerName').val()=="" || $('#CustomerAddress').val()=="" || $('#Salary').val()=="" ){
       alert("Please Fill Required Fields")
   }else{

    let regID=/^(C)[0-9]{1,3}$/;
    let cName=/^[A-z]{1,}$/;
    let cSalary=/^[0-9]{1,}.[0-9]{2}$/;

    if(regID.test($('#CustomerID').val())){
        if(cName.test($('#CustomerName').val())){
                if(cSalary.test($('#Salary').val())){

                    let cusID = $("#CustomerID").val();
                    let cusName = $("#CustomerName").val();
                    let cusAddress = $("#CustomerAddress").val();
                    let cusSalary = $("#Salary").val();
                
                    let res = saveCustomer(cusID,cusName, cusAddress,cusSalary);
                    if(res)clearCus();
                    loadAllCus();
                    textFillCustomer();

                }else{
                    $('#Salary').focus();
                    $('#Salary').css('box-shadow','0px 0px 2px 2px red');
                    $('#Salary').val("");
                    alert('Please Fill Valid Salary');
                }
        }else{
            $('#CustomerName').focus();
        $('#CustomerName').css('box-shadow','0px 0px 2px 2px red');
        $('#CustomerName').val("");
        alert('Please Fill Valid CustomerName');
        }     
    }else{
     
        $('#CustomerID').focus();
        $('#CustomerID').css('box-shadow','0px 0px 2px 2px red');
        $('#CustomerID').val("");
        alert('Please Fill Valid CustomerID');
        
    }
}
});


// *************** Search ***************************

$("#CustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#CustomerName").val(customer.getCustomerName());
            $("#CustomerAddress").val(customer.getCustomerAddress());
            $("#Salary").val(customer.getCustomerSalary());
        } else {
           
            $('#CustomerName').focus();
            textFillCustomer();
        }
    }
});

//*******************Delete *********************** */
$("#cusDelete").click(function () {
    let cusID = $("#CustomerID").val();
    let option=confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }
    }
    loadAllCustomerToTheTable();
    clearCus();
    textFillCustomer();
});

//******************** Update **********************/
$("#cusUpdate").click(function () {
    let cusID = $("#CustomerID").val();
    let cusName = $("#CustomerName").val();
    let cusAddress = $("#CustomerAddress").val();
    let cusSalary = $("#Salary").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
       let res= updateCustomer(cusID, cusName, cusAddress, cusSalary);
       if (res){
           alert("Customer Updated");
       }else{
           alert("Update Faild");
       }
    }
    loadAllCustomerToTheTable();
    clearCus();
    textFillCustomer();

});


// ****************

//***********  Functions - CRUD operations  *************
// save customer
function saveCustomer(id, name, address, salary) {
    let customer = new CustomerDTO(id, name, address, salary);
    customerTable.push(customer);// customer aded
    // load the table
    loadAllCustomerToTheTable();
    return true;
}

// search customer
function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}
//delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// Update Customer
function updateCustomer(id, name, address, salary) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        return true;
    } else {
        return false;
    }
}


//get all customers
function getAllCustomers(){
    return customerTable;
}


function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('#tCus').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;
        $('#tCus').append(row); 
    }
    // textFillCustomer();
}

