<template>
	<transition name="fade">
		<div v-show="tucaoShow" class="xiangmu">
			<div class="xiangmu-header" @click.stap="yijianHind()">
				<span class="xiangmu-left"><img src="../img/back.png"/></span>
				<span>融资租赁</span>
			</div>
			<div class="box">
				<div style="width:100%;height:0.45rem;"></div>
				<box></box>
				<!--<div class="fankiu border-topbottom">
					<div class="content-food" style="text-align:center;">
						<img src="../img/lishi.png"/>
						<span class="content-header">选择历史融资计划</span>
					</div>
				</div>
				<box></box>-->
				<div class="fankiu-content">
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>企业简称</div>
						<div class="last">
							<textarea placeholder="" class="mint-field-core" v-model="texta"></textarea>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>企业代码</div>
						<div class="last">
							<textarea placeholder="" class="mint-field-core" v-model="textb"></textarea>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>租赁方式</div>
					</div>
					<div class="fankiu">
						<div class="content-food"  ref="foods">
							<ul>
								<li class="src1" ref="img1" index="img1" @click.stap="dingzengGo('1')">
									<span>直租</span><font class="img1"></font>
								</li>
								<li class="src2" ref="img2" index="img2" @click.stap="zuoshiGo('2')">
									<span>售后回租</span><font></font>
								</li>
							</ul>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>租赁物</div>
						<div class="last number last-bottom">
							<input v-model="numberc" placeholder="请填写租赁物" type="text" class="mint-field-core">
							<!--<span>亿元</span>-->
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>融资总额</div>
						<div class="last number">
							<input v-model="numbere" placeholder="请输入数字" number="true" type="number" class="mint-field-core">
							<span>亿元</span>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>期限</div>
						<div class="last number">
							<input v-model="numberf" placeholder="请输入数字" number="true" type="number" class="mint-field-core">
							<span>个月</span>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>所在省份</div>
						<div class="last number zuihou">
							<input v-model="numberg" placeholder="请请填写省份" type="text" class="mint-field-core">
						</div>
					</div>
					<!--<div class="times">
						<span class="times_1">领天</span>
						<span class="text-center">1小时前</span>
						<span>发布</span>
						<div class="times-name">
							<span>{{fankui}}反馈</span>
							<span class="text-center">{{genjin}}跟进</span>
						</div>
					</div>-->
				</div>
				<div class="butten">
					<ul @click.stop="xiayibuGo()">
						<li><span>下一步</span></li>
					</ul>
				</div>
			</div>
			<!--<pipei ref="pipeiShow" :token="token"></pipei>-->
			<!--<tishi ref="tishiShow" :xingXi="xingXi" :content="content"></tishi>-->
		</div>
	</transition>
</template>

<script type="text/ecmascript">
	import {URL} from '../../../../common/js/path';
	import { Field } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import box from "../../../box.vue";
//	import pipei from "../PipeiTouziRen/Pipei.vue";
//	import tishi from "../../../Tishi.vue";
//	import youhuiquan from "../../shendu/PeixunZixun/YouhuiQuan.vue";
//	import fankuixinxi from "./FankuiXinxi.vue";
	
	
	export default {
		props:{
			token:{
//				type:Object
			}
		},
		data () {
			return {
				type:"",		//创建类型
				x:"0",			//字的个数
				numberc:"",
				numbere:"",
				numberf:"",
				numberg:"",
				texta:"",
				textb:"",
				fankui:"45",
				genjin:"458",
				introduction:"",
				times:20177111129,
				showFlag:false,
				tucaoShow:true,
				xingXi:{			//给下级要传的参数
					text:"亲，请您在电脑上登录www.qironghome.com,上传最新商业计划书PPT，便于投资人查看，确保融资沟通顺利。如已上传，请忽略。",
					x:"不再提醒",
					y:"确定",
					m:true,
					u:true
				},
				content:"",			//给下级要传的参数
				XiangmuID:"5",
				
				src:"",
				ID:"1",
			}
		},
		mounted(){
			console.log(this.$route.params.type)
			console.log(this.token)
			this.type=this.$route.params.type
			this.$nextTick(function() {
				
			});
//			this.token=this.$route.params
		},
		methods:{
			yijianHind(){
				history.go(-1)
//				this.tucaoShow=false;
			},
			xiayibuGo(){
				var datas = {
					token:localStorage.getItem("token"),//	token	是	[string]		
//					uid:"",//	创建者id	是	[string]		
					type:this.type,//	类型 1:定增 2:做市 3:转老股 4:股权质押 5:融资租赁 6:研报	是	[string]		
//					company:"",//	公司id	是	[string]		
					com_name:this.texta,//	公司名称	是	[string]
					com_short:this.texta,//	公司简称	是	[string]
					com_code:this.textb,//	公司代码	是	[string]		
					main_business:"",//	主营业务	是	[string]		
					lightspot:'',//	投资亮点	是	[string]		
					industry:'',//	公司所在行业标签id	是	[string]		
					last_year_revenue:0,//	上一年营收（单位 万）	是	[string]		
					last_year_profit:0,//	上一年净利润（单位 万）	是	[string]		
					predict_revenue:this.numberc,//	今年预计营收(单位:万)	是	[string]		
					predict_profit:0,//	今年预计净利润(单位:万)	是	[string]		
					total_finance:this.numbere,//	融资总额(单位:万)	是	[string]		
					appraisement:0,//	投前估值(单位:万)	是	[string]		
					city:this.numberg,//	所在城市	是	[string]		
					transfe_share:"",//	拟转股份数	是	[string]		
					share_price:0,//	每股价格	是	[string]		
					is_hold:"",//	是否本人持股 1:是 2:否	是	[string]		
					research_address:"",//	调研地址	是	[string]		
					research_time:"",//	调研时间	是	[string]		
					pledge_time:0,//	质押时间周期(天)	是	[string]		
					repayment_time:this.numberf,//	还款周期(天)	是	[string]		
					face_rate:"",//	票面利率	是	[string]		
					is_transfe:"",//	是否转股 1:是 2:否	是	[string]		
					remark:"",//	备注	是	[string]
				}
				var CanShu={				//给下级要传的参数
					texta:this.texta,
//					textb:this.textb,
					id:this.ID,
					numberc:this.numberc,
					numbere:this.numbere,
					numberf:this.numberf,
					numberg:this.numberg,
					XiangmuID:this.XiangmuID,
					type:this.type,
				}
				var ok=0;
				for(var item in CanShu){		//判断填写信息是否完整Ok=1；标签必选
					if(!CanShu[item]==""){
						
					}else{
						ok+=1;
					}
				}
				if(ok==0){
					Indicator.open({spinnerType: 'fading-circle'});
					this.$http.post(URL.path+'finance/create',datas,{emulateJSON:true}).then(function(res){
						console.log(res);
						this.XiangmuID=res.body.data
						this.content=this.$refs.pipeiShow;
						Indicator.close();
						if(res.body.returnCode==202){
							Toast(res.body.msg);
							if(res.body.msg=="请备案后再创建项目！"){
								window.location.href="#/wode"
							}
						}else{
							window.location.href='#/ZuLin1/1/'+this.XiangmuID+'/1/Pipei';
//							this.$refs.tishiShow.tishiBlock(CanShu,'pipei');//CanShu是下级要传的参数
						}
					},function(res){
						Indicator.close();
					    console.log(res.status);
					})
				}else{
					Toast("请填写完整您的信息！是否已选标签...");
				}
				
//				this.$refs.pipeiShow.pipeiBlock();
			},
			dingzengGo(name){
				console.log(name)
				this.ID=name;
				this.src=this.$refs.img1.getAttribute("index");
//				window.location.href="#/faxian/WoyaoRongzi/0/Dingzeng";
			},
			zuoshiGo(name){
				this.ID=name;
				this.src=this.$refs.img2.getAttribute("index")
//				window.location.href="#/faxian/WoyaoRongzi/0/Zuoshi";
			},
			dingzengBlock(){
				this.tucaoShow=true;
			},
			xinxiTo(){
				this.$refs.xinxiShow.xinxiBlock();
			},
			liuYan(){
				window.location.href="#/fankuixinxi";
			},
			baoMing(){
				this.$refs.youhuiShow.YouhuiBlock();
			}
		},
		watch:{
			src:function(newVal,oldVal){
//				console.log(newVal)
//				console.log(this.$refs.foods.getElementsByTagName("ul")[0].getElementsByTagName("li"))
				var uls=this.$refs.foods.getElementsByTagName("ul")
				var x=uls.length;
				var y=2
				for(var i=0; i<x; i++){
					for(var z=0; z<2; z++){
						if(uls[i].getElementsByTagName("li")[z].getAttribute("index")==newVal){
//							console.log(uls[i].getElementsByTagName("li")[z])
							uls[i].getElementsByTagName("li")[z].style.border='0.01rem solid #ff7a59';
							uls[i].getElementsByTagName("li")[z].getElementsByTagName("font")[0].setAttribute("class","img1")
						}else{
							uls[i].getElementsByTagName("li")[z].style.border='0.01rem solid #ddddde';
							uls[i].getElementsByTagName("li")[z].getElementsByTagName("font")[0].setAttribute("class","")
						}
					}
				}
			}
		},
		events:{
			
		},
		filters:{
//			formatDate(time){
//				let date = new Date(time);
//				return formatDate(date,'yyyy-MM-dd hh:mm');
//			}
		},
		updated(){
		},
		components:{
			box,
//			pipei,
//			tishi
//			youhuiquan
//			fankuixinxi
		}
	}
</script>

<style lang="scss" scoped>
	.fade-enter-active {
	  	transition: all .5s ease;
	}
	.fade-leave-active {
	  	transition: all .5s ease;
	}
	.fade-enter, .fade-leave-active {
	  	transform: translateX(4.17rem);
	  	/*transform:rotate(360deg);*/
	  	/*opacity: 0;*/
	}
	.xiangmu{
		position:fixed;
		background:#f5f4f9;
		bottom:0;
		top:0;
		left:0;
		right:0;
		z-index:2400;
		.xiangmu-header{
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:0.46rem;
			font-weight:600;
			background:#ff7a59;
			font-size:0.2rem;
			text-align:center;
			line-height:0.45rem;
			color:#fff;
			z-index:300;
			.xiangmu-left{
				position:absolute;
				height:100%;
				padding-left:0.16rem;
				display:inline-block;
				top:0.04rem;
				left:0;
				img{
					height:0.2rem;
				}
			}
		}
		.box::-webkit-scrollbar{width:0px;}
		.box{
			overflow-y:auto;
			width:100%;
			height:100%;
			background:#fff;
			-webkit-overflow-scrolling:touch;
			.fankiu{
				width:100%;
				display:flex;
				.content-food{
					flex:1;
					padding:0.13rem 0.2rem;
					line-height:0.25rem;
					font-size:0.16rem;
					background:#fff;
					.content-header{
						font-size:0.18rem;
					}
					img{
						vertical-align:top;
						width:0.24rem;
						height:0.24rem;
					}
					span{
						/*font-weight:bold;*/
					}
				}
				.content-food{
					flex:1;
					font-size:0.14rem;
					background:#fff;
					ul{
					width:100%;
					overflow:hidden;
						li{
							width:48.8%;
							border-radius:0.04rem;
							color:#525252;
							display:inline-block;
							text-align:center;
							background:#fff;
							border:0.01rem solid #ddddde;
							/*border:0.005rem solid #ff7a59;*/
							box-sizing: border-box;
							/*line-height:0.95rem;*/
							margin-bottom:0.08rem;
							float:left;
							position:relative;
							box-sizing:border-box;
							&:last-child{
								float:right;
								margin-right:0;
							}
							span{
								/*font-weight:bold;*/
								display:inline-block;
								padding:0.13rem 0;
								font-size:0.16rem;
								line-height:0.15rem;
							}
							font{
								display:inline-block;
								position:absolute;
								bottom:-0.01rem;
								right:-0.01rem;
								background-size:100% 100%;
								width:0.36rem;
								height:0.36rem;
							}
							.img1{
								background-image:url("../img/duihao.png");
							}
						}
						.src1{
							border:0.01rem solid #ff7a59;
						}
					}
				}
			}
			.fankiu-content{
				width:89.4%;
				margin:0 auto;
				.zhuying_1{
					width:100%;
					span{
						color:#ff7a59;
					}
					.ferst{
						display:flex;
						height:0.38rem;
						align-content: center;
						align-items: center;
						font-size:0.16rem;
						font{
							color:#ff7a59;
							font-size:0.15rem;
						}
					}
					.last{
						flex:1;
						padding:0 0.06rem;
						border:1px solid #ebebeb;
						background:#f5f4f9;
						.mint-field-core{
							resize: none;
							font-size:0.14rem;
							background:#f5f4f9;
							height:0.33rem;
							line-height:0.33rem;
							&::-webkit-scrollbar{width:0;height:0}
							&::-webkit-input-placeholder{
								color:#afafaf;
							}
						}
					}
					.zuihou{
						margin-bottom:0.2rem;
					}
					li{
						width:100%;
						height:0.38rem;
						display:flex;
						color:#868686;
						align-content:center;
						align-items:center;
						justify-content:flex-end;
					}
					.number{
						width:82%;
						position:relative;
						span{
							width:0.3rem;
							height:0.38rem;
							color:#bdbdbd;
							line-height:0.38rem;
							position:absolute;
							right:-0.35rem;
							top:0;
						}
						.mint-field-core::-webkit-input-placeholder{
							color:#afafaf;
						}
					}
					.last-bottom{
						margin-bottom:0.1rem;
					}
				}
				.times{
					width:100%;
					height:0.3rem;
					background:#fff;
					line-height:0.3rem;
					.times_1{
						display:inline-block;
						padding-left:0.2rem;
					}
					.text-center{
						display:inline-block;
						padding:0 0.08rem;
					}
					.times-name{
						float:right;
						margin-right:0.1rem;
					}
				}
				.times{
					width:100%;
					height:0.3rem;
					background:#fff;
					line-height:0.3rem;
					font-size:0.12rem;
					.times_1{
						display:inline-block;
						padding-left:0.2rem;
					}
					.text-center{
						display:inline-block;
						padding:0 0.08rem;
					}
					.times-name{
						float:right;
						margin-right:0.1rem;
					}
				}
			}
			.butten{
				width:100%;
				background:#f5f4f9;
				padding:0.2rem 0;
				ul{
					width:65.8%;
					height:0.58rem;
					margin:0 auto;
					background:#ff7a59;
					display:flex;
					align-content:center;
					align-items:center;
					justify-content:center;
					li{
						span{
							font-size:0.18rem;
							color:#fff;
						}
					}
				}
			}
		}
	}
</style>


