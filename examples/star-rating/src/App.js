import { Stars, STAR_COUNT } from "./Stars.js";

export function App({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.classList.add("star-wrap");
  $target.appendChild(this.$element);

  this.state = initialState;

  this.stars = new Stars({
    $target: this.$element,
    initialState: this.state,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.stars.setState(nextState);
  };

  this.$element.addEventListener("mouseout", (e) => {
    const targetRect = this.$element.getBoundingClientRect();
    const offsetX = e.clientX - targetRect.x;

    if (offsetX <= 0) {
      this.setState({
        rating: 0,
      });
      return;
    }
  });

  this.$element.addEventListener("mousemove", (e) => {
    const targetRect = this.$element.getBoundingClientRect();
    const offsetX = e.clientX - targetRect.x;

    if (offsetX <= 0) {
      this.setState({
        rating: 0,
      });
      return;
    }

    this.setState({
      rating: (offsetX * STAR_COUNT) / targetRect.width,
    });
  });

  this.$element.addEventListener("click", (e) => {
    const integer = Math.trunc(this.state.rating);
    const halfRating = Math.round(this.state.rating * 2) / 2;
    const calculatedRating =
      this.state.rating - integer > 0.5 ? Math.round(halfRating) : halfRating;

    alert(`너의 별점은 : ${calculatedRating} 이란다.`);
  });
}
