const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjJmYjYzMC04ZGYwLTQxOGEtYjA3MS05NzYxM2ExZjc3ZmQiLCJlbWFpbCI6Im11aGFtbWFkbWFoZGk1MTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjM4ZWQ5YzZlNDg5YjZhYzFhNzFjIiwic2NvcGVkS2V5U2VjcmV0IjoiOWFlZGNiNjM4NjExYTU1OWViNTRmYmIyZmQ2Y2JlMGIyZmNmMzU1OGJiMDVjNDhhNWE3NTk1ODFhYjgzNDJiNyIsImV4cCI6MTc3MTUzMDY1NH0.6ZB1tR9-fgjDyXt0xnqUu7KrH5N2fIDxo3-7yaqM9bc";

export async function pinFileToIPFS() {
  try {
    const text = "Hello World!";
    const blob = new Blob([text], { type: "text/plain" });
    const file = new File([blob], "hello-world.txt");
    const data = new FormData();
    data.append("file", file);

    const request = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      }
    );
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
