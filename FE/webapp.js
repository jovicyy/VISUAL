import { html, css, LitElement } from 'lit';

class WildlifeNarrationApp extends LitElement {
  static properties = {
    category: { type: String },
    voiceEnabled: { type: Boolean },
    userType: { type: String },
    streams: { type: Array },
  };

  constructor() {
    super();
    this.category = 'africa';
    this.voiceEnabled = true;
    this.userType = 'adult';
    this.streams = [
      {
        id: 1,
        title: 'Elephant Cam',
        src: 'https://www.youtube.com/embed/Ihr_nwydXi0',
        img: 'https://source.unsplash.com/400x200/?elephant',
        category: 'africa',
      },
      {
        id: 2,
        title: 'Penguin Cam',
        src: 'https://www.youtube.com/embed/some-other-id',
        img: 'https://source.unsplash.com/400x200/?penguin',
        category: 'arctic',
      },
      // Add more as needed
    ];
  }

  static styles = css``;

  setCategory(cat) {
    this.category = cat;
  }

  toggleVoice(e) {
    this.voiceEnabled = e.target.checked;
  }

  setUserType(type) {
    this.userType = type;
  }

  narrate(title) {
    const message = `${title} narration started for ${this.userType}.`;
    if (this.voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    }
  }

  render() {
    return html`
      <div class="min-h-screen bg-gray-100 p-4">
        <header class="bg-white shadow p-4 mb-4 flex flex-col md:flex-row justify-between items-center rounded-xl">
          <div class="mb-2 md:mb-0">
            <h1 class="text-2xl font-bold mb-2">Hello, welcome!</h1>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                .checked=${this.voiceEnabled}
                @change=${this.toggleVoice}
                class="accent-blue-500"
              />
              <span>Enable Voice-over</span>
            </label>
          </div>
          <div class="space-x-2">
            <button
              @click=${() => this.setUserType('adult')}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Adult
            </button>
            <button
              @click=${() => this.setUserType('minor')}
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Minor
            </button>
          </div>
        </header>

        <nav class="mb-4 flex flex-wrap gap-2">
          ${['africa', 'ocean', 'farm', 'forest', 'arctic', 'backyard'].map(
            (cat) => html`
              <button
                @click=${() => this.setCategory(cat)}
                class="px-4 py-2 rounded-lg text-white ${
                  this.category === cat
                    ? 'bg-blue-500'
                    : 'bg-gray-400 hover:bg-gray-500'
                }"
              >
                ${cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            `
          )}
        </nav>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${this.streams
            .filter((s) => s.category === this.category)
            .map(
              (s) => html`
                <div class="bg-white shadow rounded-xl p-4">
                  <img
                    src=${s.img}
                    alt="${s.title}"
                    class="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <iframe
                    src=${s.src}
                    allowfullscreen
                    class="w-full h-48 rounded-md"
                  ></iframe>
                  <button
                    @click=${() => this.narrate(s.title)}
                    class="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
                  >
                    ▶ Narrate
                  </button>
                  <p class="mt-2 text-lg font-semibold text-gray-800">
                    ${s.title}
                  </p>
                </div>
              `
            )}
        </section>
      </div>
    `;
  }
}

customElements.define('wildlife-narration-app', WildlifeNarrationApp);