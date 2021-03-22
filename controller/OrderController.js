








var d=new Date();
var strDate=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
$('#txtDate').text(strDate);

/*Genarate Order ID*/
function genarateOrderID() {
    if(orderTable.length==0){
        $("#txtOrderID").val("OR-001");
    }else{
        let lastOrderID=orderTable[orderTable.length - 1].getOrderID();
        let newOrderID=number.parseInt(lastOrderID.substring(3,6)) + 1;
        if(newOrderID<10){
            newOrderID="OR-00" +newOrderID;
        }else if(newOrderID<100){
            newOrderID="OR-0" +newOrderID;
        }
        $("#txtOrderID").val(newOrderID);
    }
}


// load all customers to dropdown
function loadAllCus(){
    let data;
    $('#selectCusID').empty();

    for (var i = 0; i < customerTable.length; i++) {
        data =`<option value="${customerTable[i].getCustomerID()}">${customerTable[i].getCustomerID()}</option>`;
        $('#selectCusID').append(data);
    }
}

// add data to textfields from selected cus id
$('#selectCusID').on('click',function(data){
    let selectedValue = $('#selectCusID :selected').val();

    for (var i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCustomerID()==selectedValue) {
            $('#orderCustomerName').val(customerTable[i].getCustomerName());
            $('#orderCustomerAddress').val(customerTable[i].getCustomerAddress());
            // $('#orderCustomerAge').val(customerTable[i].getCustomerAge());
            $('#orderCustomerSalary').val(customerTable[i].getCustomerSalary());
        }
    }
});

// load all Items to dropdown
function loadAllIt(){
    let data;
    $('#selectItemCode').empty();

    for (var i = 0; i < itemTable.length; i++) {
        data =`<option value="${itemTable[i].getItemCode()}">${itemTable[i].getItemCode()}</option>`;
        console.log(data);

        $('#selectItemCode').append(data);
    }
}

// add data to textfields from selected cus id
$('#selectItemCode').on('click',function(data){
    let slectedValue = $('#selectItemCode :selected').val();

    for (var i = 0; i < itemTable.length; i++) {
        if (itemTable[i].getItemCode()==slectedValue) {
            $('#txtItemDescription').val(itemTable[i].getDescription());
            $('#txtQTYOnHand').val(itemTable[i].getQty());
            $('#txtItemPrice').val(itemTable[i].getUnitPrice());
        }
    }
});
