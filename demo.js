const checkStatus = async (key) => {
    const res = await checkQrcodeLoginState(key.value)
    return res.data
}
const login = async () => {
    let timer
    let timestamp = Date.now()
    const cookie = localStorage.getItem('cookie')
    this.getLoginStatus(cookie)
    const res = await haveQRcodeKey()
    const key = res.data.data.unikey
    const res2 = await createQrcode(key)
    if (res2.code === 200) {
        qrcodeKey.value = res2.unikey;
        // 将网址信息解析为二维码
        QRCode.toString(
          `https://music.163.com/login?codekey=${qrcodeKey.value}`,
          {
            width: 192,
            margin: 0,
            color: {
              dark: "#335eea",
              light: "#00000000",
            },
            type: "svg",
          }
        )
          .then((svg: any) => {
            qrimg.value = `data:image/svg+xml;utf-8,${encodeURIComponent(svg)}`; //解析
          })
          .catch((e: any) => {
            console.log(e);
          });
      }

    timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key)
        if (statusRes.code === 800) {
            alert('二维码已过期,请重新获取')
            clearInterval(timer)
        }
        if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            alert('授权登录成功')
            await this.getLoginStatus(statusRes.cookie)
            localStorage.setItem('cookie', statusRes.cookie)
        }
    }, 3000)
}
login()