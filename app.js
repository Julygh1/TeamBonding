
let currentPage = 0;
const itemsPerPage = 6;
let filteredEvents = [...events];


function applyFilters() {
  const category = document.querySelector('input[name="category"]:checked')?.value || "";
  const groupSize = document.querySelector('input[name="groupsize"]:checked')?.value || "";
  const payment = document.querySelector('input[name="payment"]:checked')?.value || "";

  // Show summary
  //const summary = document.getElementById("selectionSummary");
  /*summary.innerHTML = `
    <strong>Selected Filters:</strong><br>
    Category: ${category || "None"}<br>
    Group Size: ${groupSize || "None"}<br>
    Payment Mode: ${payment || "None"}
  `;*/

  // Filter logic
  filteredEvents = events.filter(event => {
 
    const matchCategory = category ? event.category === category : true;
    const matchPayment = payment ? event.payment.includes(payment) : true;
    const matchGroupSize = groupSize
      ? (groupSize === "101"
          ? event.capacity > 100
          : event.capacity <= parseInt(groupSize))
      : true;
    return matchCategory && matchPayment && matchGroupSize;
  });

  currentPage = 0;
  renderEvents();
}

function renderEvents() {
  const container = document.getElementById("eventTable");
  container.innerHTML = "";

  const sortedEvents = [...filteredEvents].sort((a, b) => a.name.localeCompare(b.name));
  const start = currentPage * 6;
  const end = start + 6;
  const pageEvents = sortedEvents.slice(start, end);

  for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
    const tr = document.createElement("tr");

    for (let colIndex = 0; colIndex < 3; colIndex++) {
      const td = document.createElement("td");
      const eventIndex = rowIndex * 3 + colIndex;

      if (pageEvents[eventIndex]) {
        const event = pageEvents[eventIndex];
        td.innerHTML = `
          
          <img src="${event.image}" alt="${event.name}" />
          <p><strong>${event.event_id}</strong></p>
          <p><strong>${event.name}</strong></p>
          <p>Capacity: ${event.capacity}</p>
          <p>Venue: ${event.venue}</p>
          
          <button class="button" onclick="window.location.href='event-detail.html?event_id=${event.event_id}'">View Details / Get Quotation
          </button>
        `;

      }

      tr.appendChild(td);
    }

    container.appendChild(tr);
  }
}


function resetFilters() {
  document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
  document.getElementById("selectionSummary").innerHTML = "";
  filteredEvents = [...events];
  currentPage = 0;
  renderEvents();
}

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


