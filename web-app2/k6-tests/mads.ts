import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // stages: [
  //   { duration: "10s", target: 1 },
  //   { duration: "30s", target: 10 },
  //   { duration: "1m", target: 20 },
  //   { duration: "30s", target: 0 },
  // ],
  vus: 100,
  duration: "10m",
  thresholds: {
    http_req_duration: ["p(99)<350"],
  },
};

export default function () {
  const data = { username: "test", password: "test456" };
  let res = http.post("http://188.166.18.15:8080/api/v1/user/login", data);

  check(res, { "success login": (r) => r.status === 200 });

  sleep(0.3);
}
