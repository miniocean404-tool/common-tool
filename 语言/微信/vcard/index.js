const vCardsJS = require("vcards-js");

const vCard = vCardsJS();

vCard.uid = "001";
vCard.namePrefix = "姓名前缀";
vCard.firstName = "姓名开始";
vCard.middleName = "姓名中间";
vCard.lastName = "姓名结尾";
vCard.organization = "组织";
// 联系人是否应该显示为一个公司
vCard.isOrganization = true;
vCard.nameSuffix = "个人名字后缀";
vCard.nickname = "昵称";
vCard.title = "职位";
vCard.role = "职称";

vCard.cellPhone = ["16600000000"];
vCard.workPhone = ["16600000000"];
vCard.workFax = ["16600000000"];
vCard.otherPhone = ["16600000000"];
vCard.pagerPhone = ["16600000000"];
vCard.email = ["1000@qq.com"];
vCard.workEmail = ["1000@qq.com"];
vCard.otherEmail = ["1000@qq.com"];
// 性别
vCard.gender = "M";
vCard.homeAddress = {
  label: "邮寄标签的文本",
  street: "街道",
  city: "城市",
  stateProvince: "州或省",
  postalCode: "邮政编码",
  countryRegion: "国家或地区",
};
vCard.workAddress = {
  label: "邮寄标签的文本",
  street: "街道",
  city: "城市",
  stateProvince: "州或省",
  postalCode: "邮政编码",
  countryRegion: "国家或地区",
};
vCard.homePhone = ["16600000000"];
// 传真
vCard.homeFax = ["16600000000"];

// 生日
vCard.birthday = new Date(2024, 1, 1);
vCard.note = "备注";
vCard.version = "3";

// 不可用
// vCard.logo.attachFromUrl("https://avatars2.githubusercontent.com/u/5659221?v=3&s=460", "JPEG");

// 存在中文姓名不可用
// 图片(非头像)
// vCard.photo.attachFromUrl("https://avatars2.githubusercontent.com/u/5659221?v=3&s=460", "JPEG");
// vCard.url = "https://github.com/enesser";
// vCard.workUrl = "http://www.baidu.com";
// 附加到vCard对象的社会url(例如:Facebook, Twitter, LinkedIn)
// vCard.socialUrls = {
//   facebook: "https://www.baidu.com",
// };

// 将字符串转换二维码，微信扫码可添加联系人
console.log(vCard.getFormattedString());
