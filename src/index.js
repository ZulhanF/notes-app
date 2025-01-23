import { notesData } from "./sample-notes.js";

const notesListElement = document.querySelector("#notesList");

function createNoteItemElement({ id, title, body, createdAt, archived }) {
  const container = document.createElement("div");
  container.setAttribute("data-noteid", id);

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const bodyElement = document.createElement("p");
  bodyElement.innerText = body;

  const dateElement = document.createElement("p");
  dateElement.textContent = "Tanggal:" + new Date(createdAt).toLocaleString();

  const archivedElement = document.createElement("p");
  archivedElement.textContent = "Status" + archived ? "Archived" : "Active";

  container.append(titleElement, bodyElement, dateElement, archivedElement);

  return container;
}

notesData.forEach((sampleNote) => {
  const element = createNoteItemElement(sampleNote);
  notesListElement.append(element);
});
