export interface PTBCredentials {
      email: string;
      password: string;
    }
/**
 * function for querying e-mail adress and password for authenticated retrieval of the live link JSON file from PTB's SteVe server
 */

export function promptLogin(title = "Anmelden"): Promise<PTBCredentials | null> {
  return new Promise((resolve) => {
      //GUI element definitions
    const dialog = document.createElement("dialog");
    dialog.className = "login-dialog";

    const form = document.createElement("form");
    form.method = "dialog";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const userLabel = document.createElement("label");
    userLabel.innerHTML = '<i class="fas fa-user"></i> E-Mail-Adresse';
    const userInput = document.createElement("input");
    userInput.type = "text";
    userInput.name = "email";
    userInput.autocomplete = "email";
    userInput.required = true;
    userLabel.appendChild(userInput);

    const passLabel = document.createElement("label");
    passLabel.innerHTML = '<i class="fas fa-lock"></i> Passwort';
    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.name = "password";
    passInput.autocomplete = "current-password";
    passInput.required = true;
    passLabel.appendChild(passInput);

    const buttons = document.createElement("div");
    buttons.className = "login-dialog-buttons";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Abbrechen";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Anmelden';

    buttons.append(cancelButton, submitButton);
    form.append(heading, userLabel, passLabel, buttons);
    dialog.appendChild(form);
    document.body.appendChild(dialog);

    let result: PTBCredentials | null = null;
    //listeners for related events
    form.addEventListener("submit", () => {
      result = {
        email: userInput.value.trim(),
        password: passInput.value,
      };
      // method="dialog" closes the dialog automatically
    });

    cancelButton.addEventListener("click", () => dialog.close());

    // called in the event of a sumit or cancel action
    dialog.addEventListener("close", () => {
      passInput.value = "";
      dialog.remove();
      resolve(result);
    });

    dialog.showModal();
    userInput.focus();
  });
}
