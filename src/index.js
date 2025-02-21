import "./custom-element.js";

const baseurl = "https://notes-api.dicoding.dev/v2";
const loading = document.querySelector("#loading");

const notesListElement = document.querySelector("#notesList");
const archivedListElement = document.querySelector("#archivedList");
const formElement = document.querySelector("#form");
const titleInput = formElement.elements.title;

function main() {
  const showLoading = (loading) => {
    loading.style.display = "block";
  };
  const hideLoading = (loading) => {
    loading.style.display = "none";
  };
  const getArchived = () => {
    showLoading(loading);
    fetch(`${baseurl}/notes/archived`, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        archivedListElement.innerHTML = "";

        responseJson.data.forEach((note) => {
          const element = createArchiveItem(note);
          archivedListElement.append(element);
        });
      })
      .finally(() => {
        hideLoading(loading);
      });
  };

  const getNotes = () => {
    showLoading(loading);
    fetch(`${baseurl}/notes`, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        notesListElement.innerHTML = "";

        responseJson.data.forEach((note) => {
          const element = createNoteItemElement(note);
          notesListElement.append(element);
        });
      })
      .catch((error) => {
        showResponseMessage(error);
      })
      .finally(() => {
        hideLoading(loading);
      });
  };

  const addNotes = (note) => {
    fetch(`${baseurl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNotes();
        getArchived();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const deleteNotes = (noteId) => {
    fetch(`${baseurl}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNotes();
        getArchived();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const archiveNotes = (noteId) => {
    fetch(`${baseurl}/notes/${noteId}/archive`, { method: "POST" })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNotes();
        getArchived();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const unarchiveNotes = (noteId) => {
    fetch(`${baseurl}/notes/${noteId}/unarchive`, { method: "POST" })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNotes();
        getArchived();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const createNoteItemElement = ({ id, title, body, createdAt }) => {
    const container = document.createElement("div");
    container.setAttribute("data-noteid", id);

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;

    const dateElement = document.createElement("p");
    dateElement.textContent =
      "Tanggal: " + new Date(createdAt).toLocaleString();

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
      deleteNotes(id);
    });

    const archiveButton = document.createElement("button");
    archiveButton.textContent = "Arsipkan";
    archiveButton.setAttribute("id", "arsipbtn");
    archiveButton.addEventListener("click", () => {
      archiveNotes(id);
    });

    container.append(
      titleElement,
      bodyElement,
      dateElement,
      deleteButton,
      archiveButton
    );

    return container;
  };

  const createArchiveItem = ({ id, title, body, createdAt }) => {
    const container = document.createElement("div");
    container.setAttribute("data-noteid", id);

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;

    const dateElement = document.createElement("p");
    dateElement.textContent =
      "Tanggal: " + new Date(createdAt).toLocaleString();

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
      deleteNotes(id);
    });

    const unarchiveButton = document.createElement("button");
    unarchiveButton.textContent = "Pulihkan";
    unarchiveButton.setAttribute("id", "unarsipbtn");
    unarchiveButton.addEventListener("click", () => {
      unarchiveNotes(id);
    });

    container.append(titleElement, bodyElement, dateElement, unarchiveButton);

    return container;
  };

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = {
      title: event.target.elements.title.value,
      body: event.target.elements.body.value,
    };
    addNotes(note);
  });

  const customValidation = (event) => {
    event.target.setCustomValidity("");
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Field tidak boleh kosong");
    }

    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Field minimal 5 karakter");
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
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
  getNotes();
  getArchived();
}
document.addEventListener("DOMContentLoaded", main);
export default main;
