//Github (buy me coffee on kofi): https://github.com/Frimi01/Frimi01-Projects
//BOOKMARK LOGIC:

// Config:
const PORT = 3000;

// Communicate with server:
async function getBookmarks() {
    try {
        const response = await fetch(`http://localhost:${PORT}/get-bookmarks`, {method: 'GET', mode: 'cors'});
        if (!response.ok) throw new Error('Failed to fetch bookmarks');

        bookmarks = await response.json();
        renderTree(); 
        console.log("Bookmarks loaded sucsessfully!")
    } catch (error) {
        console.error("Error loading bookmarks:", error);
        bookmarks = [];
    }
}

async function saveBookmarks() {
    try {
        await fetch(`http://localhost:${PORT}/save-json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookmarks),
        });
        console.log("Bookmarks saved successfully!");
    } catch (error) {
        console.error("Failed to save bookmarks:", error);
    }
}

// Finds mouse for context menu:
let currentTarget = null;

//Renders and saves the state of the bookmarks:
function renderTree() {
    const tree = document.getElementById('bookmarkTree');
    tree.innerHTML = '';
    bookmarks.forEach((folder, index) => {
        const folderElement = document.createElement('li');
        folderElement.innerHTML = `<span class="folder" onclick="toggleFolder(${index})" oncontextmenu="showContextMenu(event, 'folder', ${index})">${folder.name}</span>`;

        const folderContent = document.createElement('ul');
        folderContent.className = 'folder-content';
        folderContent.style.display = folder.open ? 'block' : 'none';
        folder.bookmarks.forEach((bookmark, bIndex) => {
            const bookmarkElement = document.createElement('li');
            bookmarkElement.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.name}</a>`;
            bookmarkElement.classList.add('bookmark');
            bookmarkElement.setAttribute('oncontextmenu', `showContextMenu(event, 'bookmark', ${index}, ${bIndex})`);
            folderContent.appendChild(bookmarkElement);
        });
        
        folderElement.appendChild(folderContent);
        tree.appendChild(folderElement);
    });
}

// Context menu options:
function addFolder() {
    const name = prompt("Enter folder name:");
    if (name) bookmarks.push({ name, bookmarks: [], open: false });
    saveAndRender();
}

function addBookmark(folderIndex) {
    const name = prompt("Enter bookmark name:");
    const url = prompt("Enter bookmark URL:");
    if (name && url) bookmarks[folderIndex].bookmarks.push({ name, url });
    saveAndRender();
}

function renameFolder(index) {
    const name = prompt("Enter new folder name:", bookmarks[index].name);
    if (name) bookmarks[index].name = name;
    saveAndRender();
}

function renameBookmark(folderIndex, bookmarkIndex) {
    const name = prompt("Enter new bookmark name:", bookmarks[folderIndex].bookmarks[bookmarkIndex].name);
    if (name) bookmarks[folderIndex].bookmarks[bookmarkIndex].name = name;
    saveAndRender();
}

function editBookmarkUrl(folderIndex, bookmarkIndex) {
    const url = prompt("Enter new bookmark URL:", bookmarks[folderIndex].bookmarks[bookmarkIndex].url);
    if (url) bookmarks[folderIndex].bookmarks[bookmarkIndex].url = url;
    saveAndRender();
}

function deleteFolder(index) {
    if (confirm("Are you sure you want to delete this folder?")) {
        bookmarks.splice(index, 1);
        saveAndRender();
    }
}

function deleteBookmark(folderIndex, bookmarkIndex) {
    if (confirm("Are you sure you want to delete this bookmark?")) {
        bookmarks[folderIndex].bookmarks.splice(bookmarkIndex, 1);
        saveAndRender();
    }
}

// Opens and closes the folder:
function toggleFolder(index) {
    bookmarks[index].open = !bookmarks[index].open;
    saveAndRender();
}

// Exports and imports bookmarks (frontend)
function exportBookmarks() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks));
    const downloadAnchor = document.createElement('a');
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
    reader.onload = function(e) {
        bookmarks = JSON.parse(e.target.result);
        saveAndRender();
    };
    reader.readAsText(file);
}

// Main Context Menu Logic:
function showContextMenu(event, type, folderIndex, bookmarkIndex = null) {
    event.preventDefault();
    currentTarget = { type, folderIndex, bookmarkIndex };
    
    const menu = document.getElementById('contextMenu');
    menu.innerHTML = '';
    
    if (type === 'folder') {
        menu.innerHTML = `<button onclick="renameFolder(${folderIndex})">Rename Folder</button>
                            <button onclick="deleteFolder(${folderIndex})">Delete Folder</button>
                            <button onclick="addBookmark(${folderIndex})">Add Bookmark</button>`;
    } else if (type === 'bookmark') {
        menu.innerHTML = `<button onclick="renameBookmark(${folderIndex}, ${bookmarkIndex})">Rename Bookmark</button>
                            <button onclick="editBookmarkUrl(${folderIndex}, ${bookmarkIndex})">Edit URL</button>
                            <button onclick="deleteBookmark(${folderIndex}, ${bookmarkIndex})">Delete Bookmark</button>`;
    }
    
    menu.style.display = 'block';
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
}

document.addEventListener('click', () => {
    document.getElementById('contextMenu').style.display = 'none';
});

// Saves and renders the bookmarks (so I don't forget one when adding the other)
function saveAndRender(){
    saveBookmarks();
    renderTree();
}

// Fetch and render bookmarks on page load
getBookmarks();
