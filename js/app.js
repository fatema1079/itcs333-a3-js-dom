// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(() => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const error = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    let filter = "all";

    function updateCounter() {
        const items = list.querySelectorAll("li");
        let count = 0;

        items.forEach(item => {
            if (!item.classList.contains("completed")) {
                count++;
            }
        });

        counter.textContent = count + " items left";
    }

    function showItems() {
        const items = list.querySelectorAll("li");

        items.forEach(item => {
            const completed = item.classList.contains("completed");

            if (filter === "all") {
                item.style.display = "";
            } else if (filter === "active") {
                item.style.display = completed ? "none" : "";
            } else {
                item.style.display = completed ? "" : "none";
            }
        });
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const text = input.value.trim();

        if (text === "") {
            error.classList.remove("hidden");
            return;
        }

        error.classList.add("hidden");

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.classList.add("item-text");
        const button = document.createElement("button");

        span.textContent = text;

        button.textContent = "Delete";
        button.type = "button";
        button.classList.add("delete-btn");

        li.appendChild(span);
        li.appendChild(button);

        list.appendChild(li);

        input.value = "";

        showItems();
        updateCounter();
    });

    list.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
        } else if (event.target.tagName === "SPAN") {
            event.target.parentElement.classList.toggle("completed");
        }

        showItems();
        updateCounter();
    });

    document.getElementById("filter-all").addEventListener("click", function() {
        filter = "all";
        showItems();
    });

    document.getElementById("filter-active").addEventListener("click", function() {
        filter = "active";
        showItems();
    });

    document.getElementById("filter-done").addEventListener("click", function() {
        filter = "done";
        showItems();
    });

    updateCounter();
})();
