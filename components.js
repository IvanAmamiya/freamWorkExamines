// Define a simple Web Component for <my-button>
class MyButton extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM for style encapsulation
    this.attachShadow({ mode: 'open' });
    // Create a button element
    this.button = document.createElement('button');
    this.button.textContent = this.getAttribute('label') || 'My Button';
    this.button.className = 'my-button';
    // Add click event if attribute exists
    if (this.hasAttribute('onclick')) {
      this.button.addEventListener('click', () => {
        // Evaluate the onclick attribute as JS code (for demo only)
        // In production, use CustomEvent or callback
        eval(this.getAttribute('onclick'));
      });
    }
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .my-button {
        padding: 8px 16px;
        background: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .my-button:hover {
        background: #0056b3;
      }
    `;
    this.shadowRoot.append(style, this.button);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      this.button.textContent = newValue;
    }
  }
}

customElements.define('my-button', MyButton);
