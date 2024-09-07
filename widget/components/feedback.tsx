/**
 * @file Feedback Widget using Shadow DOM
 * This file implements a feedback widget as a Web Component using Shadow DOM for enhanced encapsulation and security.
 * It uses array methods like map, filter, find, and reduce instead of loops.
 *
 * @path widget/components/feedback.tsx
 */

class FeedbackWidget extends HTMLElement {
	private shadow: ShadowRoot;
	private apiKey: string;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "closed" });
		this.apiKey = this.getAttribute("api-key") || "";
	}

	connectedCallback() {
		this.render();
		this.attachEventListeners();
	}

	private render() {
		const style = `
      :host {
        all: initial;
        display: block;
        contain: content;
        font-family: Arial, sans-serif;
      }
      .widget {
        @apply fixed bottom-5 right-5 bg-white border border-gray-300 rounded-lg p-4 shadow-lg;
      }
      h2 { @apply mt-0; }
      textarea {
        @apply w-full mb-2 p-2 border border-gray-300 rounded;
      }
      .rating {
        @apply mb-2;
      }
      .star {
        @apply text-gray-400 cursor-pointer text-2xl;
      }
      .star.active { @apply text-yellow-500; }
    `;

		const html = `
      <div class="widget">
        <h2>Feedback</h2>
        <div class="rating">
          ${this.generateStarsHtml()}
        </div>
        <textarea placeholder="Your feedback..."></textarea>
        <button class="shadcn-button">Submit</button>
      </div>
    `;

		const styleElement = document.createElement("style");
		styleElement.textContent = style;
		this.shadow.appendChild(styleElement);

		const container = document.createElement("div");
		container.innerHTML = html;
		this.shadow.appendChild(container);
	}

	private generateStarsHtml(): string {
		return Array(5)
			.fill("★")
			.map(
				(star, index) =>
					`<span class="star" data-value="${index + 1}">${star}</span>`,
			)
			.join("");
	}

	private attachEventListeners() {
		const stars = Array.from(this.shadow.querySelectorAll(".star"));
		const textarea = this.shadow.querySelector(
			"textarea",
		) as HTMLTextAreaElement;
		const submitButton = this.shadow.querySelector("button");

		let rating = 0;

		stars.map((star) => {
			star.addEventListener("click", (e) => {
				const target = e.target as HTMLElement;
				rating = Number.parseInt(target.dataset.value || "0", 10);
				this.updateStars(stars, rating);
			});
			return star;
		});

		submitButton?.addEventListener("click", () => {
			const message = textarea.value;
			this.submitFeedback(rating, message);
		});
	}

	private updateStars(stars: Element[], rating: number) {
		stars.map((star, index) => {
			star.classList.toggle("active", index < rating);
			return star;
		});
	}

	private async submitFeedback(rating: number, message: string) {
		console.log("Submitting feedback:", {
			rating,
			message,
			apiKey: this.apiKey,
		});

		// Here you would typically make an API call, e.g.:
		// try {
		//   const response = await fetch('https://your-api.com/feedback', {
		//     method: 'POST',
		//     headers: {
		//       'Content-Type': 'application/json',
		//       'Authorization': `Bearer ${this.apiKey}`
		//     },
		//     body: JSON.stringify({ rating, message })
		//   });
		//   if (!response.ok) throw new Error('Failed to submit feedback');
		//   // Handle success (e.g., show a thank you message)
		// } catch (error) {
		//   console.error('Error submitting feedback:', error);
		//   // Handle error (e.g., show an error message to the user)
		// }
	}
}

customElements.define("feedback-widget", FeedbackWidget);