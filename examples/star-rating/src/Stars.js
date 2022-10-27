export const STAR_COUNT = 5;

const starItemTemplate = `
  <svg class="star" viewBox="0 0 20 20">
    <use xlink:href="#stars-[[__item__]]-star" />
  </svg>
`;

export function Stars({ $target, initialState }) {
  this.state = initialState;

  this.generateStarItem = (_, index) => {
    if (this.state.rating === 0) {
      return starItemTemplate.replace("[[__item__]]", "empty");
    }

    const integer = Math.trunc(this.state.rating);

    if (index === integer) {
      return starItemTemplate.replace(
        "[[__item__]]",
        this.state.rating - integer > 0.5 ? "full" : "half"
      );
    }

    return starItemTemplate.replace(
      "[[__item__]]",
      index < integer ? "full" : "empty"
    );
  };

  this.render = () => {
    const starHTMLString = Array.from({ length: STAR_COUNT }).map(
      this.generateStarItem
    );
    $target.innerHTML = starHTMLString.join("");
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}
