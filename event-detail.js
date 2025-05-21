

// Get event_id from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("event_id");

// Find the matching event
const event = events.find(e => e.event_id === eventId);

// Display event details
if (event) {
  document.getElementById("eventTitle").textContent = `Thank You for Your Interest in Our Event: ${event.name}`;
  document.getElementById("eventImage").src = event.image;
  document.getElementById("eventImage").alt = event.name;
  document.getElementById("eventDescription").textContent = event.description;
//  document.getElementByid("eventcategory").textContent = event.category;
 // document.getElementById("eventcapacity").textcontent = event.capacity;

  // Optional: show organiser info or feedback dynamically
} else {
  document.getElementById("eventTitle").textContent = "Event Not Found";
}

// Form submission
document.getElementById("quotationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Quotation request submitted successfully!");
});
