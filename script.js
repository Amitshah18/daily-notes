const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const saveEntryBtn = document.getElementById("saveEntry");
const entriesListEl = document.getElementById("entriesList");
const themeToggleBtn = document.getElementById("themeToggle");
const searchBox = document.getElementById("searchBox");

let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

function updateUI() {
    entriesListEl.innerHTML = "";
    journalEntries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div>
                <strong>${entry.title}</strong> - <small>${entry.date}</small>
                <p>${entry.content}</p>
            </div>
            <div>
                <button class="btn btn-warning btn-sm" onclick="editEntry(${index})"><i class="fa-solid fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        entriesListEl.appendChild(li);
    });

    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
}

function saveEntry() {
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();
    const date = new Date().toLocaleString();

    if (title === "" || content === "") {
        alert("Please enter title and content.");
        return;
    }

    journalEntries.push({ title, content, date });
    updateUI();
    titleEl.value = "";
    contentEl.value = "";
}

function deleteEntry(index) {
    journalEntries.splice(index, 1);
    updateUI();
}

function editEntry(index) {
    const entry = journalEntries[index];
    titleEl.value = entry.title;
    contentEl.value = entry.content;

    journalEntries.splice(index, 1);
    updateUI();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function searchEntries() {
    const query = searchBox.value.toLowerCase();
    const filteredEntries = journalEntries.filter(entry => 
        entry.title.toLowerCase().includes(query) || entry.content.toLowerCase().includes(query)
    );

    entriesListEl.innerHTML = "";
    filteredEntries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div>
                <strong>${entry.title}</strong> - <small>${entry.date}</small>
                <p>${entry.content}</p>
            </div>
            <div>
                <button class="btn btn-warning btn-sm" onclick="editEntry(${index})"><i class="fa-solid fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        entriesListEl.appendChild(li);
    });
}

saveEntryBtn.addEventListener("click", saveEntry);
themeToggleBtn.addEventListener("click", toggleTheme);
searchBox.addEventListener("input", searchEntries);

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateUI();
});
