import { notesData } from "./sample-notes.js";

const notesListElement = document.querySelector("#notesList");

function checkArchive(archived) {
  if (archived) {
    return "Archived";
  } else {
    return "Active";
  }
}

function createNoteItemElement({ id, title, body, createdAt, archived }) {
  const container = document.createElement("div");
  container.setAttribute("data-noteid", id);

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const bodyElement = document.createElement("p");
  bodyElement.innerText = body;

  const dateElement = document.createElement("p");
  dateElement.textContent = "Tanggal: " + new Date(createdAt).toLocaleString();

  const archivedElement = document.createElement("p");
  let cond = checkArchive(archived);
  archivedElement.textContent = "Status: " + cond;

  container.append(titleElement, bodyElement, dateElement, archivedElement);

  return container;
}

notesData.forEach((sampleNote) => {
  const element = createNoteItemElement(sampleNote);
  notesListElement.append(element);
});
