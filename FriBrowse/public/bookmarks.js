//Github (buy me coffee on kofi): https://github.com/Frimi01/Frimi01-Projects
//BOOKMARK LOGIC:

// Config:
const PORT = 3000;

//classes
class BookmarkManager {
  constructor(port) {
    this.port = port;
    this.bookmarks = [];
  }

  // Communicate with server:
  async getBookmarks() {
    try {
      const response = await fetch(
        `http://localhost:${this.port}/get-bookmarks`,
        {
          method: "GET",
          mode: "cors",
        },
      );
      if (!response.ok) throw new Error("Failed to fetch bookmarks");

      this.bookmarks = await response.json();
      renderTree();
      console.log("Bookmarks loaded sucsessfully!");
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      this.bookmarks = [];
    }
  }
  async saveBookmarks() {
    try {
      await fetch(`http://localhost:${this.port}/save-json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bookmarks),
      });
      console.log("Bookmarks saved successfully!");
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }

  // Function to find a folder by index path

  getFolderByPath(folderPath) {
    let folder = { folders: this.bookmarks };
    for (let index of folderPath) {
      if (!folder.folders || !folder.folders[index]) {
        return null;
      }
      folder = folder.folders[index]; // Move into the subfolder
    }
    return folder;
  }
}

//Renders and saves the state of the bookmarks:
function renderTree() {
  const tree = document.getElementById("bookmarkTree");
  tree.innerHTML = "";

  function renderFolder(folder, folderPath, parentElement) {
    const folderElement = document.createElement("li");

    // Create folder span
    const folderName = document.createElement("span");
    folderName.classList.add("folder");
    folderName.textContent = `📁 ${folder.name}`;
    folderName.onclick = () => toggleFolder(folderPath);
    folderName.oncontextmenu = (event) =>
      showContextMenu(event, "folder", folderPath);

    folderElement.appendChild(folderName);

    // Create folder content container
    const folderContent = document.createElement("ul");
    folderContent.className = "folder-content";
    folderContent.style.display = folder.open ? "block" : "none";

    // Render subfolders
    if (folder.folders) {
      folder.folders.forEach((subFolder, fIndex) => {
        renderFolder(subFolder, [...folderPath, fIndex], folderContent);
      });
    }

    // Render bookmarks
    if (folder.bookmarks && Array.isArray(folder.bookmarks)) {
      folder.bookmarks.forEach((bookmark, bIndex) => {
        const bookmarkElement = document.createElement("li");
        const bookmarkLink = document.createElement("a");

        bookmarkLink.href = bookmark.url;
        bookmarkLink.target = "_blank";
        bookmarkLink.textContent = bookmark.name;

        bookmarkElement.classList.add("bookmark");
        bookmarkElement.appendChild(bookmarkLink);
        bookmarkElement.oncontextmenu = (event) =>
          showContextMenu(event, "bookmark", folderPath, bIndex);

        folderContent.appendChild(bookmarkElement);
      });
    }

    folderElement.appendChild(folderContent);
    parentElement.appendChild(folderElement);
  }

  // Render top-level folders
  bookmarkManager.bookmarks.forEach((folder, index) => {
    renderFolder(folder, [index], tree);
  });
}

// Context menu options:
function addFolder() {
  const name = prompt("Enter folder name:");
  if (name)
    bookmarkManager.bookmarks.push({
      name,
      folders: [],
      bookmarks: [],
      open: false,
    });
  saveAndRender();
}

function addSubFolder(folderPath) {
  const name = prompt("Enter folder name:");
  if (!name) return;

  let targetFolder = bookmarkManager.getFolderByPath(folderPath);
  if (!targetFolder || !targetFolder.folders) {
    console.error("Target folder not found.");
    return;
  }

  targetFolder.folders.push({ name, folders: [], bookmarks: [], open: false });
  saveAndRender();
}

function renameFolder(folderPath) {
  let folder = bookmarkManager.getFolderByPath(folderPath);
  if (!folder) return console.error("Error: Folder not found.");

  const name = prompt("Enter new folder name:", folder.name);
  if (name) {
    folder.name = name;
    saveAndRender();
  }
}

function addBookmark(folderPath) {
  const name = prompt("Enter bookmark name:");
  const url = prompt("Enter bookmark URL:");
  if (!name || !url) return;

  const targetFolder = bookmarkManager.getFolderByPath(folderPath);
  if (!targetFolder || !targetFolder.bookmarks) {
    console.error("Error: Could not find target folder!");
    return;
  }

  targetFolder.bookmarks.push({ name, url }); // Add bookmark
  saveAndRender();
}

function renameBookmark(folderPath, bookmarkIndex) {
  const folder = bookmarkManager.getFolderByPath(folderPath);
  if (!folder || !folder.bookmarks[bookmarkIndex])
    return console.error("Error: Bookmark not found.");

  const name = prompt(
    "Enter new bookmark name:",
    folder.bookmarks[bookmarkIndex].name,
  );
  if (name) {
    folder.bookmarks[bookmarkIndex].name = name;
    saveAndRender();
  }
}

function editBookmarkUrl(folderPath, bookmarkIndex) {
  let folder = bookmarkManager.getFolderByPath(folderPath);
  if (!folder || !folder.bookmarks[bookmarkIndex]) return;

  const url = prompt(
    "Enter new bookmark URL:",
    folder.bookmarks[bookmarkIndex].url,
  );
  if (url) {
    folder.bookmarks[bookmarkIndex].url = url;
    saveAndRender();
  }
}

function deleteFolder(folderPath) {
  if (!confirm("Are you sure you want to delete this folder?")) return;

  let parentPath = [...folderPath];
  let folderIndex = parentPath.pop(); // Get the last index (folder to delete)

  let parentFolder = bookmarkManager.getFolderByPath(parentPath);

  if (parentFolder) {
    parentFolder.folders.splice(folderIndex, 1); // Remove the folder from its parent's list
  } else {
    bookmarkManager.bookmarks.splice(folderIndex, 1); // If it's a top-level folder
  }

  saveAndRender();
}

function deleteBookmark(folderPath, bookmarkIndex) {
  if (!confirm("Are you sure you want to delete this bookmark?")) return;

  const folder = bookmarkManager.getFolderByPath(folderPath);
  if (!folder || !folder.bookmarks[bookmarkIndex])
    return console.error("Error: Bookmark not found.");

  folder.bookmarks.splice(bookmarkIndex, 1);
  saveAndRender();
}

// Opens and closes the folder:
function toggleFolder(folderPath) {
  const folder = bookmarkManager.getFolderByPath(folderPath);
  if (!folder) return console.error("Folder not found:", folderPath);

  folder.open = !folder.open;
  saveAndRender();
}

// Exports and imports bookmarks (frontend)
function exportBookmarks() {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(bookmarkManager.bookmarks));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "bookmarks.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
}

function importBookmarks(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    bookmarkManager.bookmarks = JSON.parse(e.target.result);
    saveAndRender();
  };
  reader.readAsText(file);
}

// Main Context Menu Logic:
function showContextMenu(event, type, folderPath, bookmarkIndex = null) {
  event.preventDefault();
  //console.log("Context menu opened:", { type, folderPath });
  currentTarget = { type, folderPath, bookmarkIndex };

  const menu = document.getElementById("contextMenu");

  const actions = {
    folder: [
      { label: "Rename Folder", action: () => renameFolder(folderPath) },
      { label: "Delete Folder", action: () => deleteFolder(folderPath) },
      { label: "Add Folder", action: () => addSubFolder(folderPath) },
      { label: "Add Bookmark", action: () => addBookmark(folderPath) },
    ],
    bookmark: [
      {
        label: "Rename Bookmark",
        action: () => renameBookmark(folderPath, bookmarkIndex),
      },
      {
        label: "Edit URL",
        action: () => editBookmarkUrl(folderPath, bookmarkIndex),
      },
      {
        label: "Delete Bookmark",
        action: () => deleteBookmark(folderPath, bookmarkIndex),
      },
    ],
  };

  menu.innerHTML = ""; // Clear existing menu
  actions[type]?.forEach(({ label, action }) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.onclick = action;
    menu.appendChild(button);
  });

  menu.style.display = "block";
  menu.style.left = `${event.pageX}px`;
  menu.style.top = `${event.pageY}px`;
}

document.addEventListener("click", () => {
  document.getElementById("contextMenu").style.display = "none";
});

// Saves and renders the bookmarks (so I don't forget one when adding the other)
async function saveAndRender() {
  await bookmarkManager.saveBookmarks();
  renderTree();
}

const bookmarkManager = new BookmarkManager(PORT);
// Fetch and render bookmarks on page load
bookmarkManager.getBookmarks();
