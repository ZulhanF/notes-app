import { notesData } from "./sample-notes.js";

const notesListElement = document.querySelector("#notesList");

function checkArchive(archived) {
  if (archived) {
    return "Archived";
  } else {
    return "Active";
  }
}

function createnotesListElement({ id, title, body, createdAt, archived }) {
  let cond = checkArchive(archived);
  let tgl = new Date(createdAt).toLocaleString();
  return `
    <div data-noteid="${id}">
        <h2>${title}</h2>
        <p>${body}</p>
        <p>Tanggal: ${tgl}</p>
        <p>Status: ${cond}</p>
    </div>
    `;
}

const listItem = notesData.map((sampleNote) => {
  return createnotesListElement(sampleNote);
});

notesListElement.innerHTML = listItem.join(``);
