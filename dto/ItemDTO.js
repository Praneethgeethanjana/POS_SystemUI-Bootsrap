function ItemDTO(code, description, price, qty) {
    var __code = code;
    var __description = description;
    var __price = price;
    var __qty = qty;


    this.getItemCode = function () {
        return __code;
    }
    this.getDescription = function () {
        return __description;
    }
    this.getUnitPrice = function () {
        return __price;
    }
    this.getQty = function () {
        return __qty;
    }



    this.setItemCode = function (newCode) {
        __code = newCode;
    }
    this.setDescription = function (newDescription) {
        __description = newDescription;
    }
    this.setUnitPrice = function (newPrice) {
        __price = newPrice;
    }
    this.setQty = function (newQty) {
        __qty = newQty;
    }
}