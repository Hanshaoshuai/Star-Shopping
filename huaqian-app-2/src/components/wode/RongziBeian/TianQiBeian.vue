<template>
	<!--<transition name="fade">-->
		<div v-show="tucaoShow" class="xiangmu">
			<div class="xiangmu-header" @click.stap="yijianHind()">
				<span class="xiangmu-left"><img src="../img/back.png"/></span>
				<span>备案详情</span>
			</div>
			<div class="box">
				<div style="width:100%;height:0.45rem;"></div>
				<!--<div class="logo">
					<ul>
						<li @click.stap="shangChuan()">
							<mingpian @to-parent="child" class="mingpians" ref="mingpianID"></mingpian>
							<img ref="tianjia" v-show="images" :src="imgUrl" alt="" />
						</li>
						<span>上传营业执照</span>
					</ul>
				</div>-->
				<div ref="guanzhuLingyu" class="fankiu-content">
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>企业简称</div>
						<div class="last number">
							<input v-model="textd" placeholder="请填写企业简称" type="text" class="mint-field-core">
							<!--<span>万元</span>-->
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>今年预计营收、净利润</div>
						<div class="last number last-bottom">
							<input v-model="texta" placeholder="请填写预计营收" number="true" type="number" class="mint-field-core">
							<span>亿元</span>
						</div>
						<div class="last number">
							<input v-model="textb" placeholder="请填写净利润" number="true" type="number" class="mint-field-core">
							<span>万元</span>
						</div>
					</div>
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>融资总额</div>
						<div class="last number">
							<input v-model="textc" placeholder="输入数字" number="true" type="number" class="mint-field-core">
							<span>万元</span>
						</div>
					</div>
					
					
					<div class="zhuying_1">
						<div class="ferst"><span>*</span>投前估值</div>
						<div class="last number">
							<input v-model="texth" placeholder="输入数字" number="true" type="number" class="mint-field-core">
							<span>亿元</span>
						</div>
					</div>
					<div class="zhuying_1"><!--类型 1:定增 2:做市 3:转老股 4:股权质押 5:融资租赁 6:研报 7:公司调研-->
						<div class="ferst"><span>*</span>融资方式</div>
						<div ref="selecteds" class="content-bottom">
							<span class="one src1" @click.stop="xuanZe('1','0')">定增</span>
							<span class="one src1" @click.stop="xuanZe('2','1')">做市</span>
							<span class="one src1" @click.stop="xuanZe('3','2')">转老股</span>
							<span class="one src1" @click.stop="xuanZe('4','3')">股权质押</span>
							<span class="one src1" @click.stop="xuanZe('5','4')">融资租赁</span>
							<span class="one src1" @click.stop="xuanZe('7','5')">公司调研</span>
							<!--<span class="one src1" @click.stop="xuanZe('8','6')">保理</span>
							<span class="one src1" @click.stop="xuanZe('9','7')">股东借款</span>
							<span class="one src1" @click.stop="xuanZe('10','8')">银行保函</span>
							<span class="one src1" @click.stop="xuanZe('11','9')">短期拆借</span>
							<span class="one src1" @click.stop="xuanZe('12','10')">银行授信</span>
							<span class="one src1" @click.stop="xuanZe('13','11')">大额增信</span>
							<span class="one src1" @click.stop="xuanZe('14','12')">产业发展基金</span>-->
						</div>
					</div>
					
					
				</div>
				<div class="butten">
					<ul @click.stop="BeiAn()">
						<li><span>申请备案</span></li>
					</ul>
				</div>
			</div>
			<transition name="fades">
				<div ref="xianShi" v-show="onlyContent" class="loding" style="position: absolute;z-index: 1600; top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(0,0,0,0.3);display: none;">
				    <div class="loadEffect" ref="padding">
						<ul v-show="firstTop">
							<li class="border-bottom" @click.stop="queding()"><span>确认申请备案</span></li>
							<li @click.stop="bianJi()"><span>继续编辑</span></li>
						</ul>
						<ul v-show="lastBottom">
							<li class="last-bottom" style="text-align: center;"><span>{{textcont}}</span></li>
						</ul>
					</div>	
				</div>
			</transition>
		</div>
	<!--</transition>-->
</template>

<script type="text/ecmascript">
	import {URL} from '../../../common/js/path';
	import { Field } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import box from "../../box.vue";
	import mingpian from "../../ShangchuanMingpian.vue";
	import { MessageBox } from 'mint-ui';
	
	export default {
		props:{
			token:{
//				type:Object
			},
			beiAnidQ:{}
		},
		data () {
			return {
				type:"",		//创建类型
				x:"0",			//字的个数
				texta:"",
				textb:"",
				textc:"",
				textd:"",
				texth:"",
				fankui:"45",
				genjin:"458",
				introduction:"",
				times:20177111129,
				tucaoShow:true,
				xingXi:{			//给下级要传的参数
					text:"亲，请您在电脑上登录www.qironghome.com,上传最新商业计划书PPT，便于投资人查看，确保融资沟通顺利。如已上传，请忽略。",
					x:"不再提醒",
					y:"确定",
					m:true,
					u:true
				},
				content:"",			//给下级要传的参数
				XiangmuID:"1",
				imgUrl:"",
				images:false,
				onlyContent:false,
				onlyContent:false,
				firstTop:true,
				lastBottom:false,
				textcont:"备案申请成功，请等待审核",
				typeId:""
			}
		},
		mounted(){
//			console.log(this.$route.params.type)
//			console.log(this.token)
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
			child(MingpianImg){
				this.imgUrl=MingpianImg
				if(MingpianImg){
					this.images=true;
				}
				this.$nextTick(function() {
					var img = this.$refs.tianjia;
					var num = img.length;
					if (img.clientWidth>img.clientHeight) {
						img.style.height="100%"
						img.style.width="auto"
					}else{
						img.style.width="100%"
						img.style.height="auto"
					}
				})
//				console.log(MingpianImg)
			},
			xuanZe(type,index){
//				console.log(type)
				this.typeId=type;
				var span=this.$refs.selecteds.getElementsByClassName("one");
				var length=span.length;
				for(var i=0; i<length; i++){
					span[i].setAttribute("class","one src1");
				}
				span[index].setAttribute("class","one src2");
			},
			BeiAn(){
				var CanShu={				//给下级要传的参数
					texta:this.texta,
					textb:this.textb,
					textc:this.textc,
					textd:this.textd,
					texth:this.texth,
					typeId:this.typeId
				}
//				if(this.imgUrl==""){
//					Toast("请上传您的营业执照...");
//					return;
//				}
				for(var item in CanShu){		//判断填写信息是否完整Ok=1；标签必选
					if(CanShu[item]==""){
						Toast("请填写完整您的信息...");
						return;
					}
				}
				this.onlyContent=true;
//					console.log(CanShu)
			},
			queding(){
				//添加企业备案
				var params={
		    		token:this.token,
					com_name:'',			//	公司全称	是	[string]		
					com_short:this.textd,			//	公司简称	是	[string]		
					commission:'',				//	佣金协定	是	[string]		
					total_finance:this.textc,		//	投资总额 单位：万	是	[string]		
					remark:'',				//	有效投资认定	是	[string]
					license:'',
//					license:this.$refs.mingpianID.mingpianID,						//	营业执照	是	[string]		
					predict_revenue:this.texta,				//	今年预计营收	是	[string]		
					predict_profit:this.textb,				//	今年预计净利润	是	[string]		
					id:'',				//	备案id id为空时创建，不为空时修改	是	[string]
					type:this.typeId,						//	融资类型，参见创建项目接口type值	是	[string]
					appraisement:this.texth			//	投前估值	是	[string]
		    	}
//				console.log(params)
				this.$http.post(URL.path+'finance/record',params,{emulateJSON:true}).then(function(res){
					this.type=res.body.data.id
					var tata=this;
					if(this.beiAnidQ==""){
						this.firstTop=false
						this.lastBottom=true
//						Toast("备案申请成功，请等待审核");
						setTimeout(function(){
							tata.onlyContent=false;
							history.go(-1)
//							location.replace(document.referrer); 
						},1000)
//						window.location.href="#/wode/RongziBeian/7";
					}
					if(res.body.data.id==true){
						this.firstTop=false
						this.lastBottom=true
						this.textcont="您已添加成功"
//						Toast("您已添加成功");
						setTimeout(function(){
							this.onlyContent=false;
							history.go(-1)
//							location.replace(document.referrer); 
						},2000)
					}
//					console.log(res);
				},function(res){
				    console.log(res.status);
				})
			},
			bianJi(){
				this.onlyContent=false;
			},
			shangChuan(){
				
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
			mingpian
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
	
	.fades-enter-active {
	  	transition: all .5s ease;
	}
	.fades-leave-active {
	  	transition: all .5s ease;
	}
	.fades-enter, .fades-leave-active {
	  	/*transform: translateX(4.17rem);*/
	  	/*transform:rotate(360deg);*/
	  	opacity: 0;
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
			.logo{
				width:100%;
				height:2.16rem;
				display:flex;
				justify-content:center;
				align-content:center;
				align-items:center;
				text-align:center;
				ul{
					width:1.25rem;
					height:auto;
					li{
						position:relative;
						border:1px solid #f5f4f9;
						box-sizing:border-box;
						width:1.25rem;
						height:1.25rem;
						background-image:url("../img/mingpian.png");
						background-size:100% 100%;
						display:flex;
						justify-content:center;
						align-content:center;
						align-items:center;
						text-align:center;
						overflow:hidden;
						img{
							/*width:100%;*/
						}
						.mingpians{
							position:absolute;
							top:0.25rem;
							left:0;
							opacity:0;
						}
					}
				}
				span{
					display:inline-block;
					margin-top:0.1rem;
					font-size:0.16rem;
					/*color:#*/
				}
			}
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
			}
			.fankiu-content{
				width:89.4%;
				margin:0 auto;
				padding-bottom:0.2rem;
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
					.content-bottom{
						width:100%;
						/*display:flex;*/
						/*align-items:center;
						align-content:center;
						justify-content:center;*/
						overflow: hidden;
						/*span{
							&:nth-child(2n){
								margin-left:0.46rem;
								margin-right:0.46rem;
							}
						}*/
						.src1{
		            		display:inline-block;
		            		float:left;
		            		width:0.9rem;
		            		padding:0.06rem 0;
		            		text-align: center;
		            		font-size: 0.14rem; 
		            		line-height: 0.15rem;
		            		border:1px solid #cfcfcf;
		            		box-sizing:border-box;
		            		border-radius:0.04rem;
		            		color:#b4b4b4;
		            		margin-bottom:0.1rem;
		            		margin-right:0.1rem;
		            	}
		            	.src2{
		            		display:inline-block;
		            		float:left;
		            		width:0.9rem;
		            		padding:0.06rem 0;
		            		text-align: center;
		            		line-height: 0.15rem;
		            		font-size: 0.14rem; 
		            		background:#ff7a59;
		            		border:1px solid #cfcfcf;
		            		box-sizing:border-box;
		            		border-radius:0.04rem;
		            		color:#fff;
		            		margin-bottom:0.1rem;
		            		margin-right:0.1rem;
		            	}
					}
				}
			}
			.butten{
				width:100%;
				/*background:#f5f4f9;*/
				padding:0.2rem 0;
				ul{
					width:65.8%;
					height:0.58rem;
					border-radius:0.06rem;
					margin:0 auto;
					background:#ff7a59;
					display:flex;
					align-content:center;
					align-items:center;
					justify-content:center;
					li{
						span{
							font-size:0.2rem;
							color:#fff;
						}
					}
				}
			}
		}
		.loding{
			display:flex;
			align-content:center;
			align-items:center;
			justify-content:center;
			.loadEffect{
	            width: 70%;
	            min-height: 0.40rem;
	            position: relative;
	            padding:0.3rem 0;
	            background: #fff;
	            border-radius:0.06rem;
	            .load-butten{
	            	width:100%;
	            	height:0.4rem;
	            	font{
		            	position:absolute;
		            	display:inline-block;
		            	background:#ff7a59;
		            	padding:0.06rem 0.1rem;
		            	color:#fff;
		            	border-radius:0.04rem;
		            	&.first{
		            		bottom:0.2rem;
		            		left:16%;
		            	}
		            	&.last{
		            		bottom:0.2rem;
		            		right:16%;
		            	}
		            }
	            }
	        }
	        .loadEffect span{
	        	margin:0 auto;
	            display: block;
	            text-align:justify;
	            line-height: 0.22rem;
	            font-size: 0.16rem;
	            width: 80%;
	        }
	        .loadEffect{
	        	position:relative;
	        	ul{
	            	li{
	            		span{
	            			/*text-align:center;*/
	            			line-height: 0.46rem;
	            		}
	            	}
	            }
	        }
	    }
	}
</style>


