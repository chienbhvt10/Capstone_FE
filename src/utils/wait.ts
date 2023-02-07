const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export default wait;
