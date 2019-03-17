window.onload=function(){
	var ct_cLeft=document.querySelector(".ct_cLeft");
	// 获取左侧栏的高度
	var leftHeight=ct_cLeft.offsetHeight;
	// 获取左侧栏的ul
	var ulBox=ct_cLeft.querySelector("ul:first-of-type");
	var ulBoxHeight=ulBox.offsetHeight;
	// 获取所有的li元素
	var lis=ulBox.querySelectorAll("li");
	// 设置静止状态下的最大top值
	var maxTop=0;
	var value=100;
	// 设置静止状态下的最小top值
	var minTop=leftHeight-ulBoxHeight;
	// 设置滑动状态下的最大top值
	var maxBounceTop=maxTop+value;
	// 设置滑动状态下的最小top值
	var minBounceTop=minTop-value;
	// 实现滑动
	var startY=0;
	var moveY=0;
	var distanceY=0;
	// 设置记录当前元素滑动到的距离
	var currentY=0;
	// 添加滑动事件
	ulBox.addEventListener("touchstart",function(e){
		// 获取手指的起始坐标
		startY=e.targetTouches[0].clientY;
	});
	ulBox.addEventListener("touchmove",function(e){
		moveY=e.targetTouches[0].clientY;
		distanceY=moveY-startY;
		// 判断滑动时候是否超出指定区间
		if(currentY+distanceY>maxBounceTop || currentY+distanceY<minBounceTop ){
			return;
		}
		// 清除过渡效果
		ulBox.style.transition="none";
		// 实现偏移操作
		ulBox.style.top=(currentY+distanceY)+"px";
	});
	ulBox.addEventListener("touchend", function(e){
		// 判断当前滑动的距离是否在静止状态和滑动状态的最小区间
		if(currentY+distanceY<minTop){
			currentY=minTop;
			// 回到minTop的位置
			ulBox.style.transition="top 0.5s";
			ulBox.style.top=minTop+"px";
		}else if(currentY+distanceY>maxTop){
			currentY=maxTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top=maxTop+"px";
		}else{
			// 记录当前滑动的距离
			currentY+=distanceY;
		}
	});
	// 为每一个li元素添加索引
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
	}
	//设置fastclick
	if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
		}, false);
	}
	//
	ulBox.addEventListener("click",function(e){
		// 修改li元素的样式，将所有的li元素的active样式清除，再给当前被点击的li元素添加active样式
		for(var i=0;i<lis.length;i++){
			lis[i].classList.remove("active");
		}
		// 为当前被点击的li元素添加active样式
		var li=e.target.parentNode;
		var liHeight=li.offsetHeight;
		li.classList.add("active")
		//移动当前的li元素到父容器的最顶部，但是不能超出之前设定的静止状态的最小top值		
		// 获取当前li元素的索引值
		var index=li.index;
		// 设置过渡
		ulBox.style.transition="top 0.5s"
		// 设置偏移
		if(-index*liHeight<minTop){
			ulBox.style.top=minTop+"px";
			currentY=minTop;
		}else{
			ulBox.style.top=(-index*liHeight)+"px";
			currentY=-index*liHeight;
		}
	});
	// setTap.tap(ulBox,function(e){
	// 	// 修改li元素的样式，将所有的li元素的active样式清除，再给当前被点击的li元素添加active样式
	// 	for(var i=0;i<lis.length;i++){
	// 		lis[i].classList.remove("active");
	// 	}
	// 	// 为当前被点击的li元素添加active样式
	// 	var li=e.target.parentNode;
	// 	var liHeight=li.offsetHeight;
	// 	li.classList.add("active")
	// 	//移动当前的li元素到父容器的最顶部，但是不能超出之前设定的静止状态的最小top值		
	// 	// 获取当前li元素的索引值
	// 	var index=li.index;
	// 	console.log(index);
	// 	// 设置过渡
	// 	ulBox.style.transition="top 0.5s"
	// 	// 设置偏移
	// 	if(-index*liHeight<minTop){
	// 		ulBox.style.top=minTop+"px";
	// 		currentY=minTop;
	// 	}else{
	// 		ulBox.style.top=(-index*liHeight)+"px";
	// 		currentY=-index*liHeight;
	// 	}
	// });
};