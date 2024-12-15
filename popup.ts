console.log("Popup file")

// BookmarkTypes
enum NodeType {
    FOLDER, BOOKMARK
}

// BookmarkNode
type BookmarkNode = {
    nodeType: NodeType
    name: string
    children: BookmarkNode[] | null
}

const root: BookmarkNode = {
    nodeType: NodeType.FOLDER,
    name: "root", children: []
}

const tempBookmark: BookmarkNode = {
    nodeType: NodeType.BOOKMARK,
    name: "bookmark", children: null
}

const tempFolder: BookmarkNode = {
    nodeType: NodeType.FOLDER,
    name: "folder", children: []
}

function addFolder(folder: BookmarkNode) {
    console.log(`Add folder called with node [${folder.name},${folder.nodeType},${folder.children}]`)
    if (root.children == null) {
        root.children = []
    }

    root.children.push(folder)

    // re-render updated list
    renderBookmarkList()
}

function addBookmark(bookmark: BookmarkNode) {
    console.log(`Add bookmark called with node [${bookmark.name},${bookmark.nodeType},${bookmark.children}]`)
    if (root.children == null) {
        root.children = []
    }

    root.children.push(bookmark)

    // re-render updated list
    renderBookmarkList()
}

function removeBookmarkNode(index: number) {
    console.log(`Remove bookmark called with index ${index}`)
    if (root.children) {
        root.children.splice(index, 1)
    }

    // re-render updated list
    renderBookmarkList()
}

function editBookmarkNode(index: number) {
    console.log(`Edit bookmark called with index ${index}`)
    if (root.children) {
        const bookmark = root.children?.[index]
        if (bookmark) {
            const newName = prompt("New bookmark name")
            if (newName) {
                bookmark.name = newName

                // re-render updated list
                renderBookmarkList()
            }
        }
    }
}

function renderBookmarkList() {
    const bookmarkList = document.getElementById("bkmList")

    if (bookmarkList) {
        // clean up bookmark list before re-rendering
        bookmarkList.innerHTML = ""
        root.children?.forEach((node, index) => {
            const item = document.createElement("li")
            const itemContent = document.createElement("div")
            switch (node.nodeType) {
                case NodeType.BOOKMARK:
                    itemContent.className = "bookmark-item"
                    break
                case NodeType.FOLDER:
                    itemContent.className = "folder-item"
                    break
                default: console.log(`Error NodeType is invalid! ${node.nodeType}`)
            }

            // Name section
            const nameSection = document.createElement("div")
            nameSection.textContent = node.name

            // Button group (Remove,Edit)
            const buttonGroup = document.createElement("div")
            buttonGroup.className = "button-group"

            // Remove button
            const removeButton = document.createElement("button")
            removeButton.textContent = "remove"
            removeButton.onclick = () => removeBookmarkNode(index)

            // Edit button
            const editButton = document.createElement("button")
            editButton.textContent = "edit"
            editButton.onclick = () => editBookmarkNode(index)

            buttonGroup.appendChild(removeButton)
            buttonGroup.appendChild(editButton)

            itemContent.appendChild(nameSection)
            itemContent.appendChild(buttonGroup)

            item.appendChild(itemContent)

            bookmarkList.appendChild(item)
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addBookmarkButton = document.getElementById("addButton")
    if (addBookmarkButton) {
        addBookmarkButton.addEventListener("click", () => addBookmark(tempBookmark))
    }

    const addFolderButton = document.getElementById("addFolder")
    if (addFolderButton) {
        addFolderButton.addEventListener("click", () => addFolder(tempFolder))
    }

    // initial bookmark list render
    renderBookmarkList()
})
