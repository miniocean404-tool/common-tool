const ora = require("ora");
const axios = require("axios");
const { fsMessage } = require("./template");

class FsWebhook {
  postBody;
  options;

  constructor(options = { FsWebhookUrl: "" }) {
    this.options = options;

    this.buildTemplate();
  }

  async send() {
    const { FsWebhookUrl } = this.options;

    const spinner = ora({
      text: `正在推送飞书消息...\n`,
      spinner: "moon",
    }).start();

    try {
      const res = await axios.post(FsWebhookUrl, this.postBody);

      spinner.succeed(`推送飞书消息成功\n`);
    } catch (error) {
      console.error("推送飞书消息error", error);
    }
  }

  buildTemplate() {
    const { branchName, hash, message, wechatPart, machine } = this.options;

    this.postBody = fsMessage({
      wechatPart,
      machine,
      branchName,
      hash,
      message,
    });
  }
}

module.exports = FsWebhook;
