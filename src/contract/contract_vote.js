"use strict";



// 类
// 有三个属性

// 100 条数据
// 100个DictItem类型的对象

var DictItem = function(text) {
	if (text) {
		
		var obj = JSON.parse(text);
		this.key = obj.key;
		this.value = obj.value;
		this.author = obj.author;
	} else {
	    this.key = "";
	    this.author = "";
	    this.value = "";
	}
};

DictItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

//mainnetwork
//n1qWRZKiHs7Nps3fo73YSdVEi4WNB1x5gcQ
//n1fbotGmaAQNi3jk8hrKkisQCwnz9kjLjeK
//4142842cfcdac2342b2111cf5e4a8af0538f435876d2a3e463fb26652f61edf7
var WorldCupVote = function () {

		// 定一个了一个SuperDictionary类的属性，属性类型为字典，当前定义的属性名为repo
    LocalContractStorage.defineMapProperty(this, "repo", {
				// get 读取数据时，会将JSON字符串转换成对象返回
        parse: function (text) {
            return new DictItem(text);
        },
				// 往 repo 里面写数据，set方法或者put方法时，会把对象转换成JSON字符串并且写到链上
        stringify: function (o) {
            return o.toString()
        }
    });

};


WorldCupVote.prototype = {
		// 1. 原型
		// 2. init方法
		// 3. 函数以_开头，那么方法为私有，外部不能调用
    init: function () {
        // todo
    },


    save: function (key, value) {

        key = key.trim(); // 去掉两边的空格
        value = value.trim(); // // 去掉两边的空格
        if (key === "" || value === ""){ //不能为空
            throw new Error("empty key / value");
        }

        if (value.length > 64 || key.length > 64){ //长度限制
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;
				// this.repo[key] nil
        var dictItem = this.repo.get(key);
        if (dictItem){
            //throw new Error("value has been occupied");
						//dictItem是非空的
						dictItem.key = key;
						var count = parseInt(dictItem.value);
						dictItem.author = dictItem.author + "," +from ;
						var add_value= count + 1;
						dictItem.value = add_value + "";
        }else {
					// 创建一个dictItem对象，dictItem是空的
	        dictItem = new DictItem();
	        dictItem.author = from;
	        dictItem.key = key;
	        dictItem.value = "1";
        }

					// this.repo[key] = dictItem
					// this.repo.set(key, dictItem);
					this.repo.put(key, dictItem);
    },

		// 查询
    get: function (key) {
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = WorldCupVote;
