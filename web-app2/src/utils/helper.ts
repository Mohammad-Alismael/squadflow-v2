export async function handleError(response: Response) {
  if (!response.ok) {
    const msg = await response.json();
    console.log(msg["message"]);
    throw new Error(msg["message"]);
  }
}
