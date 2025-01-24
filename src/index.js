import { notesData } from "./sample-notes.js";
import "./custom-element.js";

const notesListElement = document.querySelector("#notesList");
const formElement = document.querySelector("#form");
const titleInput = formElement.elements.title;

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

formElement.addEventListener("submit", (event) => event.preventDefault());

const customValidation = (event) => {
  event.target.setCustomValidity("");
  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Field tidak boleh kosong");
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Field minimal 5 karakter");
  }
};

titleInput.addEventListener("input", customValidation);
titleInput.addEventListener("invalid", customValidation);
titleInput.addEventListener("change", customValidation);

titleInput.addEventListener("blur", (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedValidationId = event.target.getAttribute("aria-describedby");
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = "";
  }
});
