/**
 * 封装移动端tap单击事件
 * [setTap description]
 * @type {Object}
 */
/**
 * 单击操作的特点：
 * 1.单击只有一根手指
 * 2.判断手指开始触摸和手指松开的时间差异值不能大于指定的值
 * 3.保证没有滑动事件 ，如果有抖动必须保证抖动的距离在指定的范围内
 * 
 */
var setTap={
	tap:function(dom,callback){
		if(	!dom || typeof dom!="object"){
			return;
		}
		var startTime,startX,startY;
		dom.addEventListener("touchstart",function(e){
			// 判断是否只有一个手指进行操作
			if(e.targetTouches.length>1){
				//说明不止一个手指
				return;
			}
			// 记录手机开始触摸的时间
			startTime=Date.now();
			// 记录当前手指的坐标
			startX=e.targetTouches[0].clientX;
			startY=e.targetTouches[0].clientY;
		});
		// touchend 当手指松开的时候，说明当前元素已经没有了手指对象，所以无法通过
		// targetTouches来获取手指对象
		// 可以用changedTouches来获取手指对象
		dom.addEventListener("touchend", function(e){
			//判断是不是一个手指
			if(e.changedTouches.length>1){
				// 说明不止一个手指
				return;
			}
			// 判断时间误差
			if(Date.now()-startTime>150){
				// 说明是长按操作
				return;
			}
			// 判断松开手指时的坐标与触摸开始时的坐标差异值
			var endX=e.changedTouches[0].clientX;
			var endY=e.changedTouches[0].clientY;
			// 判断差异值是否在允许的范围之内
			if(Math.abs(endX-startX)<6 && Math.abs(endY-startY)<6){
				// 这就是一个单击事件	
				callback && callback(e);
			}
		});
	}
};