import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://squadflow-real-time.onrender.com";

export const socket = io(URL);
