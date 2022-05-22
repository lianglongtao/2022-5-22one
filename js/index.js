~ function () {
    /**
     *  ONE
     */
    let DATA = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/pronr.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            DATA = xhr.responseText;
        }
    }
    xhr.send();
    DATA = JSON.parse(DATA);
    let htmlStr = ``;
    DATA.forEach(item => {
        let {
            id,
            title,
            time,
            hot,
            price,
            img
        } = item;
        htmlStr += `<div class="card">
        <img src="${img}" class="card-img-top" >
        <div class="card-body">
          <h6 class="card-title">${title}</h6>
          <p class="card-text">价格￥${price}</p>
          <p class="card-text">好评：${hot}</p>
          <p class="card-text"><small class="text-muted">上架时间:${time}</small></p>
        </div>
      </div>`
    });
    let cardDeck = document.querySelector('.card-deck');
    cardDeck.innerHTML = htmlStr;

    /**
     *  
     *   TWO
     */
    // let navList = document.querySelectorAll('.navbar-nav li'),
    //     cardList = cardDeck.querySelectorAll('.card');
    // navList.forEach(item => {
    //     item['data-type'] = -1;
    //     item.onclick = function () {
    //         this['data-type'] *= -1;
    //         cardList = [...cardList];
    //         cardList.sort((next, cur) => {
    //             let pai = this.getAttribute('data-pai');
    //             next = next.getAttribute(pai);
    //             cur = cur.getAttribute(pai);
    //             if (pai === 'data-time') {
    //                 cur = cur.replace(/-/g, '');
    //                 next = next.replace(/-/g, '');
    //             }
    //             return (next - cur) * this['data-type'];
    //         });
    //         cardList.forEach(item => {
    //             cardDeck.appendChild(item);
    //         });
    //     }
    // })
    let navList = document.querySelectorAll('.navbar-nav li'),
         cardList = cardDeck.querySelectorAll('.card');
    for (let i = 0; i < navList.length; i++) {
        let item = navList[i];
        item['data-type'] = -1;
        item.onclick = function () {
            [].forEach.call(navList, item => {
                item === this ? this['data-type'] *= -1 : item['data-type'] = -1;
            })
            cardList = [].slice.call(cardList, 0);
            cardList.sort((next, cur) => {
                //获取自定义的属性
                let pai = this.getAttribute('data-pai');
                //把自定义的属性赋给当前项和下一项
                next = next.getAttribute(pai);
                cur = cur.getAttribute(pai)
                //判断如果有特殊字符用replace(/正则/g,'想改变的字符') 然后排序
                if (pai === 'data-time') {
                    cur = cur.replace(/-/g, '');
                    next = next.replace(/-/g, '');
                }
                return (next - cur) * this['data-type']
            })
            // appendChild：把括号中的增加到容器的末尾 在页面中展示
            cardList.forEach(item => cardDeck.appendChild(item))
        }
    }
}();