"use strict";

var DictItem = function(text) {
	if (text) {
		/*
		{
			"key": "巴西",
			"value": [
                {"nkdsnfksnf_addr" : "我们是冠军"}
            
                }
            ]
		}
		*/
		var obj = JSON.parse(text);
		this.key = obj.key;
        //this.value[] = obj.value;
        this.value = obj.value;
	} else {
	    this.key = "";
	    this.value = new Array();
	}
};

DictItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};
//mainnetwork
//n1ps9WwcZ8Q8b3MELBPqMzpW2eVdwaRKSeG
var Say = function () {

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


Say.prototype = {
		// 1. 原型
		// 2. init方法
		// 3. 函数以_开头，那么方法为私有，外部不能调用
    init: function () {
        // todo
    },


    save: function (key ,say_h) {

        key = key.trim(); // 去掉两边的空格
        say_h = say_h.trim(); // // 去掉两边的空格
        if (key==="" || say_h === ""){ //不能为空
            throw new Error("empty key / say_h");
        }
        var valuemap = {};
        var from = Blockchain.transaction.from;
				// this.repo[key] nil
        var dictItem = this.repo.get(key);
			
        if (dictItem){
            //throw new Error("value has been occupied");
                        //dictItem是非空的
                valuemap[from] = say_h;
                dictItem.value.push(valuemap);
        }else {
					// 创建一个dictItem对象，dictItem是空的
	            dictItem = new DictItem();
                dictItem.key = key;
                valuemap[from] = say_h;
                dictItem.value.push(valuemap);
	            
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
module.exports = Say;
