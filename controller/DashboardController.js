
hideAll();
$('#customer-section').css('display','block');

$('#link-customer').click(function(){
hideAll();
$('#customer-section').css('display','block');
$('#CustomerID').focus();
});

$('#link-item').click(function(){
hideAll();
$('#item-section').css('display','block');
$('#ItemCode').focus();
});

$('#link-order').click(function(){
hideAll();
$('#order-section').css('display','block');
genarateOrderID();

});
$('#link-dash').click(function(){
    hideAll();
    $('#dashboard-section').css('display','block');
})


function hideAll(){
    $('#customer-section,#item-section,#order-section,#dashboard-section').css('display','none');
    }
