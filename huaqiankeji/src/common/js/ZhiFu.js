export function zhifu(dcontent,info,value,path1){
	console.log("开始链接")
	console.log(dcontent)
	console.log(info)
	console.log(value)
	console.log(path1)
	var pays={};
	var w=null;
//	var PAYSERVER1='http://www.qironghome.com/api/index.php/pay/AliSign/?payid=';
//	var PAYSERVER2='http://www.qironghome.com/api/index.php/pay/AliSign/?payid=';
	var PAYSERVER='http://demo.dcloud.net.cn/payment/?payid=';
	function plusReady(){
		console.log("开始执行");
		// 获取支付通道
		plus.payment.getChannels(function(channels){
			console.log("支付通道信息");
			dcontent.innerHTML='';
			var content=dcontent;
//			var content=document.getElementById('dcontent');
//			var info=document.getElementById('info');
			var txt='支付通道信息：';
			var x=0;
			for(var i in channels){
				var channel=channels[i];
				if(channel.id=='qhpay'||channel.id=='qihoo'){	// 过滤掉不支持的支付通道：暂不支持360相关支付
					continue;
				}
				pays[channel.id]=channel;
				txt += 'id:'+channel.id+', ';
				txt += 'description:'+channel.description+', ';
				txt += 'serviceReady:'+channel.serviceReady+'； ';
				var de=document.createElement('div');
				var id=channel.id;
				de.setAttribute('class', 'button');
//				de.setAttribute('onclick', 'pay(this.id)');
				de.id=channel.id;
				if(x==0){
					de.style.marginRight='0.2rem';
					x+=1;
				}
				de.style.width='1rem';
				de.style.lineHeight='0.4rem';
				de.style.fontSize='0.16rem';
				de.style.textAlign='center';
				de.style.borderRadius='6px';
				de.style.background="#ff7a59";
				de.style.color="#ffffff";
				de.onclick=function pay(){
					var id=this.id;
//					alert(id);
					if(w){return;}//检查是否请求订单中
					if(id==='appleiap'){
						outSet('应用内支付');
						clicked('payment_iap.html');
						return;
					}
					outSet('----- 请求支付 -----');
					var url=PAYSERVER;
					if(id=='alipay'||id=='wxpay'){
						url+=id;
					}else{
						plus.nativeUI.alert('当前环境不支持此支付通道！', null, '会员支付');
						return;
					}
					var appid=plus.runtime.appid;
					if(navigator.userAgent.indexOf('StreamApp')>=0){
						appid='Stream';
					}
					url+='&appid='+appid+'&total=';
					
					w=plus.nativeUI.showWaiting();
					// 请求支付订单
			//		var amount = document.getElementById('total').value;
					var amount = value;
					var xhr=new XMLHttpRequest();
					xhr.onreadystatechange=function(){
						switch(xhr.readyState){
							case 4:
							w.close();w=null;
							if(xhr.status==200){
								outLine('----- 请求订单成功 -----');
								outLine(xhr.responseText);
								var order=xhr.responseText;
								plus.payment.request(pays[id],order,function(result){
									outLine('----- 支付成功 -----');
									outLine(JSON.stringify(result));
									plus.nativeUI.alert('支付成功。',function(){
										back();
									},'会员支付');
								},function(e){
									outLine('----- 支付失败 -----');
									outLine('['+e.code+']：'+e.message);
									plus.nativeUI.alert('http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：'+e.code);
								});
							}else{
								outLine('----- 请求订单失败 -----');
								outLine( xhr.status );
								plus.nativeUI.alert('获取订单信息失败！', null, '会员支付');
							}
							break;
							default:
							break;
						}
					}
					xhr.open('GET',url+amount);
					outLine('请求支付订单：'+url+amount);
					xhr.send();
				}
				de.innerText=channel.description+'支付';
				content.appendChild(de);
				checkServices(channel);
			}
			info.innerText=txt;
		},function(e){
			console.log("获取支付通道失败")
			outLine('获取支付通道失败：'+e.message);
		});
	}
	document.addEventListener('plusready', plusReady(), false);
	// 检测是否安装支付服务
	function checkServices(pc){
		if(!pc.serviceReady){
			var txt=null;
			switch(pc.id){
				case 'alipay':
				txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
				break;
				default:
				txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
				break;
			}
			plus.nativeUI.confirm(txt, function(e){
				if(e.index==0){
					pc.installService();
				}
			}, pc.description);
		}
	}
	// 支付
//	function pay(id){
//		if(w){return;}//检查是否请求订单中
//		if(id==='appleiap'){
//			outSet('应用内支付');
//			clicked('payment_iap.html');
//			return;
//		}
//		outSet('----- 请求支付 -----');
//		var url=PAYSERVER;
//		if(id=='alipay'||id=='wxpay'){
//			url+=id;
//		}else{
//			plus.nativeUI.alert('当前环境不支持此支付通道！', null, '捐赠');
//			return;
//		}
//		var appid=plus.runtime.appid;
//		if(navigator.userAgent.indexOf('StreamApp')>=0){
//			appid='Stream';
//		}
//		url+='&appid='+appid+'&total=';
//		
//		w=plus.nativeUI.showWaiting();
//		// 请求支付订单
////		var amount = document.getElementById('total').value;
//		var amount = total.value;
//		var xhr=new XMLHttpRequest();
//		xhr.onreadystatechange=function(){
//			switch(xhr.readyState){
//				case 4:
//				w.close();w=null;
//				if(xhr.status==200){
//					outLine('----- 请求订单成功 -----');
//					outLine(xhr.responseText);
//					var order=xhr.responseText;
//					plus.payment.request(pays[id],order,function(result){
//						outLine('----- 支付成功 -----');
//						outLine(JSON.stringify(result));
//						plus.nativeUI.alert('支付成功：感谢你的支持，我们会继续努力完善产品。',function(){
//							back();
//						},'捐赠');
//					},function(e){
//						outLine('----- 支付失败 -----');
//						outLine('['+e.code+']：'+e.message);
//						plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：'+e.code);
//					});
//				}else{
//					outLine('----- 请求订单失败 -----');
//					outLine( xhr.status );
//					plus.nativeUI.alert('获取订单信息失败！', null, '捐赠');
//				}
//				break;
//				default:
//				break;
//			}
//		}
//		xhr.open('GET',url+amount);
//		outLine('请求支付订单：'+url+amount);
//		xhr.send();
//	}
}	
