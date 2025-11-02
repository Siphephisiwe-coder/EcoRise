document.addEventListener("DOMContentLoaded", () => {
  const loggedInEmail = localStorage.getItem("loggedInUser");
  const userProfiles = JSON.parse(localStorage.getItem("userProfiles")) || {};
  const userPosts = JSON.parse(localStorage.getItem("userPosts")) || {};
  const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const profileForm = document.getElementById("profileForm");
  const profileDisplay = document.getElementById("profileDisplay");
  const profilePicUpload = document.getElementById("profilePicUpload");
  const profilePicPreview = document.getElementById("profilePicPreview");

  // Load profile if exists
  if (loggedInEmail && userProfiles[loggedInEmail]) {
    showProfile(userProfiles[loggedInEmail]);
  }

  // Profile picture change handler function
  function handleProfilePicChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        profilePicPreview.src = evt.target.result;
        saveProfilePic(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Upload profile picture
  profilePicUpload.addEventListener("change", handleProfilePicChange);

  // Remove profile picture (reset to default avatar)
  const removeBtn = document.getElementById('removeProfilePic');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      if (!confirm('Remove profile picture and restore default avatar?')) return;
      if (userProfiles[loggedInEmail]) {
        userProfiles[loggedInEmail].profilePic = DEFAULT_AVATAR;
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
      }
      profilePicPreview.src = DEFAULT_AVATAR;
      // Reset the file input
      profilePicUpload.value = '';
      // Force a refresh of the file input event listener
      profilePicUpload.removeEventListener('change', handleProfilePicChange);
      profilePicUpload.addEventListener('change', handleProfilePicChange);
    });
  }

  function saveProfilePic(base64) {
    if (!userProfiles[loggedInEmail]) userProfiles[loggedInEmail] = {};
    userProfiles[loggedInEmail].profilePic = base64;
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
  }

  // Save profile data
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const profileData = {
      fullName: document.getElementById("fullName").value,
      location: document.getElementById("location").value,
      skill: document.getElementById("skill").value,
      lookingFor: document.getElementById("lookingForProfile").value,
      bio: document.getElementById("bio").value,
      profilePic: profilePicPreview.src
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
  profilePicPreview.src = profile.profilePic || DEFAULT_AVATAR;

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

  // Post creation
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("postsContainer");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postText = document.getElementById("postText").value.trim();
    const postImageFile = document.getElementById("postImage").files[0];
    if (!postText && !postImageFile) return;

    const post = { text: postText, timestamp: new Date().toLocaleString() };

    if (postImageFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        post.image = evt.target.result;
        savePost(post);
      };
      reader.readAsDataURL(postImageFile);
    } else {
      savePost(post);
    }

    postForm.reset();
  });

  function savePost(post) {
    if (!userPosts[loggedInEmail]) userPosts[loggedInEmail] = [];
    userPosts[loggedInEmail].unshift(post);
    localStorage.setItem("userPosts", JSON.stringify(userPosts));
    renderPosts();
  }

  function renderPosts() {
    postsContainer.innerHTML = "";
    const posts = userPosts[loggedInEmail] || [];
    posts.forEach((p, idx) => {
      const card = document.createElement("div");
      card.classList.add("post-card");
      card.innerHTML = `
        <p>${p.text}</p>
        ${p.image ? `<img src="${p.image}" alt="Post Image">` : ""}
        <small>${p.timestamp}</small>
        <div class="post-actions">
          <button class="delete-post" data-index="${idx}">Delete</button>
        </div>
      `;
      postsContainer.appendChild(card);
    });
  }

  // Delete post handler (delegation)
  postsContainer.addEventListener('click', (e) => {
    if (!e.target.matches('.delete-post')) return;
    const idx = Number(e.target.dataset.index);
    if (Number.isNaN(idx)) return;
    // confirm deletion
    if (!confirm('Delete this post?')) return;
    deletePost(idx);
  });

  function deletePost(index) {
    const posts = userPosts[loggedInEmail] || [];
    if (index < 0 || index >= posts.length) return;
    posts.splice(index, 1);
    userPosts[loggedInEmail] = posts;
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
    renderPosts();
  }

  
  renderPosts();

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // Mobile menu
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
