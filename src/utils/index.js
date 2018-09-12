// 抽取自己的 ajax 使用 Promise
function myAjax(opt){
  // 返回一个 promise对象即可
  return new Promise((resolve,reject)=>{
    // 进行异步的操作
    wx.request({
      url:'https://autumnfish.cn/wx/'+opt.url,
      data:opt.data|| {},
      header:opt.header|| {'content-type':'application/json'},
      method:opt.method|| 'GET',
      dataType:opt.dataType|| 'json',
      responseType:opt.responseType|| 'text',
      success: resolve,
      fail: reject,
      complete: ()=>{}
    });
    
  })
}

export default {
  myAjax
}
