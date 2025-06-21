// Fetch API endpoint https://bvxnfs9720.execute-api.us-east-1.amazonaws.com/default/openai_chat

async function simple_chat(message) {
  if (!message) {
    throw new Error("消息不能为空");
  }

  try {
    const response = await fetch(
      "https://bvxnfs9720.execute-api.us-east-1.amazonaws.com/default/openai_chat",
      {
        method: "POST",
        body: JSON.stringify({
          prompt: message,
          url: "https://classopenaiimage.s3.us-east-1.amazonaws.com/test",
        }),
      }
    );
    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("调用 API 时发生错误:", error);
    throw error;
  }
}

export default simple_chat;
