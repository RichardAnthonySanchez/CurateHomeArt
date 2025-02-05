// find a way to generate pages from product tags
import markdownContent from "./markdown/index.md";
import markdownit from "markdown-it";
import "./styles/styles.css";
import art1Content from "./markdown/products/art1.md";
import art2Content from "./markdown/products/art2.md";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const routes = {
  "/": "<h1>Home Page</h1>",
  "/art1": art1Content,
  "/art2": art2Content,
};

function navigate() {
  const path = window.location.pathname;
  document.getElementById("app").innerHTML =
    routes[path] || "<h1>404 Not Found</h1>";
}

window.addEventListener("popstate", navigate); // Handle browser back/forward
document.addEventListener("DOMContentLoaded", navigate);

document.title = "Dynamic Title"; // Replace <title>{{ title }}</title>
