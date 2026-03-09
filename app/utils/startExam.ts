import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { notification } from "antd";
type FetchFunction = (id: any) => Promise<any>;

export const startExam = async (
  id: any,
  fetchFn: FetchFunction,
  router?: AppRouterInstance,
  redirectUrl: string = "/trang-thi"
) => {
  try {
    const res = await fetchFn(id);

    sessionStorage.removeItem("examResult");
    sessionStorage.setItem("examResult", JSON.stringify(res));
    sessionStorage.setItem("examAgain", JSON.stringify("examAgain"));
    sessionStorage.removeItem("exam_hints");
    sessionStorage.removeItem("exam_state");

    if (router) {
      router.push(redirectUrl);
    }

    return res;
  } catch (error) {
    notification.error({
      message: "Đã có lỗi xảy ra",
      description: "Bạn cần đăng nhập để tiếp tục!",
    });
    throw error
  }
};
