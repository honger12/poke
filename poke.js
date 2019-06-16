$(function () {

    let poke = [];
    let colorArr = ['s' , 'h' , 'd' , 'c'];
    //用flag来标识存在的扑克牌！！
    let flag = {};


    //形成52组随机的牌
    for (let i = 0 ; i < 52 ; i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let number = Math.round(Math.random()*12 + 1);
        let color = colorArr[index];
        while(flag[color + '_' + number]){
            index = Math.floor(Math.random()*colorArr.length);
            number = Math.round(Math.random()*12 + 1);
            color = colorArr[index];
        }
        poke.push({color , number});
        flag[color + '_' + number] = true;
    }

    console.log(poke);


//    发牌
//     lefts = 350 - 50*i + 100*j
//     tops = 50*i;
    let index = -1 ;  //表示当前票数
    for(let i = 0 ; i < 7 ; i++){
        for(let j = 0 ; j <=i ; j++){
            index++;
            let obj = poke[index];
            let lefts = 350 - 50*i + 100 * j  , tops = 50*i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .html('').appendTo('.box')
                .data('number' , obj.number)
                .attr('id' , i + '_' + j)
                .delay(index*60)
                .animate({left:lefts , top : tops , opacity:1})

        }
    }

//    剩下的牌
    for ( ; index<52 ; index++){
        let obj = poke[index];
        $('<div>').addClass('poke')
            .addClass('re')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .html('').appendTo('.box')
            .data('number' , obj.number)
            .attr('id' , '-2_-2')
            .delay(index * 70)
            .animate({left:0 , top : 480 , opacity:1})
    }


//    点击事件
   /*尝试失败
   $('.box').on('click' , '.poke' ,function () {
        let str = $(this)[0].id;
        // console.log(str);//6_1
        let str1 = Number(str.substr(0,1));  //行6
        let str2 = Number(str.substr(2,1)); //列1
        let ids=0;
        $("div[class='poke']").filter(ele =>{
            ids = $("div[class='poke']")[ele].id;
            let result = ids.includes((str1 + 1) + '_' + str2) || ids.includes((str1 + 1) + '_' + (str2 + 1));
            return result;
        } );
        if((ids.includes((str1 + 1) + '_' + str2))||(ids.includes((str1+1) + '_' + (str2+1)))){
            console.log(1);
        }else{
            $(this).animate({top:'-=30px'})
        }



    })
*/

   let first = null;  //标识第一个被抬起的元素
   $('.box').on('click' , '.poke' ,function () {

       let _this = $(this);
       let [i,j] = _this.attr('id').split('_');
       let id1 = i*1+1 + '_' + j , id2 = i*1 + 1 + '_' + (j*1 +1);

       //    获取id1  id2的元素 --->   $('#' + id1)
       if($('#'+ id1).length||$('#' + id2).length){
           return;
       }

       if (_this.hasClass('active')){
           _this.removeClass('active').animate({top:'+=30'})
       } else{
           _this.addClass('active').animate({top:'-=30'});
       }

   //   判断抬起的两个元素是否可以被消除掉
       if (!first){
           first = _this;
       }else{
       //    比较两个元素的值(先获取number) ---->  first.data('number')
          if (first.data('number') + _this.data('number')===14){
          //    消除掉（先移动到画面的右上角在进行删除）
              $('.active').animate({top:0 , left:710 , opacity:0},function () {
                  $(this).remove();
              })

          }else{
          //   不相等的话再将两张图片放下
              $('.active').animate({top:'+=30'},function () {
                  $(this).removeClass('active');
              })

          }
          first=null;
       }
   } )


/*//    将剩余元素一个个点击移动到画面的右下角
    $('.box').on('click' , '.re' , function () {
        $(this).animate({left:710},function () {
            let _this = $(this);
            if(!first){
                first = _this;
            }else{
                if (first.data('number') + _this.data('number')===14){
                    //    消除掉（先移动到画面的右上角在进行删除）
                    $('.active').animate({top:0 , left:710 , opacity:0},function () {
                        $(this).remove();
                    })

                }else{
                    //   不相等的话再将两张图片放下
                    $('.active').animate({top:'+=30'},function () {
                        $(this).removeClass('active');
                    })

                }
                first=null;
            }

        })
    })*/


//    左右按钮作用：切换牌
    let n = 0;//标识层级
    $('.right').on('click' , function () {
        //last过滤 选择re类中的最后一张牌
        $('.re').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('re').addClass('rights');
        })
    })
    $('.left').on('click' , function () {
        //last过滤 选择re类中的最后一张牌
        $('.rights').last().animate({left:0},function () {
            $(this).removeClass('rights').addClass('re');
        })
    })

})