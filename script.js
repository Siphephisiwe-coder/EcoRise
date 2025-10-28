// Check login status when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "signup.html";
    }
});

// Mobile menu functionality
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Toggle menu when hamburger is clicked
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("active") && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Close menu when clicking a link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

document.getElementById("matchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const mySkill = document.getElementById("mySkill").value.toLowerCase().trim();
  const lookingFor = document.getElementById("lookingFor").value.toLowerCase().trim();
  const resultsDiv = document.getElementById("results");

  const connections = [
    { name: "Tumi", skill: "graphic design", need: "web developer", location: "Pretoria", role: "provider" },
    { name: "Kamo", skill: "marketing", need: "business partner", location: "Cape Town", role: "provider" },
    { name: "Lebo", skill: "software development", need: "investor", location: "Johannesburg", role: "provider" },
    { name: "Naledi", skill: "accounting", need: "entrepreneurs", location: "Polokwane", role: "mentor" },
    { name: "Thabo", skill: "fashion design", need: "supplier", location: "Durban", role: "provider" },
    { name: "Amahle", skill: "agriculture", need: "clients", location: "Limpopo", role: "provider" },
    { name: "Sipho", skill: "investor", need: "software development", location: "Johannesburg", role: "client" }
  ];

  const mentorKeywords = ["mentor", "advice", "guidance", "teach", "help"];
  const clientKeywords = ["client", "clients", "investor", "partner", "business", "seeking", "looking for"];

  let userRole = "provider"; // default

  if (mentorKeywords.some(word => mySkill.includes(word) || lookingFor.includes(word))) {
    userRole = "mentor";
  } else if (clientKeywords.some(word => mySkill.includes(word) || lookingFor.includes(word))) {
    userRole = "client";
  }

  const matches = connections.filter(person => {
    if (person.role === userRole) return false;

    const skillWords = person.skill.toLowerCase().split(" ");
    const needWords = person.need.toLowerCase().split(" ");

    return (
      skillWords.some(word => lookingFor.includes(word)) || 
      needWords.some(word => mySkill.includes(word)) ||
      mySkill.includes(person.skill.toLowerCase()) ||
      lookingFor.includes(person.need.toLowerCase())
    );
  });

  if (matches.length === 0) {
    resultsDiv.innerHTML = `<p>No direct matches found 😕<br>Try adjusting your search or explore resources below!</p>`;
  } else {
    resultsDiv.innerHTML = `
      <h3>🔗 Suggested Connections</h3>
      <ul>
        ${matches.map(person => `
          <li>
            <strong>${person.name}</strong> — ${person.skill} (${person.role}) in ${person.location}<br>
            Looking for: <em>${person.need}</em>
          </li>`).join("")}
      </ul>
    `;
  }

  document.getElementById("matchForm").reset();
});

function runDemo(skill, lookingFor) {
  document.getElementById("mySkill").value = skill;
  document.getElementById("lookingFor").value = lookingFor;
  document.getElementById("matchForm").dispatchEvent(new Event("submit"));
}

const resources = [
  { title: "Starting a Small Business", type: "Article", link: "https://www.businessnewsdaily.com/4686-how-to-start-a-business.html", topic: "entrepreneurship" },
  { title: "Marketing Basics for Entrepreneurs", type: "Video", link: "https://mailchimp.com/resources/startup-marketing-strategy/?gclsrc=aw.ds&gad_source=1&gad_campaignid=22764712998&gbraid=0AAAABAjJLlYmAoyRjiCuPwkajXm1_sHbZ&gclid=Cj0KCQjwsPzHBhDCARIsALlWNG3fFZgvJHu9szvpMEx_r_ZA9Lr5KXjs6eLo9ihkBgBD55OEKUNd2yoaArjLEALw_wcB", topic: "marketing" },
  { title: "Financial Literacy for Startups", type: "PDF", link: "https://www.modeliks.com/resources/business-plans/financial-literacy", topic: "finance" },
  { title: "Agriculture Business Tips", type: "Video", link: "https://www.youtube.com/watch?v=heTxEsrPVdQ", topic: "agriculture" },
  { title: "Building Sustainable Businesses", type: "Article", link: "https://fsc.org/en/blog/sustainable-business-practices", topic: "sustainability" }
];

function displayResources(filteredResources) {
  const resourceList = document.getElementById("resourceList");
  if (!resourceList) return; // prevent errors if element is missing

  if(filteredResources.length === 0){
    resourceList.innerHTML = `<li>No resources found for your search. Try a different keyword.</li>`;
    return;
  }

  resourceList.innerHTML = filteredResources
    .map(res => `<li><strong>${res.title}</strong> (${res.type})<br><a href="${res.link}" target="_blank">Open Resource</a></li>`).join("");
}

document.getElementById("searchResources").addEventListener("click", () => {
  const query = document.getElementById("resourceSearch").value.toLowerCase().trim();
  const filtered = resources.filter(res => res.title.toLowerCase().includes(query) || res.topic.toLowerCase().includes(query));
  displayResources(filtered);
});

// my network
const networkTab = document.getElementById('networkTab');
const networkModal = document.getElementById('networkModal');
const closeNetwork = document.getElementById('closeNetwork');
const networkGrid = document.getElementById('networkGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Example connections
const connections = [
  { name: "Melissa Jacobs", role: "mentor", type: "Business Mentor", avatar: "https://i.pravatar.cc/80?img=32" },
  { name: "Thabo Mokoena", role: "mentor", type: "Tech Startup Coach", avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Sizwe Ndlovu", role: "client", type: "Freelance Client", avatar: "https://i.pravatar.cc/80?img=45" },
  { name: "Richard Smith", role: "partner", type: "Startup Founder", avatar: "https://i.pravatar.cc/80?img=65" },
  { name: "Marcus Dlamini", role: "partner", type: "Co-Founder - GreenUp", avatar: "https://i.pravatar.cc/80?img=33" },
  { name: "Emily Chen", role: "client", type: "Finance Partner", avatar: "https://i.pravatar.cc/80?img=28" }
];

// Open/close modal
networkTab.addEventListener('click', () => { networkModal.style.display = 'block'; });
closeNetwork.addEventListener('click', () => { networkModal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target === networkModal) networkModal.style.display = 'none'; });

// Render avatars
function renderConnections(filter = 'all') {
  networkGrid.innerHTML = '';
  connections
    .filter(conn => filter === 'all' || conn.role === filter)
    .forEach(conn => {
      networkGrid.innerHTML += `
        <div class="network-card">
          <img src="${conn.avatar}" alt="${conn.name}">
          <h4>${conn.name}</h4>
          <p>${conn.type}</p>
        </div>
      `;
    });
}
renderConnections();

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderConnections(btn.getAttribute('data-filter'));
  });
});

