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

  // 1️⃣ Dynamic role detection
  const mentorKeywords = ["mentor", "advice", "guidance", "teach", "help"];
  const clientKeywords = ["client", "clients", "investor", "partner", "business", "seeking", "looking for"];

  let userRole = "provider"; // default

  // Check if user input implies mentor role
  if (
    mentorKeywords.some(word => mySkill.includes(word) || lookingFor.includes(word))
  ) {
    userRole = "mentor";
  }
  // Check if user input implies client role
  else if (
    clientKeywords.some(word => mySkill.includes(word) || lookingFor.includes(word))
  ) {
    userRole = "client";
  }

  // 2️⃣ Complementary matching
  const matches = connections.filter(person => {
    if (person.role === userRole) return false; // skip same role

    const skillWords = person.skill.toLowerCase().split(" ");
    const needWords = person.need.toLowerCase().split(" ");

    return (
      skillWords.some(word => lookingFor.includes(word)) || 
      needWords.some(word => mySkill.includes(word)) ||
      mySkill.includes(person.skill.toLowerCase()) ||
      lookingFor.includes(person.need.toLowerCase())
    );
  });

  // 3️⃣ Display results
  if (matches.length === 0) {
    resultsDiv.innerHTML = `
      <p>No direct matches found 😕<br>Try adjusting your search or explore resources below!</p>
    `;
  } else {
    resultsDiv.innerHTML = `
      <h3>🔗 Suggested Connections</h3>
      <ul>
        ${matches
          .map(
            person => `
              <li>
                <strong>${person.name}</strong> — ${person.skill} (${person.role}) in ${person.location}<br>
                Looking for: <em>${person.need}</em>
              </li>`
          )
          .join("")}
      </ul>
    `;
  }

  document.getElementById("matchForm").reset();
});

function runDemo(skill, lookingFor) {
  document.getElementById("mySkill").value = skill;
  document.getElementById("lookingFor").value = lookingFor;

  // Trigger the form submission
  document.getElementById("matchForm").dispatchEvent(new Event("submit"));
}

// guidance and growth, mentor, advice, teach, help
const resources = [
  { title: "Starting a Small Business", type: "Article", link: "https://www.entrepreneur.com/article/288134", topic: "entrepreneurship" },
  { title: "Marketing Basics for Entrepreneurs", type: "Video", link: "https://www.youtube.com/watch?v=8z7MLtE8N8I", topic: "marketing" },
  { title: "Financial Literacy for Startups", type: "PDF", link: "https://www.sba.gov/sites/default/files/files/Financial_Literacy_Starter_Guide.pdf", topic: "finance" },
  { title: "Agriculture Business Tips", type: "Video", link: "https://www.youtube.com/watch?v=09vQhG3qY0A", topic: "agriculture" },
  { title: "Building Sustainable Businesses", type: "Article", link: "https://hbr.org/2019/05/building-sustainable-businesses", topic: "sustainability" }
];



function displayResources(filteredResources) {
  const resourceList = document.getElementById("resourceList");

  if(filteredResources.length === 0){
    resourceList.innerHTML = `<li>No resources found for your search. Try a different keyword.</li>`;
    return;
  }

  resourceList.innerHTML = filteredResources
    .map(res => `
      <li>
        <strong>${res.title}</strong> (${res.type})<br>
        <a href="${res.link}" target="_blank">Open Resource</a>
      </li>
    `).join("");
}

// Only show results when user searches
document.getElementById("searchResources").addEventListener("click", () => {
  const query = document.getElementById("resourceSearch").value.toLowerCase().trim();

  const filtered = resources.filter(res => 
    res.title.toLowerCase().includes(query) || res.topic.toLowerCase().includes(query)
  );

  displayResources(filtered);
});
