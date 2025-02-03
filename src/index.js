import markdownContent from "./markdown/index.md";
import markdownit from "markdown-it";
import "./styles/styles.css";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const md = markdownit();
const result = md.render(markdownContent);

const app = (document.getElementById("app").innerHTML = result);
