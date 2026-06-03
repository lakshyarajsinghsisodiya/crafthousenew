export interface ContactSubmission {
  name: string;
  email: string;
  business?: string;
  message: string;
  type: "discovery" | "proposal";
  id: string;
  receivedAt: string;
}

/** Free email delivery via https://web3forms.com (set WEB3FORMS_ACCESS_KEY on Render) */
export async function notifyContactSubmission(
  submission: ContactSubmission,
): Promise<{ sent: boolean; error?: string }> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn(
      "[Contact] WEB3FORMS_ACCESS_KEY not set — submission logged only. See CONTACT-SETUP.md",
    );
    return { sent: false, error: "Email not configured" };
  }

  const typeLabel =
    submission.type === "proposal" ? "Proposal request" : "Discovery call";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Cloudflare (which fronts Web3Forms) blocks requests with no/default
        // server User-Agent and serves an HTML challenge page. Send a real UA.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Crafthouse Media] New ${typeLabel} from ${submission.name}`,
        from_name: submission.name,
        email: submission.email,
        message: [
          `Type: ${typeLabel}`,
          `Business: ${submission.business || "—"}`,
          `Submitted: ${submission.receivedAt}`,
          "",
          submission.message,
        ].join("\n"),
      }),
    });

    const rawBody = await response.text();
    let data: { success?: boolean; message?: string } = {};
    try {
      data = JSON.parse(rawBody);
    } catch {
      // Non-JSON (e.g. a Cloudflare HTML challenge page) — the request was
      // blocked before reaching the Web3Forms API.
      console.error(
        `[Contact] Web3Forms returned non-JSON (HTTP ${response.status}):`,
        rawBody.slice(0, 200),
      );
      return {
        sent: false,
        error: `Email provider returned an unexpected response (HTTP ${response.status}).`,
      };
    }

    if (!response.ok || !data.success) {
      return {
        sent: false,
        error: data.message || "Email provider rejected the request",
      };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[Contact] Web3Forms error:", message);
    return { sent: false, error: message };
  }
}
