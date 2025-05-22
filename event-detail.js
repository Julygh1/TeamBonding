document.addEventListener("DOMContentLoaded", function() {
  // Get event_id from URL
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event_id");

// put default date today + 14 days bcos need to clarification and confirmation +  aor clearance after
  const eventDateInput = document.getElementById("eventDate");
  if (eventDateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    eventDateInput.value = `${yyyy}-${mm}-${dd}`;
  }
// Find the matching event
  const event = events.find(e => e.event_id === eventId);

  // Display event details
  if (event) {
    // document.getElementById("eventTitle").textContent = `Thank You for Your Interest in Our Event: ${event.name}`;
    document.getElementById("eventTitle").textContent = `${event.name}`;
    document.getElementById("eventImage").src = event.image;
    document.getElementById("eventImage").alt = event.name;
   // document.getElementById("eventDescription").textContent = event.description;
   const eventDescElem = document.getElementById("eventDescription");
   const eventWords = event.description.split(' ');
   const eventShortText = eventWords.slice(0, 30).join(' ');
   const eventIsLong = eventWords.length > 30;

   // retrieve organiser details
    document.getElementById("organiserName").textContent = event.organiser_name || "";
    const websiteElem = document.getElementById("organiserWebsite");
    websiteElem.textContent = event.organiser_website || "";
    websiteElem.href = event.organiser_website || "#";
    document.getElementById("organiserContact").textContent = event.organiser_contact || "";
    const emailElem = document.getElementById("organiserEmail");
    emailElem.textContent = event.organiser_email || "";
    emailElem.href = event.organiser_email ? `mailto:${event.organiser_email}` : "#";
  // end of retrieve organiser details

  eventDescElem.innerHTML = eventIsLong
  ? `${eventShortText}... <a href="#" id="eventReadMore">Read more</a>`
  : event.description;
   
  if (eventIsLong) {
  eventDescElem.onclick = function(e) {
    if (e.target && e.target.id === "eventReadMore") {
      e.preventDefault();
      eventDescElem.innerHTML = `
        ${event.description} <a href="#" id="eventShowLess">Show less</a>
      `;
    } else if (e.target && e.target.id === "eventShowLess") {
      e.preventDefault();
      eventDescElem.innerHTML = `
        ${eventShortText}... <a href="#" id="eventReadMore">Read more</a>
      `;
    }
  };
  }
   
     document.getElementById("eventCategory").textContent = event.category;
     document.getElementById("eventCapacity").textContent = event.capacity;
     document.getElementById("eventVenue").textContent = event.venue;
  } else {
    document.getElementById("eventTitle").textContent = "Event Not Found";
  }




  // Feedback pagination and rendering
  let feedbackPage = 1;
  const feedbacksPerPage = 3;

function renderFeedbacks() {
    // const eventFeedbacks = feedbacks
    //   .filter(fb => fb.event_id === eventId)
    //   .sort((a, b) => b.star - a.star);

    const eventFeedbacks = feedbacks
      .filter(fb => fb.event_id === eventId)
      .sort((a, b) => new Date(b.feedbackdate) - new Date(a.feedbackdate));

    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.innerHTML = "";

    const start = (feedbackPage - 1) * feedbacksPerPage;
    const end = start + feedbacksPerPage;
    const pageFeedbacks = eventFeedbacks.slice(start, end);

    pageFeedbacks.forEach((fb, idx) => {
      const fbDiv = document.createElement("div");
      fbDiv.className = "feedback-item";
      const words = fb.description.split(' ');
      const shortText = words.slice(0, 30).join(' ');
      const isLong = words.length > 30;
      const descId = `fbdesc-${start + idx}`;
      fbDiv.innerHTML = `
        
        <strong>${fb.comp_name}</strong> (⭐ ${fb.star})<br>
        <span>${fb.feedbackdate}</span>
        <p id="${descId}">
          ${isLong ? shortText + '...' : fb.description}
          ${isLong ? `<a href="#" class="read-more" data-full="${encodeURIComponent(fb.description)}" data-id="${descId}">Read more</a>` : ''}
        </p>
      `;
      feedbackContainer.appendChild(fbDiv);
    });

    // Pagination controls
    const prev = document.getElementById("prevFeedback");
    const next = document.getElementById("nextFeedback");
    prev.style.display = feedbackPage > 1 ? "inline" : "none";
    next.style.display = end < eventFeedbacks.length ? "inline" : "none";
  }

  // Event delegation for read-more/show-less
    document.getElementById("feedbackContainer").onclick = function(e) {
    if (e.target.classList.contains('read-more')) {
      e.preventDefault();
      const link = e.target;
      const fullText = decodeURIComponent(link.getAttribute('data-full'));
      const id = link.getAttribute('data-id');
      const words = fullText.split(' ');
      const shortText = words.slice(0, 30).join(' ') + '...';

      if (link.textContent === "Read more") {
        document.getElementById(id).innerHTML = `
          ${fullText}
          <a href="#" class="read-more" data-full="${encodeURIComponent(fullText)}" data-id="${id}">Show less</a>
        `;
      } else {
        document.getElementById(id).innerHTML = `
          ${shortText}
          <a href="#" class="read-more" data-full="${encodeURIComponent(fullText)}" data-id="${id}">Read more</a>
        `;
      }
    }
  };

  // Pagination functions
  window.prevFeedbackPage = function() {
    if (feedbackPage > 1) {
      feedbackPage--;
      renderFeedbacks();
    }
  };
  window.nextFeedbackPage = function() {
    const eventFeedbacks = feedbacks.filter(fb => fb.event_id === eventId);
    if (feedbackPage * feedbacksPerPage < eventFeedbacks.length) {
      feedbackPage++;
      renderFeedbacks();
    }

    //to check the mandatary fields are filled before allw submission
     const participants = document.getElementById("participants");
  const email = document.getElementById("email");
  const eventDate = document.getElementById("eventDate");
  const submitBtn = document.getElementById("submitQuotationBtn");

  function checkFormFields() {
    if (
      participants.value.trim() !== "" &&
      email.value.trim() !== "" &&
      eventDate.value.trim() !== ""
    ) {
      submitBtn.style.display = "inline-block";
    } else {
      submitBtn.style.display = "none";
    }
  }

  participants.addEventListener("input", checkFormFields);
  email.addEventListener("input", checkFormFields);
  eventDate.addEventListener("input", checkFormFields);

  // Initial check in case fields are pre-filled
  checkFormFields();
  };
  // end of submit quotation button

  renderFeedbacks();
});

function subquotation() {
  alert("Thank you for your submission")
}


function checkFormFields() {
  const participants = document.getElementById("participants");
  const email = document.getElementById("email");
  const eventDate = document.getElementById("eventDate");
  const submitBtn = document.getElementById("submitQuotationBtn");

  if (
    participants.value.trim() !== "" &&
    email.value.trim() !== "" &&
    eventDate.value.trim() !== ""
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// function showCustomAlert() {
//     document.getElementById("customModal").style.display = "block";
//   }
/* custom alert for submit quotation button */
function showCustomAlert(e) {

  // Generate a booking request number (e.g., "REQ" + timestamp + random 3 digits)
  const bookingNumber = "REQ" + Date.now() + Math.floor(Math.random() * 900 + 100);


  const eventDescription = document.getElementById("eventDescription").textContent || "";
  const eventDate = document.getElementById("eventDate").value || "";
  const participants = document.getElementById("participants").value || "";
  const email = document.getElementById("email").value || "";
  
  // Format date if needed (from yyyy-mm-dd to dd/mm/yyyy)
  let formattedDate = eventDate;
  if (eventDate && eventDate.includes("-")) {
    const [yyyy, mm, dd] = eventDate.split("-");
    formattedDate = `${dd}/${mm}/${yyyy}`;
  }
  // Build the details HTML
  document.getElementById("bookingDetails").innerHTML = `
    <p><strong>Booking Request No.:</strong> <span style="color:#182C61;">${bookingNumber}</span></p>
    <p><strong>Event Description:</strong> ${eventDescription}</p>
    <p><strong>Event Date:</strong> ${formattedDate}</p>
    <p><strong>Number of Participants:</strong> ${participants}</p>
    <p><strong>Email Address:</strong> ${email}</p>
  `;

  // Show modal
  document.getElementById("customModal").style.display = "block";
  

}



function closeModal() {
    document.getElementById("customModal").style.display = "none";
    goBack();
  }

function goBack() {
    window.location.href = "index.html";
  }
