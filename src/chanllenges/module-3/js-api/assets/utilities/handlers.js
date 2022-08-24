export default () => {
  document.getElementById("#featuresOptions").onchange = (e) => {
    const { value, text } = e.target.selectedOptions[0];
    console.log(value, text);
  };
};
