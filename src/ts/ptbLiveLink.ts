import { promptLogin } from "./ptbPromptLogin";


/**
 * function for connecting with PTB's SteVe server
 */

export async function getPtbLiveLink(
  endpoint: string,
  maxAttempts = 3
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const title =
      attempt === 1
        ? "Anmelden"
        : "Anmeldung fehlgeschlagen – bitte erneut versuchen";

    const credentials = await promptLogin(title);

    if (!credentials) {
      return null;
    }
//response contains JSON with the live link data which can otherwise be pasted to Chargy directly
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json",
          "STEVE-API-KEY": "steve"
          },
      body: JSON.stringify(credentials),
    });

    return (await response.text()).trim();
  }

  throw new Error(
    `Anmeldung nach ${maxAttempts} Versuchen fehlgeschlagen.`,
  );
}