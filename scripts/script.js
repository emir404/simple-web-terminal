const terminal = document.querySelector(".terminal");
const lines = document.querySelector(".lines");

let startLines = [
    "░██╗░░░░░░░██╗███████╗░█████╗░██████╗░██╗░░░██╗░██████╗",
    "░██║░░██╗░░██║██╔════╝██╔══██╗██╔══██╗██║░░░██║██╔════╝",
    "░╚██╗████╗██╔╝█████╗░░███████║██████╔╝██║░░░██║╚█████╗░",
    "░░████╔═████║░██╔══╝░░██╔══██║██╔══██╗██║░░░██║░╚═══██╗",
    "░░╚██╔╝░╚██╔╝░███████╗██║░░██║██║░░██║╚██████╔╝██████╔╝",
    "░░░╚═╝░░░╚═╝░░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚═════╝░╚═════╝░"
]

let socialMedia = {
    "github": "https://github.com/wearus",
}

let commands = {
    "clear": {
        "function": () => {
            lines.innerHTML = "";
            terminal.value = "";
        }

    },

    "help": {
        "function": () => {
            let str = "";
            for (command in commands) {
                str += command + "  ";
            }

            addLine(str, "info");
        }
    },

    "links": {
        "function": () => {
            for (link in socialMedia) {
                addLine(`${link}: ${socialMedia[link]}`, "link");
            }
        }
    },

    "sudo": {
        "function": () => {
            addLine("Bu komutu kullanmak için yetkiniz yok!", "error");
        }
    }
}

let addLine = (text, type) => {
    if (lines.children.length > 33) {
        lines.removeChild(lines.children[0]);
    }

    let line = document.createElement("p");
    line.classList.add("line");
    line.classList.add(type);
    line.innerHTML = text;
    lines.appendChild(line);
    terminal.value = "";
}


terminal.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && terminal.value !== "") {
        let command = terminal.value;
        if (command in commands) {
            commands[command].function();
        } else {
            addLine("Böyle bir komut bulunamadı!", "error");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let interval = setInterval(() => {
        if (startLines.length > 0) {
            addLine(startLines[0], "error");
            startLines.shift();
        } else {
            clearInterval(interval);
        }
    }, 200);
});