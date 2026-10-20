const form = document.getElementById("noteForm");
const notesDiv = document.getElementById("notes");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("/api/notes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            content
        })
    });

    if (response.ok) {

        alert("Note saved!");

        form.reset();

        loadNotes();
    }
});


async function loadNotes() {

    const response = await fetch("/api/notes");

    const notes = await response.json();

    notesDiv.innerHTML = "";

    notes.forEach((note) => {

        const div = document.createElement("div");

        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>
                ${new Date(note.createdAt).toLocaleString()}
            </small>
        `;

        notesDiv.appendChild(div);
    });
}


loadNotes();