// Check login
document.addEventListener("DOMContentLoaded", () => {
  const loggedInEmail = localStorage.getItem("loggedInUser");
  const userProfiles = JSON.parse(localStorage.getItem("userProfiles")) || {};

  const profileForm = document.getElementById("profileForm");
  const profileDisplay = document.getElementById("profileDisplay");

  if (loggedInEmail && userProfiles[loggedInEmail]) {
    showProfile(userProfiles[loggedInEmail]);
  }

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const profileData = {
      fullName: document.getElementById("fullName").value,
      location: document.getElementById("location").value,
      skill: document.getElementById("skill").value,
      lookingFor: document.getElementById("lookingForProfile").value,
      bio: document.getElementById("bio").value
    };
    userProfiles[loggedInEmail] = profileData;
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
    showProfile(profileData);
  });

  function showProfile(profile) {
    document.getElementById("displayName").innerText = profile.fullName;
    document.getElementById("displayLocation").innerText = profile.location;
    document.getElementById("displaySkill").innerText = profile.skill;
    document.getElementById("displayLookingFor").innerText = profile.lookingFor;
    document.getElementById("displayBio").innerText = profile.bio;

    profileForm.style.display = "none";
    profileDisplay.style.display = "block";
  }

  document.getElementById("editProfile").addEventListener("click", () => {
    const profile = userProfiles[loggedInEmail];
    document.getElementById("fullName").value = profile.fullName;
    document.getElementById("location").value = profile.location;
    document.getElementById("skill").value = profile.skill;
    document.getElementById("lookingForProfile").value = profile.lookingFor;
    document.getElementById("bio").value = profile.bio;

    profileForm.style.display = "block";
    profileDisplay.style.display = "none";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // Mobile menu toggle (same as index)
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active") && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
});
