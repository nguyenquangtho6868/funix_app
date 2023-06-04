const ElasticEmail = require('@elasticemail/elasticemail-client');
const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications['apikey'];
const API_URL = 'http://localhost:4000/';
apikey.apiKey = "BB92C606AE9A11E6ED69415E75A91D77775CEDA058B03CBD8F80D0065D822E529078805AC4CB8619DF0953F4A84B64C1";
const api = new ElasticEmail.EmailsApi();
const email = (data) => {
    return ElasticEmail.EmailMessageData.constructFromObject({
        Recipients: [
          new ElasticEmail.EmailRecipient(`${data.email}`)
        ],
        Content: {
          Body: [
            ElasticEmail.BodyPart.constructFromObject({
              ContentType: "HTML",
              charset: 'utf-8',
              Content: `
              <h1>Xin chào ${data.username}, Funix gửi tới bạn tài khoản web-chat với mentor có thông tin như sau : </h1>
              <h5>Tên tài khoản : ${data.email}</h5>
              <h5>Mật khẩu : ${data.password}</h5>
                <div>
                    <h3>Chúc bạn sớm hoàn thành khóa học!</h3>
                </div>
            `
            })
          ],
          Subject: "PhuChu Entertaiment",
          From: "phuchu199749@gmail.com"
        }
    });
}


module.exports = {
    api,
    email
}