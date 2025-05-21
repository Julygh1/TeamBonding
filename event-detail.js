

// Get event_id from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get("event_id");

// Find the matching event
const event = events.find(e => e.event_id === eventId);

// Display event details
if (event) {
  console.log(event); 
  document.getElementById("eventTitle").textContent = `Thank You for Your Interest in Our Event: ${event.name}`;
  document.getElementById("eventImage").src = event.image;
  document.getElementById("eventImage").alt = event.name;
  document.getElementById("eventDescription").textContent = event.description;
  document.getElementById("eventCategory").textContent = event.category;
  document.getElementById("eventCapacity").textContent = event.capacity;
  document.getElementById("eventVenue").textContent = event.venue;
  
} else {
  document.getElementById("eventTitle").textContent = "Event Not Found";
}

// Display feedback for the selected event id
// Find the matching event feedback
// const feedback = feedbacks.find(e => e.event_id === eventId);

// // Display feedbacks details
// if (feedback) {
//    document.getElementById("fbstar").textContent = feedback.star;
//   document.getElementById("fbdescription").textContent = feedback.description;
//    document.getElementById("fbcompname").textContent = feedback.comp_name;
//    document.getElementById("fbdate").textContent = feedback.feedbackdate;
//    // Optional: show organiser info or feedback dynamically

// Find all feedbacks for the event
const eventFeedbacks = feedbacks
  .filter(fb => fb.event_id === eventId)
  .sort((a, b) => b.star - a.star); // Sort by highest star

// Get the container element for feedbacks (make sure it exists in your HTML)
const feedbackContainer = document.getElementById("feedbackContainer");
feedbackContainer.innerHTML = ""; // Clear previous content

if (eventFeedbacks.length > 0) {
  eventFeedbacks.forEach(fb => {
    const fbDiv = document.createElement("div");
    fbDiv.innerHTML = `
      <div>
        <strong>${fb.comp_name}</strong> (${fb.feedbackdate})<br>
        <span>⭐ ${fb.star}</span>
        <p>${fb.description}</p>
      </div>
      <hr>
    `;
    feedbackContainer.appendChild(fbDiv);
  });
} else {
  feedbackContainer.textContent = "No feedback found for this event.";
}

// Form submission
document.getElementById("quotationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Quotation request submitted successfully!");
});
