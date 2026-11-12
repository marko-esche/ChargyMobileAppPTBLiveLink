export type PTBLiveLink =
    { kind: "text"; text: string };

export interface PTBCredentials {
      username: string;
      password: string;
    }


export type CordovaExec = (success: (value: unknown) => void,
                           failure: (error: unknown) => void,
                           service: string,
                           action: string,
                           args: readonly unknown[]) => void;


}

export function getPtbLiveLink(): {
}

export function promptLogin(title = "Anmelden"): Promise<Credentials | null> {
  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.className = "login-dialog";

    const form = document.createElement("form");
    form.method = "dialog";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const userLabel = document.createElement("label");
    userLabel.innerHTML = '<i class="fas fa-user"></i> Nutzername';
    const userInput = document.createElement("input");
    userInput.type = "text";
    userInput.name = "username";
    userInput.autocomplete = "username";
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

    let result: Credentials | null = null;

    form.addEventListener("submit", () => {
      result = {
        username: userInput.value.trim(),
        password: passInput.value,
      };
      // method="dialog" schließt den Dialog automatisch
    });

    cancelButton.addEventListener("click", () => dialog.close());

    // Wird bei Submit, Abbrechen und Escape ausgelöst
    dialog.addEventListener("close", () => {
      passInput.value = "";
      dialog.remove();
      resolve(result);
    });

    dialog.showModal();
    userInput.focus();
  });
}
