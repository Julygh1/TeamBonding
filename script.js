var category = "adventure";
var grp_size = "100";
var paym_mode = "CC";
console.log (category);
console.log (grp_size);
console.log (paym_mode);

function ReqSubmit(){
    /* var checkboxes = document.getElementsByName("category");*/
      var check_cat = document.getElementsByName("category");
            var selectedValues = [];
            
            check_cat.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedValues.push(checkbox.value);
                }
            });

    var resultText = selectedValues.length 
        ? "You selected: " + selectedValues.join(", ") 
        : "Please select at least one exercise."; 

        document.getElementById("result").innerText = resultText; 

  var check_size = document.getElementsByName("groupsize");
            var selectedgroupsizeValues = [];
            
            check_size.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedgroupsizeValues.push(checkbox.value);
                }
            });

    var resultgroupsizeText = selectedgroupsizeValues.length 
        ? "You selected group size of: " + selectedgroupsizeValues.join(", ") 
        : "Please select at least one exercise."; 

        document.getElementById("sizeresult").innerText = resultgroupsizeText; 
        
    /* check on payment selection */    
  var check_paym = document.getElementsByName("payment");
            var selectedpaymentValues = [];
            
            check_paym.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedpaymentValues.push(checkbox.value);
                }
            });

    var resultpaymentText = selectedpaymentValues.length 
        ? "You selected payment mode of: " + selectedpaymentValues.join(", ") 
        : "Please select at least one exercise."; 

        document.getElementById("paymresult").innerText = resultpaymentText; 

}

