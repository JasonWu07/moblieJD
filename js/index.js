window.onload=function(){
	setSearch();
	Mstime();
	bannerEffect();
}
//头部搜素框的封装函数
function setSearch(){
	// 头部搜索块
	// 1.获取当前banner的高度 
	var search=document.querySelector(".jd_search");
	var banner=document.querySelector(".jd_banner");
	var bannerHeight=banner.offsetHeight;
	// 2.获取当前屏幕滚动出去的距离
	window.onscroll=function(){
		var offsetTop=document.body.scrollTop||document.documentElement.scrollTop;
		var opacity=0
		// 3.判断滚动出去的距离是否等于banner的高度
		if(offsetTop<bannerHeight){
			opacity=offsetTop/bannerHeight;
			// 4.设置背景颜色
		    search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
		}
		
	}
}
//倒计时的封装函数
function Mstime(){
	// 1.先获取span元素
	var spans=document.querySelector(".jd_time").querySelectorAll("span");
	// 2.设置倒计时时钟
	var totalTime=1*60*60;
	// 3.设置定时器
	var timeId=setInterval(function(){
		totalTime--;
		if(totalTime==0){
			clearInterval(timeId);
		}
		var hours=Math.floor(totalTime/3600);
		var minutes=Math.floor(totalTime%3600/60);
		var seconds=Math.floor(totalTime%60);
		spans[0].innerHTML=Math.floor(hours/10);
		spans[1].innerHTML=Math.floor(hours%10);
		spans[3].innerHTML=Math.floor(minutes/10);
		spans[4].innerHTML=Math.floor(minutes%10);
		spans[6].innerHTML=Math.floor(seconds/10);
		spans[7].innerHTML=Math.floor(seconds%10);
	}, 1000)
}
// 轮播图封装函数
 function bannerEffect(){
 	//1.设置修改轮播图的页面结构
 	//在开始位置添加最后一张图片
 	//在结尾位置添加第一张图片
 	//获取轮播图结构
 	var banner=document.querySelector(".jd_banner");
 	//获取图片容器
 	var imgBox=document.querySelector("ul:first-of-type");
 	//获取原始的第一张图片
 	var first=imgBox.querySelector("li:first-of-type");
 	// 获取原始的最后一张图片
 	var last=imgBox.querySelector("li:last-of-type");
 	//在首尾插入两张图片
 	imgBox.appendChild(first.cloneNode(true));
 	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
 	//2.设置对应的样式
 	//获取所有的li元素
 	var lis=imgBox.querySelectorAll("li");
 	//获取li元素的数量
 	var count=lis.length;
 	//获取banner的宽度
 	var bannerWidth=banner.offsetWidth;
 	//设置图片盒子的宽度
 	imgBox.style.width=count*bannerWidth+"px";
 	// 设置每一个li元素的宽度
 	for(var i=0;i<lis.length;i++){
 		lis[i].style.width=bannerWidth+"px";
 	}
 	//设置图片索引
 	var index=1;
 	//3.设置默认偏移
 	imgBox.style.left=-bannerWidth+"px";
 	//4.当屏幕发生变化的时候，重新去计算宽度
 	window.onresize=function(){
 		//获取banner的宽度
	  bannerWidth=banner.offsetWidth;
	 	//设置图片盒子的宽度
	 	imgBox.style.width=count*bannerWidth+"px";
	 	// 设置每一个li元素的宽度
	 	for(var i=0;i<lis.length;i++){
	 		lis[i].style.width=bannerWidth+"px";
	 	}
	 	imgBox.style.left=-index*bannerWidth+"px";
 	}
 	// 设置点标记
 	var setIndicator=function(){
 		 var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
	 	 // 先清除其他li元素的active类名 为自身添加active类名 排他功能
	 	 for(var i=0;i<indicators.length;i++){
	 	 	indicators[i].classList.remove("active");
	 	 }
	 	 // 为当前li元素添加active样式
	 	 indicators[index-1].classList.add('active');
 	};
 	//5.自动轮播 设置定时器
 	var timeId;
 	var startTimeid=function(){
 		timeId=setInterval(function(){
 		//设置图片索引
 		index++;
 		//添加过渡效果
 		imgBox.style.transition="left 0.5s ease-in-out"
 		// 设置偏移
 		imgBox.style.left=(-index*bannerWidth)+"px";
 		// 判断是否到达最后一张图片
 		if(index==count-1){
 			index=1;
 			imgBox.style.transition="none";
 			imgBox.style.left=-bannerWidth+"px";
 			setTimeout(function(){
 				if(index==count-1){
 			index=1;
 			imgBox.style.transition="none";
 			imgBox.style.left=-bannerWidth+"px";
 				}
 			},500)
 		}
 	},2000)
 	};
 	startTimeid();
 	// 6.实现手动轮播
 	var flag=true;
 	 var startX,moveX,distanceX;
 	 // 为图片添加触摸事件 触摸开始 触摸移动 触摸结束
 	 imgBox.addEventListener("touchstart", function(e){
 	 	clearInterval(timeId);
 	 	startX=e.targetTouches[0].clientX;
 	 });
 	 imgBox.addEventListener("touchmove",function(e){
 	 	if(flag){
 	 		moveX=e.targetTouches[0].clientX;
	 	 	distanceX=moveX-startX;
	 	 	imgBox.style.transition="none";
	 	 	imgBox.style.left=(-index*bannerWidth+distanceX)+"px";
 	 	}
 	 });
 	 imgBox.addEventListener("touchend",function(){
 	 	flag=false;
 	 	if(Math.abs(distanceX)>100){
 	 		if(distanceX>0){
 	 			index--;
 	 		}else{
 	 			index++;
 	 		}
 	 		// 翻页
 	 		imgBox.style.transition="left 0.5s ease-in-out";
 	 		imgBox.style.left=-index*bannerWidth+"px";
 	 	}else if(Math.abs(distanceX)>0){
 	 		// 回弹
 	 		imgBox.style.transition="left 0.5s ease-in-out";
 	 		imgBox.style.left=-index*bannerWidth+"px";
 	 	}
 	 	// 将获取到的位置设置为0
 	 	startX=0;
 	 	moveX=0;
 	 	distanceX=0;
 	 	
 	 	
 	 });
 	 imgBox.addEventListener("webkitTransitionEnd",function(){
 	 	// 如果图片到了最后一张(count-1)，就回到索引1
 	 	// 如果图片到了第一张，就回到count-2
 	 	if(index==count-1){
 	 		index=1;
 	 		// 清除过渡
	 	 	imgBox.style.transition="none";
	 	 	imgBox.style.left=-index*bannerWidth+"px";
 	 	}else if(index==0){
 	 		index=count-2;
 	 		imgBox.style.transition="none";
	 	 	imgBox.style.left=-index*bannerWidth+"px";
 	 	}
 	 	
 	 	setTimeout(function(){
 	 		flag=true;
 	 		clearInterval(timeId);
 	 		//重新开启时钟
 	 		startTimeid();
 	 	},500)
 	 	setIndicator();
 	 });
 }