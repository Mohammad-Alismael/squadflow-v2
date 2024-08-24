import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 1 },
    { duration: "30s", target: 10 },
    { duration: "1m", target: 20 },
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<200"],
  },
};

export default function () {
  const data = { username: "anil", password: "123456" };
  let res = http.post("http://localhost:3000/api/auth/login", data);

  check(res, { "success login": (r) => r.status === 200 });

  sleep(0.3);
}
