/*var category = "adventure";
var grp_size = "100";
var paym_mode = "CC";*/

function GetReqSubmit() {
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


/* function to get the parameter input from the enquiries */
    function applyFilters() {
      const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
      const selectedSizes = Array.from(document.querySelectorAll('input[name="groupsize"]:checked')).map(cb => cb.value);
      const selectedPayments = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(cb => cb.value);

      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const size = parseInt(card.getAttribute('data-size'));
        const payments = card.getAttribute('data-payment').split(',');

        const matchCat = selectedCategories.includes('all') || selectedCategories.includes(cat);
        const matchSize = selectedSizes.includes('all') || selectedSizes.some(limit => size <= parseInt(limit) || (limit === "101" && size > 100));
        const matchPay = selectedPayments.includes('all') || payments.some(p => selectedPayments.includes(p));

        if (matchCat && matchSize && matchPay) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    };


    // Map max_capacity to group size
function getSizeCategory(capacity) {
  if (capacity <= 25) return "25";
  if (capacity <= 50) return "50";
  if (capacity <= 100) return "100";
  return "101";
}

// Render events based on filter
function renderFilteredEvents() {
  const container = document.getElementById("eventContainer");
  container.innerHTML = ""; // clear previous cards

  // Get selected filters
  const selectedCategories = getCheckedValues("category");
  const selectedSizes = getCheckedValues("groupsize");
  const selectedPayments = getCheckedValues("payment");

  eventList.forEach(event => {
    const sizeCategory = getSizeCategory(event.max_capacity);

    // Apply filtering logic
    const categoryMatch = selectedCategories.includes("all") || selectedCategories.includes(event.category);
    const sizeMatch = selectedSizes.includes("all") || selectedSizes.includes(sizeCategory);
    const paymentOptions = event.payment.split(","); // allow multiple options
    const paymentMatch = selectedPayments.includes("all") || selectedPayments.some(p => paymentOptions.includes(p));

    if (categoryMatch && sizeMatch && paymentMatch) {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-category", event.category);
      card.setAttribute("data-size", sizeCategory);
      card.setAttribute("data-payment", event.payment);

      card.innerHTML = `
        <img src="${event.image_src}" alt="${event.short_name}">
        <input type="checkbox"> ${event.short_name}
        <p>${event.description}</p>
        <button class="button">Enquire Now</button>
        <a href="#" target="_blank">View Event Details</a>
      `;

      container.appendChild(card);
    }
  });
}

// Helper: get checked values
function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
    .map(input => input.value);
}

// Hook into Apply Filters button
function applyFilters() {
  renderFilteredEvents();
}

// Run on load to show everything initially
document.addEventListener("DOMContentLoaded", () => {
  renderFilteredEvents();
});