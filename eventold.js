const eventList = [
  {
    event_id: "SPT001",
    short_name: "Ultimate Frisbee Frenzy",
    description: "Engage in a high-energy game of Ultimate Frisbee that boosts team coordination, communication, and fitness. Teams of up to 20 will compete in a round-robin format with coaching provided to guide beginners. Suitable for all fitness levels, this sport challenges participants to strategize and collaborate to score. Held in open fields or indoor arenas, it ensures a mix of fun and healthy rivalry. Organisers also provide all necessary equipment and hydration stations to keep everyone safe and refreshed.",
    max_capacity: 40,
    venue: "Marina Bay Field",
    event_org_id: "ORG100",
    organiser_name: "ActiveTeam Events",
    organiser_contact: "+65 8888 1234",
    organiser_email: "events@activeteam.sg",
    image_src: "public/images/ultimate-frisbee.jpg",
    category: "sport",
   /* size: "50",*/
    payment: "einvoice"
  },
  
  {
    event_id: "ADV001",
    short_name: "Jungle Survival Quest",
    description: "An immersive outdoor experience that puts teams in simulated survival scenarios within a forested park. Participants must build shelters, start fires, and solve problems to 'survive the wild'. Guided by experienced facilitators, this challenge encourages leadership, resourcefulness, and communication. Perfect for teams wanting a deeper bonding experience away from city life. Includes safety briefings, medical support, and all materials.",
    max_capacity: 60,
    venue: "Bukit Timah Nature Reserve",
    event_org_id: "ORG200",
    organiser_name: "WildBound Adventures",
    organiser_contact: "+65 8123 4567",
    organiser_email: "info@wildbound.sg",
    image_src: "public/images/jungle-survival.jpg",
    category: "adventure",
   /* size: "100",*/
    payment: "vendorgov,cc"
  },
  {
    event_id: "TECH001",
    short_name: "AI Bot Battle Workshop",
    description: "Teams will design and program simple AI bots using a visual coding interface. The bots will then compete in a virtual arena with tasks like obstacle dodging and flag capturing. Facilitated by tech professionals, the workshop is both educational and fun, fostering collaboration, logic building, and digital literacy. No prior coding experience required. Suitable for medium to large teams.",
    max_capacity: 50,
    venue: "Fusionopolis Level 3 Lab",
    event_org_id: "ORG300",
    organiser_name: "FutureLab Creations",
    organiser_contact: "+65 9123 7890",
    organiser_email: "contact@futurelab.sg",
    image_src: "public/images/ai-bot-battle.jpg",
    category: "technology",
  /*  size: "50",*/
    payment: "vendorgov,einvoice"
  },
  {
    event_id: "SPT002",
    short_name: "Human Foosball Arena",
    description: "Step into a life-sized human foosball court and become a player fixed to a bar! Teams must work together to pass and score while staying aligned with their teammates. This hilarious and engaging sport is ideal for breaking the ice and energizing participants. It requires coordination and laughter as much as strategy and skill. Ideal for up to 36 participants at a time.",
    max_capacity: 36,
    venue: "Sports Hub Hall D",
    event_org_id: "ORG400",
    organiser_name: "PlayMax Events",
    organiser_contact: "+65 9345 6789",
    organiser_email: "support@playmax.sg",
    image_src: "public/images/human-foosball.jpg",
    category: "sport",
  /*  size: "50",*/
    payment: "vendorgov"
  },
  {
    event_id: "TECH002",
    short_name: "Drone Flight Challenge",
    description: "Participants learn the basics of drone navigation and compete in aerial challenges such as obstacle courses and precision landing. Each team collaborates to guide their drone through time-based missions. This futuristic and exciting activity enhances spatial awareness and team decision-making. Certified drone instructors provide guidance and ensure safety.",
    max_capacity: 30,
    venue: "Tampines Innovation Arena",
    event_org_id: "ORG500",
    organiser_name: "SkyWorks Robotics",
    organiser_contact: "+65 9888 1122",
    organiser_email: "hello@skyworks.sg",
    image_src: "public/images/drone-challenge.jpg",
    category: "technology",
  /*  size: "25",*/
    payment: "einvoice,cc"
  }
];

function getSizeCategory(capacity) {
  if (capacity <= 25) return "25";
  if (capacity <= 50) return "50";
  if (capacity <= 100) return "100";
  return "101";
}


const container = document.getElementById("eventContainer");

eventList.forEach(event => {
  const sizeCategory = getSizeCategory(event.max_capacity);

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
});