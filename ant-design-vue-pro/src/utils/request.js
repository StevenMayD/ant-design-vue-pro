import axios from "axios"; // 先安装 npm install --save axios
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then((res) => {
      // 请求成功 则直接返回响应
      return res;
    })
    .catch((error) => {
      // 请求失败 则错误弹框
      const {
        response: { status, statusText },
      } = error;
      notification.error({
        // 这里h变量是jsx格式中必须的，但h又未使用，eslint的检查会报错：解决办法 让这一行不进行检查
        // eslint-disable-next-line no-unused-vars
        message: (h) => (
          <div>
            请求错误<span style="color: red">{status} : </span> {options.url}
          </div>
        ),
        description: statusText,
      });
      return Promise.reject(error);
    });
}

export default request;
