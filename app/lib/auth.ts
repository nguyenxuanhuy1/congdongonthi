import { callApi } from "./callApi";

export async function analyzeExam(
  files: File[],
  mode: "exam"
) {
  if (!files || files.length === 0) {
    throw new Error("Vui lòng chọn 1 ảnh");
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  formData.append("mode", mode);

  const data = await callApi<any>("/api/analyze", {
    method: "POST",
    body: formData,
  });

  return data;
}



export interface UserInfo {
  avatar: string;
  role: "user" | "admin";
  username: string;
}

export interface UserBasicInfo {
  avatar: string;
  username: string;
}

export async function getUserInfo(): Promise<UserBasicInfo> {
  const data = await callApi<UserInfo>("/api/user/info", {
    method: "GET",
  });

  if (typeof window !== "undefined" && data?.role) {
    localStorage.setItem("user_role", data.role);
  }

  return {
    avatar: data.avatar,
    username: data.username,
  };
}



export async function submitExam(body: any) {
  const data = await callApi<any>("/api/exams/submit", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
}


export async function ideaQuestion(body: any) {
  const data = await callApi<any>("/api/analyze/question", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
}


export async function getHistory() {
  const data = await callApi<any>("/api/exams/history", {
    method: "GET",
  });
  return data;
}

export async function getExam(id: any) {
  const data = await callApi<any>(`/api/exam-sets/redo/${id}`, {
    method: "GET",
  });
  return data;
}


// admin
export async function adminUpdate(id: any, body: any) {
  const data = await callApi<any>(`/api/admin/exams/update/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
}

export async function adminGetList(body: any) {
  const data = await callApi<any>(`/api/admin/exams`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
}