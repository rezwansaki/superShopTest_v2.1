//JavaScript

//variable declaration 
var itemSL = 0; //when add a new item then this value will be increase 
var itemRate = 0;
var itemQuantity = 0; 
var priceForOneItem = 0;
var myselectedItem = "";
var itemNotSelected = true; 
var totalPrice = 0; 
var finalResult = "";


//hide some elements at the first time 
function hideButton(){
    $("#btnNext").hide();
    $("#btnUpdate").hide();
    $("#btnSubmit").hide();
    $("#btnNewList").hide();
}


//Function 'addItem' - to add new item 
function addItem() {    
    
    itemSL = itemSL + 1; //this value get a serial number automatically 
    
    //add a new item 
    $('#tbody').append('<tr onclick="getRow(this);" id=itemrow' + itemSL + ' ' + '>                                                                  <td id=editItem' + itemSL + ' ' + '>                                                                                       <input onclick="editItem();" type="checkbox" disabled id=chkbox' + itemSL + ' ' + 'class="chkbox"' + ' '+ 'value=' + itemSL + '></td>                                                                                                                    <td id=slno' + itemSL + ' ' + '>                                                                                             <input type="text" id=input_slno' + itemSL + ' ' + 'class="input_slno"' + ' '+ 'value="' + itemSL + '" disabled></td>                                                                                                                      <td id=item' + itemSL + ' ' + '>                                                                                             <select onchange=getRate() id=myselect' + itemSL + ' ' + 'class="itemNameList"' + ' '+ '>                                 <option value="No Item">No Item</option><option value="Bread">Bread</option><option value="Jelly">Jelly</option><option value="Pen">Pen</option><option value="Pencil">Pencil</option>                                                     </select></td>                                                                                                    <td id=rate' + itemSL + ' ' + '>                                                                                              <input type="text" id=input_rate' + itemSL + ' ' + 'class="input_rate" disabled></td>                            <td id=qntt' + itemSL + ' ' + '>                                                                                              <input type="text" value=1 id=input_qntt' + itemSL + ' ' + 'class="input_qntt" onkeyup="updatePrice();"></td>                                                                                                                    <td id=price' + itemSL + ' ' + '>                                                                                            <input type="text" id=input_price' + itemSL + ' ' + 'class="input_price"' + ' ' + 'value=' + priceForOneItem + '></td>                                                                                                       </tr>'); 
        
    //after click the button 'Add Item' 
    $('#myselect'+itemSL).focus(); //to select first field to control by using keyboard easily 
    $("#btnAddItem").hide();
    $("#btnNext").show();
    $("#btnUpdate").hide();
    $("#btnSubmit").show();
    $("#btnNewList").show();
    
} //End of function 'addItem' - to add new item 


//get row when click any row of the table 
var rowIndex = 0;
function getRow(x){
    if(chkBoxClick == true){
        if(rowIndex>0){ 
            $('#chkbox'+rowIndex).attr('checked', false);   //last click enable and other checked will be unchecked   
            $('#myselect'+rowIndex).prop( "disabled", true );
            $('#input_qntt'+rowIndex).prop( "disabled", true );
        }
        
        rowIndex = x.rowIndex; //get row index of the table 
        $('#myselect'+rowIndex).prop( "disabled", false );
        $('#input_qntt'+rowIndex).prop( "disabled", false );
        chkBoxClick = false;   
    }
}
//editItem helps the getRow function... only click checkbox then it works 
var chkBoxClick = false;
function editItem(){ 
    if($('#btnUpdate').is(":visible")){
        $('.chkbox').removeAttr('checked');     
        $('#myselect'+rowIndex).prop("disabled", true);
        $('#input_qntt'+rowIndex).prop("disabled", true);
        alert("Please, click update button to update that item first!")
    }else{
        chkBoxClick = true;
        $("#btnUpdate").show();
    }
}
//update item 
function updateItem(){
    
    //update get rate 
    myselectedItem = $("#myselect" + rowIndex).val();

    if((myselectedItem == "No Item")){
        $("#input_rate" + rowIndex).hide();
        $("#input_qntt" + rowIndex).hide();
        itemNotSelected = true;
        //alert("Please, select any one item!");
    }else if(myselectedItem=="Bread"){
        $("#input_rate" + rowIndex).val(40);
        itemNotSelected = true;
    }else if(myselectedItem=="Jelly"){
        $("#input_rate" + rowIndex).val(100);
        itemNotSelected = true;
    }else if(myselectedItem=="Pen"){
        $("#input_rate" + rowIndex).val(5);
        itemNotSelected = true;
    }else if(myselectedItem=="Pencil"){
        $("#input_rate" + rowIndex).val(12);
        itemNotSelected = true;
    }
    //update get rate
    
    
    //update one item price
    itemRate = $("#input_rate" + rowIndex).val();
    itemQuantity = $("#input_qntt" + rowIndex).val();
    priceForOneItem = itemRate * itemQuantity;


    var priceFloat = parseFloat(priceForOneItem);
    var priceFloatFixed = priceFloat.toFixed(2);
    $("#input_price" + rowIndex).val(priceFloatFixed);

    //set variable value '0' for new item 
    itemRate = 0;
    itemQuantity = 0;
    priceForOneItem = 0; 
    //update one item price 
    
    $('#chkbox'+rowIndex).attr('checked', false); //uncheck the checkbox
    $('#myselect'+rowIndex).prop( "disabled", true ); //disable the row field 
    $('#input_qntt'+rowIndex).prop( "disabled", true ); //disable the row field
    
    $('#btnUpdate').hide();
    
    getRate(); //it is used in here only for fixing a simple bug 
}

//new list everything will be removed and ready to get new list 
function newList(){
    var r = confirm("Do you wan to make a new list?");
    if (r == true) {
        //if you choose 'OK' then do these         
        location.reload();  //reload browser one time  
    }
}


function getRate() {
    myselectedItem = $("#myselect" + itemSL).val();
    
    if((myselectedItem == "No Item")){
        $("#input_rate" + itemSL).val(0);
        $("#input_qntt" + itemSL).val(1);
        itemNotSelected = true;
        //alert("Please, select any one item!");
    }else if(myselectedItem=="Bread"){
        $("#input_rate" + itemSL).val(40);
        itemNotSelected = false;
    }else if(myselectedItem=="Jelly"){
        $("#input_rate" + itemSL).val(100);
        itemNotSelected = false;
    }else if(myselectedItem=="Pen"){
        $("#input_rate" + itemSL).val(5);
        itemNotSelected = false;
    }else if(myselectedItem=="Pencil"){
        $("#input_rate" + itemSL).val(12);
        itemNotSelected = false;
    }
    
    oneItemPrice();
}


//calculate the price for one item 
function oneItemPrice(){
    itemRate = $("#input_rate" + itemSL).val();
    itemQuantity = $("#input_qntt" + itemSL).val();
    priceForOneItem = itemRate * itemQuantity;


    var priceFloat = parseFloat(priceForOneItem);
    var priceFloatFixed = priceFloat.toFixed(2);
    $("#input_price" + itemSL).val(priceFloatFixed);

    //set variable value '0' for new item 
    itemRate = 0;
    itemQuantity = 0;
    priceForOneItem = 0; 
}


//Quantity value change and update the price for one item 
function updatePrice()
{
    oneItemPrice();
}


//Function 'nextItem' - to calculate for only one item 
function nextItem() { 
    
    updateItem();

    $("#btnUpdate").hide();
    
    if(itemNotSelected == true){ //this is a global variable 
        alert("Please, select any one item!");
    }else {
        //disable item and quantity ater click next item button 
        $("#myselect" + itemSL).attr("disabled", "disabled");
        $("#input_qntt" + itemSL).attr("disabled", "disabled");
        $('#chkbox'+itemSL).attr("disabled",false);

        oneItemPrice(); 

        //call the function 'addItem()' to add new item 
        addItem(); 
        itemNotSelected = true;
    }
    
} //End of function 'nextItem' - to calculate for only one item 

/*================================== Get Date and Time ==========================================*/
//get the current date and time 
var d,m,y,mArray,monthText,fullDate,h,m,ampm,fullTime;
var dateObject = new Date();
function getDate(){
    d = dateObject.getDate();
    m = dateObject.getMonth();
    y = dateObject.getFullYear();

    //get month name 
    mArray = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
    monthText = mArray[m]; //get month name 

    //add zero when date will be less than 10 
    if (d < 10) {
        d = "0" + d;
    }

    fullDate = d + '-' + monthText + '-' + y;
}
//get time with AM or PM 
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getTime() {
    h = addZero(dateObject.getHours());
    m = addZero(dateObject.getMinutes());
    if(h>12){
        ampm='PM';
    }else{
        ampm='AM';
    }
    fullTime = h + ":" + m + " " + ampm;
}
//get the current date and time 
/*================================== Get Date and Time ==========================================*/


//to print only the final result 
function printFinalResult(){
    //to print the final result 
    var finalResultPrint = '';
    for(p=1;p<itemSL;p++){  //get the all data of the table 
        finalResultPrint = finalResultPrint + $("#input_slno" + p).val() + ' - ' + $("#myselect" + p).val() + ' - ' + $("#input_qntt" + p).val() + ' - ' + $("#input_price" + p).val() + ' Taka' + '<br>';   
    }
    
    var finalResultForPrint = "     ABC SUPER SHOP" + '<br>' + fullDate + "\u00A0" + "\u00A0" + "\u00A0" + fullTime + '<br>' + '===========================' + '<br>' + "SL - Item - Quantity - Price " + '<br>' + '===========================' + '<br>' + finalResultPrint + '===========================' + '<br>' + "Total : "+ totalPrice + " Taka";  //organise the final result 
    
    document.getElementById("divFinalResult").innerHTML = finalResultForPrint; //to display the final result in the div, but this div is hidden by css. I don't need to see the element of this div. I create this div only for print of it's elements. 
    
    //to prin any element of the div 
    var divContents = $("#divFinalResult").html();
    var printWindow = window.open('', '', 'height=400,width=300');
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print(); //to print elements of the window 
    //to prin any element of the div 
    
} //to print only the final result 


//get total price 
function getTotalPrice() {
    myselectedItem = $("#myselect" + itemSL).val();
    if(myselectedItem != "No Item"){
        nextItem(); //for fixing problem 
    }
    finalResult = '';
    totalPrice = 0; 
    
    //get the total price 
    $(".input_price").each(function(){ 
        totalPrice = parseFloat(totalPrice) + parseFloat($(this).val());
    });
    
    for(i=1;i<itemSL;i++){  //get the all data of the table 
        finalResult = finalResult + $("#input_slno" + i).val() + ' - ' + $("#myselect" + i).val() + ' - ' + $("#input_qntt" + i).val() + ' - ' + $("#input_price" + i).val() + ' Taka' + '\n';   
    }
    
    getDate(); 
    getTime();
    
    //to show the final result in a alert box     
    alert("     ABC SUPER SHOP" + '\n' + fullDate + "\u00A0" + "\u00A0" + "\u00A0" + fullTime + '\n' + '===========================' + '\n' + "SL - Item - Quantity - Price " + '\n' + '===========================' + '\n' + finalResult + '===========================' + '\n' + "Total : "+ totalPrice + " Taka"); //organise the final result 
    
    
    printFinalResult(); //to print only the final result 
}



/*=============================================================*/
//press Enter key from anywhere then ... 
$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){ //when press 'Enter' key 
        if($('#btnNext').is(":visible")){  //when visible the next button 
            nextItem(); 
        }else {  //when invisible the next button 
            alert("Don't press 'Enter' when the 'Next' button is not visible!");
            //$('#myselect'+itemSL).focus(); //to select first field to control by using keyboard easily 
        }
    }
});
//creating keypress system for using from keyboard 
/*=============================================================*/