class customHeader extends HTMLElement {
  static observedAttributes = ["title"];

  constructor() {
    super();
    this.innerHTML = `
      <header>
        <h1>${this.getAttribute("title")}</h1>
      </header>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.querySelector("h1").textContent = newValue;
    }
  }
}

class customFooter extends HTMLElement {
  static observedAttributes = ["title"];

  constructor() {
    super();
    this.innerHTML = `
      <footer>
        <h1>${this.getAttribute("title")}</h1>
      </footer>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.querySelector("h1").textContent = newValue;
    }
  }
}

class customForm extends HTMLElement {
  static observedAttributes = ["title"];
  constructor() {
    super();
    this.innerHTML = `
      <form id="form">
        <h1>${this.getAttribute("title")}</h1>
        <input type="text" name="title" placeholder="Judul" required minlength="5" aria-describedby="usernameValidation" />
        <p id="usernameValidation" class="validation-message" aria-live="polite"></p>
        <textarea name="body" placeholder="Isi..." required></textarea>
        <button type="submit">TAMBAHKAN</button>
      </form>
    `;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.querySelector("h1").textContent = newValue;
    }
  }
}

customElements.define("custom-header", customHeader);
customElements.define("custom-footer", customFooter);
customElements.define("custom-form", customForm);
