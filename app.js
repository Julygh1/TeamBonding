
let currentPage = 0;
const itemsPerPage = 6;
let filteredEvents = [...events];


function applyFilters() {
  const category = document.querySelector('input[name="category"]:checked')?.value || "";
  const groupSize = document.querySelector('input[name="groupsize"]:checked')?.value || "";
  const payment = document.querySelector('input[name="payment"]:checked')?.value || "";
  const venueRequired = document.getElementById('venueRequired').checked;


  // Filter logic
  filteredEvents = events.filter(event => {
 
    const matchCategory = category ? event.category === category : true;
    const matchPayment = payment ? event.payment.includes(payment) : true;
    const matchGroupSize = groupSize
      ? (groupSize === "101"
          ? event.capacity > 100
          : event.capacity <= parseInt(groupSize))
      : true;

    var matchVenue = true;
    if (venueRequired && event.venue === "") {
      matchVenue = false;
    }
     
    return matchCategory && matchPayment && matchGroupSize && matchVenue;
  });

  currentPage = 0;
  renderEvents();
}

function renderEvents() {
// to show eventcount start
const eventCountDiv = document.getElementById("eventCount");
if (filteredEvents.length === 0) {
  eventCountDiv.textContent = "No events found matching your criteria. Please change your selections/filters or reset to see all events.";
  // Optionally, clear the event table
  document.getElementById("eventTable").innerHTML = "";
  // Optionally, hide pagination
  document.getElementById("eventPagination").innerHTML = "";
  return;
} else if (filteredEvents.length < events.length) {
  eventCountDiv.textContent = `Showing ${filteredEvents.length} matching events out of ${events.length} events`;
} else {
  eventCountDiv.textContent = `Showing all ${events.length} events (by latest event added)`;
}


const totalPages = Math.ceil(filteredEvents.length / 6);
renderPagination(currentPage, totalPages);


  const container = document.getElementById("eventTable");
  container.innerHTML = "";

function parseDateString(dateStr) {
  // For dd/mm/yyyy or dd-mm-yyyy
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    const [dd, mm, yyyy] = parts;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  // fallback for ISO or other formats
  return new Date(dateStr);
}

const sortedEvents = [...filteredEvents].sort(
  (a, b) => parseDateString(b.eventaddeddate) - parseDateString(a.eventaddeddate)
);

 // const sortedEvents = [...filteredEvents].sort((a, b) => a.name.localeCompare(b.name));
  const start = currentPage * 6;
  const end = start + 6;
  const pageEvents = sortedEvents.slice(start, end);

for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
  const tr = document.createElement("tr");
  let hasEvent = false;

  for (let colIndex = 0; colIndex < 3; colIndex++) {
    const eventIndex = rowIndex * 3 + colIndex;
    if (pageEvents[eventIndex]) {
      const td = document.createElement("td");
      const event = pageEvents[eventIndex];
  
      const venueText = event.venue && event.venue.trim() !== "" ? event.venue : "No venue provided";
td.innerHTML = `
  <img src="${event.image}" alt="${event.name}" />
  <p><strong>${event.name}</strong></p>
  <p>Capacity: ${event.capacity}</p>
  <p>Venue: ${venueText}</p>
  <button class="button" onclick="window.location.href='event-detail.html?event_id=${event.event_id}'">View Details / Get Quotation</button>
`;
      tr.appendChild(td);
      hasEvent = true;
    }
    // Do NOT create or append td if no event
  }

  // Only append row if it has at least one event
  if (hasEvent) {
    container.appendChild(tr);
  }
}
}


function resetFilters() {
  document.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(input => input.checked = false);
  // Optionally reset other filter UI elements here

  // Reload all events (like on page load)
  applyFilters();
}

  // Clear all filter inputs
  document.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(input => input.checked = false);
  // Optionally reset other filter UI elements here

  // Reload all events (like on page load)
  applyFilters();


function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderEvents();
  }
}

function nextPage() {
  const maxPage = Math.floor((filteredEvents.length - 1) / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderEvents();
  }
}

function openEventDetail(event_id, name, image, capacity, venue) {
  const url = new URL('detail.html', window.location.href);
  url.searchParams.set('id', event_id);
  url.searchParams.set('name', name);
  url.searchParams.set('image', image);
  url.searchParams.set('capacity', capacity);
  url.searchParams.set('venue', venue);
  window.location.href = url.toString();
}

// pagination for event table in index.html

function renderPagination(currentPage, totalPages) {
  const paginationDiv = document.getElementById("eventPagination");
  paginationDiv.innerHTML = "";

  if (totalPages > 1) {
    if (currentPage > 0) {
      paginationDiv.innerHTML += `<a href="#" id="prevLink">Prev</a>`;
    }
    if (currentPage < totalPages - 1) {
      paginationDiv.innerHTML += `<a href="#" id="nextLink">Next</a>`;
    }
  }

  // Attach event listeners
  if (document.getElementById("prevLink")) {
    document.getElementById("prevLink").onclick = function(e) {
      e.preventDefault();
      prevPage();
    };
  }
  if (document.getElementById("nextLink")) {
    document.getElementById("nextLink").onclick = function(e) {
      e.preventDefault();
      nextPage();
    };
  }
}