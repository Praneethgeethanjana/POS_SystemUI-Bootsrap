function textFillItem(){
    $('#tItem>tr').off("click");
    $('#tItem>tr').on("click",function(){
        $('#ItemCode').val($($(this).children().get(0)).text());
        $('#Description').val($($(this).children().get(1)).text());
        $('#UnitPrice').val($($(this).children().get(2)).text());
        $('#Qty').val($($(this).children().get(3)).text());
    });
}
textFillItem();

function clearItem(){
    $('#ItemCode').val(null);
    $('#Description').val(null);
    $('#UnitPrice').val(null);
    $('#Qty').val(null);
}
clearItem();


$("#ItemCode").keypress(function (e) {
    $("#ItemCode").css("box-shadow", "none");
    $('#Description').val("");
    $('#UnitPrice').val("");
    $('#Qty').val("");
  });

  $("#Description").keypress(function (e) {
    $("#Description").css("box-shadow", "none");
  });

  $("#UnitPrice").keypress(function (e) {
    $("#UnitPrice").css("box-shadow", "none");
  });

  $("#Qty").keypress(function (e){
      $("#Qty").css('box-shadow','none');
  });
  

  
  $("#Description").on('keyup', function (f) {
    if (f.key == "Enter") {
        $('#UnitPrice').focus();
    }
  });

  $("#UnitPrice").on('keyup', function (f) {
    if (f.key == "Enter") {
        $('#Qty').focus();
    }
  });


    /*Prevent Default*/
$('#ItemCode,#Description,#UnitPrice,#Qty').on('keydown',function (event) {
    if(event.key=='Tab'){
        event.preventDefault();
    }
});

// ***************** Events ***********************
// Save
        $('#itemAdd').click(function () {
            if($('#ItemCode').val()=="" ||$('#Description').val()=="" || $('#UnitPrice').val()=="" || $('#Qty').val()=="" ){
                alert("Please Fill Required Fields")
            }else{

            let ic=/^(IT)[0-9]{1,3}$/;
            let ides=/^[A-z]{1,}$/;
            let ipri=/^[0-9]{1,}.[0-9]{2}$/;
            let iq=/^[0-9]{1,}$/;

            if(ic.test($("#ItemCode").val())){
                if(ides.test($("#Description").val())){
                    if(ipri.test($("#UnitPrice").val())){
                        if(iq.test($("#Qty").val())){    

                            let icode = $("#ItemCode").val();
                            let idescription = $("#Description").val();
                            let iprice = $("#UnitPrice").val();
                            let iqty = $("#Qty").val();
                
                        let res = saveItem(icode, idescription,iprice,iqty);
                        if(res)clearItem();
                        loadAllIt();
                        textFillItem();
                        }else{
                            $('#Qty').focus();
                            $('#Qty').css('box-shadow','0px 0px 2px 2px red');
                            $('#Qty').val("");
                            alert('Please Fill Valid Qty');
                        }

                    }else{
                        $('#UnitPrice').focus();
                        $('#UnitPrice').css('box-shadow','0px 0px 2px 2px red');
                        $('#UnitPrice').val("");
                        alert('Please Fill Valid Unit Price');

                    }

                }else{
                    $('#Description').focus();
                    $('#Description').css('box-shadow','0px 0px 2px 2px red');
                    $('#Description').val("");
                    alert('Please Fill Valid Description');
                }

            }else{
                $('#ItemCode').focus();
                $('#ItemCode').css('box-shadow','0px 0px 2px 2px red');
                $('#ItemCode').val("");
                alert('Please Fill Valid ItemCode');
         }
    }
});

// ****************** Search 
$("#ItemCode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#ItemCode").val(item.getItemCode());
            $("#Description").val(item.getDescription());
            $("#UnitPrice").val(item.getUnitPrice());
            $("#Qty").val(item.getQty());
        } else {
           $('#Description').focus();
           textFillItem();          
        }
    }
});
// *****************  Delete  ******** 
$('#itemDelete').click(function(){
    let icode = $('#ItemCode').val();
    let option=confirm(`Do you want to delete ID:${icode}`);
    if(option){
        let res =deleteItem(icode);
        if(res){
            alert('Customer Deleted');
        }else{
            alert("Delete Failed");
        }
    }
    loadAllItemToTheTable();
    clearItem();
    textFillItem();
});

$("#itemUpdate").click(function () {
    let code = $("#ItemCode").val();
    let description = $("#Description").val();
    let price = $("#UnitPrice").val();
    let qty = $("#Qty").val();

    let option=confirm(`Do you want to Update Item :${code}`);
    if (option){
       let res= updateItem(code, description, price, qty);
       if (res){
           alert("Item Updated");
       }else{
           alert("Update Faild");
       }
    }
    loadAllItemToTheTable();
    clearItem();
    textFillItem();
});

        //***********  Functions - CRUD operations  *************
// save item
function saveItem(code, description, price, qty) {
    let item = new ItemDTO(code, description, price, qty);
    itemTable.push(item);// item aded
    // load the table
    loadAllItemToTheTable();
    return true;
}

// search item
function searchItem(code) {
    for (var i in itemTable) {
        if (itemTable[i].getItemCode() == code) return itemTable[i];
    }
    return null;
}
// Delete Item
function deleteItem(code){
    let item = searchItem(code);
    if(item != null){
        let indexnumber = itemTable.indexOf(item);
        itemTable.splice(indexnumber,1);
        return true;
    }else{
        return false;
    }
}
// Update Item
function updateItem(code, description, price, qty) {
    let item = searchItem(code);
    if (item != null) {
        item.setDescription(description)
        item.setUnitPrice(price)
        item.setQty(qty);
        return true;
    } else {
        return false;
    }
}
//get all items
function getAllItems() {
    return itemTable;
}


function loadAllItemToTheTable(){
    let allItems = getAllItems();
    $('#tItem').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let description = allItems[i].getDescription();
        let price = allItems[i].getUnitPrice();
        let qty = allItems[i].getQty();

        var row = `<tr><td>${code}</td><td>${description}</td><td>${price}</td><td>${qty}</td></tr>`;
        $('#tItem').append(row); 
    }
    // textFill();
}


  
  