// === Profile Picture Upload ===
const profilePic = document.getElementById("profile-pic");
const fileInput = document.getElementById("file-input");

profilePic.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      console.log("Profile picture updated");
    };
    reader.readAsDataURL(file);
  }
});

// === Inline Name Editing ===
const editNameBtn = document.getElementById("edit-name");
editNameBtn.addEventListener("click", () => {
  const currentNameEl = document.getElementById("name");

  const wrapper = document.createElement("div");
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentNameEl.textContent;

  wrapper.appendChild(input);
  currentNameEl.replaceWith(wrapper);
  input.focus();

  let saved = false; // prevent double replace

  const save = () => {
    if (saved) return; // only run once
    saved = true;
    const newHeading = document.createElement("h1");
    newHeading.id = "name";
    newHeading.textContent = input.value;
    wrapper.replaceWith(newHeading);
    console.log("Name edited:", input.value);
  };

  input.addEventListener("blur", save);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop default form submit
      save();
    }
  });
});

// === Inline Bio Editing ===
const editBioBtn = document.getElementById("edit-bio");
editBioBtn.addEventListener("click", () => {
  const currentBioEl = document.getElementById("bio");

  const wrapper = document.createElement("div");
  const input = document.createElement("textarea");
  input.value = currentBioEl.textContent;

  wrapper.appendChild(input);
  currentBioEl.replaceWith(wrapper);
  input.focus();

  let saved = false;

  const save = () => {
    if (saved) return;
    saved = true;
    const newP = document.createElement("p");
    newP.id = "bio";
    newP.textContent = input.value;
    wrapper.replaceWith(newP);
    console.log("Bio edited:", input.value);
  };

  input.addEventListener("blur", save);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    }
  });
});


// === Skills Section ===
const skillsList = document.getElementById("skills-list");
const addSkillBtn = document.getElementById("add-skill");

addSkillBtn.addEventListener("click", () => {
  // Prevent multiple input boxes
  if (document.querySelector("#skills-list + div")) return;

  const wrapper = document.createElement("div");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter new skill";

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "✔️";
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌";

  wrapper.appendChild(input);
  wrapper.appendChild(confirmBtn);
  wrapper.appendChild(cancelBtn);
  skillsList.parentNode.insertBefore(wrapper, skillsList.nextSibling);
  input.focus();

  const save = () => {
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = input.value;
      li.draggable = true;
      skillsList.appendChild(li);
      console.log("Skill added:", li.textContent);
    }
    wrapper.remove();
  };

  const cancel = () => {
    wrapper.remove();
    console.log("Skill input cancelled");
  };

  confirmBtn.addEventListener("click", save);
  cancelBtn.addEventListener("click", cancel);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") save();
  });
});


document.getElementById("delete-skill").addEventListener("click", () => {
  document.querySelectorAll("#skills-list .highlight").forEach(li => {
    console.log("Skill deleted:", li.textContent);
    li.remove();
  });
});

// === Hobbies Section ===
const hobbiesList = document.getElementById("hobbies-list");
const addHobbyBtn = document.getElementById("add-hobby");

addHobbyBtn.addEventListener("click", () => {
  // Prevent multiple input boxes
  if (document.querySelector("#hobbies-list + div")) return;

  const wrapper = document.createElement("div");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter new hobby";

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "✔️";
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌";

  wrapper.appendChild(input);
  wrapper.appendChild(confirmBtn);
  wrapper.appendChild(cancelBtn);
  hobbiesList.parentNode.insertBefore(wrapper, hobbiesList.nextSibling);
  input.focus();

  const save = () => {
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = input.value;
      li.draggable = true;
      hobbiesList.appendChild(li);
      console.log("Hobby added:", li.textContent);
    }
    wrapper.remove();
  };

  const cancel = () => {
    wrapper.remove();
    console.log("Hobby input cancelled");
  };

  confirmBtn.addEventListener("click", save);
  cancelBtn.addEventListener("click", cancel);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") save();
  });
});


document.getElementById("delete-hobby").addEventListener("click", () => {
  document.querySelectorAll("#hobbies-list .highlight").forEach(li => {
    console.log("Hobby deleted:", li.textContent);
    li.remove();
  });
});

// === Toggle highlight ===
function addInteractive(list) {
  list.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("highlight");
      console.log("Item selected:", e.target.textContent);
    }
  });
}
addInteractive(skillsList);
addInteractive(hobbiesList);

// === Drag and Drop reorder (fixed) ===
function enableDrag(list) {
  let dragged;
  list.addEventListener("dragstart", e => {
    dragged = e.target;
    e.dataTransfer.effectAllowed = "move";
  });

  list.addEventListener("dragover", e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  list.addEventListener("drop", e => {
    e.preventDefault();
    if (e.target.tagName === "LI" && e.target !== dragged) {
      // If dropping above the first item, handle correctly
      const bounding = e.target.getBoundingClientRect();
      const offset = e.clientY - bounding.top;
      if (offset < bounding.height / 2) {
        // Insert before target
        list.insertBefore(dragged, e.target);
      } else {
        // Insert after target
        list.insertBefore(dragged, e.target.nextSibling);
      }
      console.log("Item reordered");
    }
  });
}

enableDrag(skillsList);
enableDrag(hobbiesList);

// === Education Section ===
const eduSection = document.getElementById("education");
const addEduBtn = document.getElementById("add-edu");

// Function to enable editing for a record
function enableEducationEditing(record) {
  const editBtn = record.querySelector(".edit-edu");
  const deleteBtn = record.querySelector(".delete-edu");

  editBtn.addEventListener("click", () => {
    const schoolText = record.querySelector(".school").textContent.replace("School: ", "");
    const courseText = record.querySelector(".course").textContent.replace("Course: ", "");
    const yearText = record.querySelector(".year").textContent.replace("Year: ", "");

    // Create inputs
    const schoolInput = document.createElement("input");
    schoolInput.value = schoolText;
    const courseInput = document.createElement("input");
    courseInput.value = courseText;
    const yearInput = document.createElement("input");
    yearInput.value = yearText;

    // Replace content with inputs
    record.innerHTML = "";
    record.appendChild(schoolInput);
    record.appendChild(courseInput);
    record.appendChild(yearInput);

    // Confirm & Cancel buttons
    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "✔️";
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "❌";
    record.appendChild(confirmBtn);
    record.appendChild(cancelBtn);

    // Save function
    const save = () => {
      record.innerHTML = `
        <p class="school">School: ${schoolInput.value}</p>
        <p class="course">Course: ${courseInput.value}</p>
        <p class="year">Year: ${yearInput.value}</p>
        <button class="edit-edu">✏️ Edit</button>
        <button class="delete-edu">🗑️ Delete</button>
      `;
      console.log("Education edited:", schoolInput.value, courseInput.value, yearInput.value);
      enableEducationEditing(record); // reattach buttons
    };

    // Cancel function
    const cancel = () => {
      record.innerHTML = `
        <p class="school">School: ${schoolText}</p>
        <p class="course">Course: ${courseText}</p>
        <p class="year">Year: ${yearText}</p>
        <button class="edit-edu">✏️ Edit</button>
        <button class="delete-edu">🗑️ Delete</button>
      `;
      console.log("Edit cancelled");
      enableEducationEditing(record);
    };

    // Event listeners
    confirmBtn.addEventListener("click", save);
    cancelBtn.addEventListener("click", cancel);

    // Save on Enter (any field)
    [schoolInput, courseInput, yearInput].forEach(input => {
      input.addEventListener("keypress", e => {
        if (e.key === "Enter") save();
      });
    });
  });

  // Delete functionality
  deleteBtn.addEventListener("click", () => {
    record.remove();
    console.log("Education record deleted");
  });
}

// Enable editing for existing records
document.querySelectorAll(".edu-record").forEach(enableEducationEditing);

// Add new education record
addEduBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "edu-record";
  div.innerHTML = `
    <p class="school">School: New School</p>
    <p class="course">Course: New Course</p>
    <p class="year">Year: New Year</p>
    <button class="edit-edu">✏️ Edit</button>
    <button class="delete-edu">🗑️ Delete</button>
  `;
  eduSection.insertBefore(div, addEduBtn);
  enableEducationEditing(div);
  console.log("Education record added");
});


// === Save & Reset with Local Storage ===
const saveBtn = document.getElementById("save");
const resetBtn = document.getElementById("reset");

saveBtn.addEventListener("click", () => {
  const data = {
    profilePic: profilePic.src,
    name: document.getElementById("name").textContent,
    bio: document.getElementById("bio").textContent,
    skills: Array.from(skillsList.children).map(li => li.textContent),
    hobbies: Array.from(hobbiesList.children).map(li => li.textContent),
    education: Array.from(document.querySelectorAll(".edu-record")).map(div => div.textContent)
  };
  localStorage.setItem("profileData", JSON.stringify(data));
  console.log("Changes saved to local storage");
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("profileData");
  location.reload();
  console.log("Profile reset to default");
});

// === Restore from Local Storage ===
window.onload = () => {
  const saved = localStorage.getItem("profileData");
  if (saved) {
    const data = JSON.parse(saved);
    profilePic.src = data.profilePic;
    document.getElementById("name").textContent = data.name;
    document.getElementById("bio").textContent = data.bio;

    skillsList.innerHTML = "";
    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      li.draggable = true;
      skillsList.appendChild(li);
    });

    hobbiesList.innerHTML = "";
    data.hobbies.forEach(hobby => {
      const li = document.createElement("li");
      li.textContent = hobby;
      li.draggable = true;
      hobbiesList.appendChild(li);
    });

    const eduSection = document.getElementById("education");
    eduSection.querySelectorAll(".edu-record").forEach(div => div.remove());
    data.education.forEach(record => {
      const div = document.createElement("div");
      div.className = "edu-record";
      div.textContent = record;
      eduSection.appendChild(div);
    });

    console.log("Profile restored from local storage");
  }
};
