var video,playpicture,startduration;
video=document.getElementById("video");
playpicture=document.getElementById("play");
playpicture2=document.getElementById("play2");
 var slider=document.getElementById('slider');
 var zvuk=document.getElementById('zvukslider');
 var ball=slider.children[1];
 var slider2=slider.children[0];
 var clock=slider.children[2]; 
 var endclock=slider.children[3];
 var changezvuk=zvuk.children[0];
 var pol=zvuk.children[1];
function playpause()
{
   if(video.paused)
   {
   	video.play();
   	playpicture.style.transition=".4s ease-in-out";
   	playpicture.style.transform=" translate(-50%,-50%) scale(1.2)";
   	playpicture.style.opacity="0";
   	playpicture2.src="images/pause.png";
      startduration=setInterval(init,1000);
      vaxt=setInterval(korol,1000);
   }
   else
   {
   	video.pause();
   	playpicture.style.transform="translate(-50%,-50%) scale(1)";
   	playpicture.style.opacity="1";
   	playpicture2.src="images/hi.png";
      clearInterval(startduration);
      clearInterval(vaxt);
   }
}
function init()
{
   var slwidth=slider.offsetWidth/video.duration;
   if((slider2.offsetWidth+slwidth)>slider.offsetWidth)
   {
      slider2.style.width=slider.offsetWidth+'px';
      ball.style.left=slider2.offsetWidth-ball.offsetWidth/2+'px';
   }
   else 
   {
   slider2.style.width=slider2.offsetWidth+slwidth+'px';
   if((slider2.offsetWidth-ball.offsetWidth/2)<0)
   {
   ball.style.left=0+'px';
   }
   else
   {
   ball.style.left=slider2.offsetWidth-ball.offsetWidth/2+'px';
   }
   }
}
 ball.onmousedown=function(e)
 {
      var ballcoords=ball.getBoundingClientRect();
      var shiftX=e.pageX-ballcoords.left;
      var slidercoords=slider.getBoundingClientRect();
      document.onmousemove=function(e)
      {
         var drvideo=slider.offsetWidth/video.duration;
         var ballcoords2=ball.getBoundingClientRect();
         var newLeft=e.pageX-shiftX-slidercoords.left;
         var slider2width=ballcoords2.left-slidercoords.left+ball.offsetWidth/2;
         if(newLeft<0)
         {
            newLeft=0;
            slider2width=0;
         }
         var newRight=slider.offsetWidth-ball.offsetWidth;
         if(newLeft>newRight)
         {
            newLeft=newRight;
         }
         ball.style.left=newLeft+'px';
         slider2.style.width=slider2width+'px';
         video.currentTime=slider2width/drvideo;
      }
      document.onmouseup=function(e)
      {
         document.onmousemove=document.onmouseup=null;
      };
      return false;
 };
ball.ondragstart=function(e)
{
   return false;
}
slider.onclick=function(e)
{
   var slidercoords=slider.getBoundingClientRect();
   if(e.pageX>(slidercoords.left+slider.offsetWidth))
   {

   }
   else
   {
   var slw=e.pageX-slidercoords.left;
   var slw2=slw-ball.offsetWidth/2;
   ball.style.left=slw2+'px';
   slider2.style.width=slw+'px';
   var ret=(slw/(slider.offsetWidth/video.duration));
   video.currentTime=ret;
   }
}
video.addEventListener('loadedmetadata',function(e)
{
   var endtime=video.duration;
   var minute=parseInt(endtime/60);
   var second=parseInt(endtime%60);
    if(minute<10)
   {
      minute='0'+minute;
   }
   if(second<10)
   {
      second='0'+second;
   }
   endclock.innerHTML=minute+':'+second;
});
function korol()
{
   var time=video.currentTime;
   var minute=parseInt(time/60);
   var second=parseInt(time%60);
   if(minute<10)
   {
      minute='0'+minute;
   }
   if(second<10)
   {
      second='0'+second;
   }
   clock.innerHTML=minute+':'+second;
}
// pol.onmousedown=function(e)
//  {
//     var polcoords=pol.getBoundingClientRect();
//     var shiftX=e.pageY-polcoords.top;
//     var slidercoords=changezvuk.getBoundingClientRect();
//       document.onmousemove=function(e)
//       {
//          //var drvideo=slider.offsetWidth/video.duration;
//          var polcoords2=pol.getBoundingClientRect();
//          var newtop=e.pageY-shiftX-slidercoords.top;
//          var slider2height=polcoords2.top-slidercoords.top+pol.offsetWidth/2;
//          if(newtop<0)
//          {
//             newtop=0;
//             slider2height=0;
//          }
//          var newRight=slider.offsetHeight-pol.offsetWidth;
//          if(newtop>newRight)
//          {
//             newtop=newRight;
//          }
//          pol.style.top=newtop+'px';
//          changezvuk.style.height=slider2height+'px';
//          video.volume=slider2height/100;
//       }
//       document.onmouseup=function(e)
//       {
//          document.onmousemove=document.onmouseup=null;
//       };
//       return false;
//  };
// pol.ondragstart=function(e)
// {
//    return false;
// }