var category = "adventure";
var grp_size = "100";
var paym_mode = "CC";
console.log (category);
console.log (grp_size);
console.log (paym_mode);

function getSelection() {
/* cater for other category type */
    document.getElementById("otherCatCheckbox").addEventListener("change", function() {
            document.getElementById("otherCat").style.display = this.checked ? "inline-block" : "none";
        });

    var checkcatboxes = document.getElementsByName("category");
    var selectedcatValues = [];

    checkcatboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedcatValues.push(checkbox.value);
            }
        });

    var otherCatCheckbox = document.getElementById("otherCatCheckbox");
    var otherCatInput = document.getElementById("otherCat");

    if (otherCatCheckbox.checked && otherCatInput.value.trim() !== "") {
        selectedcatValues.push(otherCatInput.value.trim());
    }

    var resultCatText = selectedcatValues.length 
        ? "Your category selected: " + selectedcatValues.join(", ") 
        : "Please select at least one exercise.";


/* group size selection */
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

        


/* cater for other payment mode */
    document.getElementById("otherPaymCheckbox").addEventListener("change", function() {
            document.getElementById("otherPaym").style.display = this.checked ? "inline-block" : "none";
        });

    var checkpaymboxes = document.getElementsByName("payment");
    var selectedpaymValues = [];

    checkpaymboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedpaymValues.push(checkbox.value);
            }
        });

    var otherPaymCheck = document.getElementById("otherPaymCheckbox");
    var otherPaymInput = document.getElementById("otherPaym");

    if (otherPaymCheck.checked && otherCatInput.value.trim() !== "") {
        selectedpaymValues.push(otherPaymInput.value.trim());
    }

    var resultPaymText = selectedpaymValues.length 
        ? "You selected: " + selectedpaymValues.join(", ") 
        : "Please select at least one exercise.";

/* show selection results */   
    document.getElementById("result").innerText = resultCatText;     
    document.getElementById("sizeresult").innerText = resultgroupsizeText; 
    document.getElementById("paymresult").innerText = resultPaymText;
}
